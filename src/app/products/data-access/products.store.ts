import { computed, inject } from '@angular/core';
import { signalStore, withComputed, withMethods, withState, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';
import { ProductsApi } from './products.api';
import { PriceSortDir, Product } from './product.model';

type State = {
  products: Product[];
  nameFilter: string;
  categoryFilter: string;
  priceSort: PriceSortDir;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  products: [],
  nameFilter: '',
  categoryFilter: '',
  priceSort: 'asc',
  loading: false,
  error: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((s) => {
    const categories = computed(() => {
      const set = new Set(s.products().map((p) => p.category).filter(Boolean));
      return Array.from(set).sort((a, b) => a.localeCompare(b));
    });

    const visibleProducts = computed(() => {
      const name = s.nameFilter().trim().toLowerCase();
      const category = s.categoryFilter().trim().toLowerCase();

      const filtered = s.products().filter((p) => {
        const okName = !name || p.name.toLowerCase().includes(name);
        const okCat = !category || p.category.toLowerCase() === category;
        return okName && okCat;
      });

      const dir = s.priceSort();
      return filtered.sort((a, b) =>
        dir === 'asc' ? a.price - b.price : b.price - a.price
      );
    });

    return { categories, visibleProducts };
  }),

  withMethods((s) => {
    const api = inject(ProductsApi);

    const load = rxMethod<void>(
      pipe(
        tap(() => patchState(s, { loading: true, error: null })),
        switchMap(() =>
          api.list().pipe(
            tapResponse({
              next: (products) => patchState(s, { products }),
              error: () => patchState(s, { error: 'Load failed' }),
              finalize: () => patchState(s, { loading: false }),
            })
          )
        )
      )
    );

    const add = rxMethod<Product>(
      pipe(
        tap(() => patchState(s, { loading: true, error: null })),
        switchMap((product) =>
          api.create(product).pipe(
            tapResponse({
              next: (created) => patchState(s, { products: [created, ...s.products()] }),
              error: () => patchState(s, { error: 'Create failed' }),
              finalize: () => patchState(s, { loading: false }),
            })
          )
        )
      )
    );

    const edit = rxMethod<{ id: string; patch: Partial<Product> }>(
      pipe(
        tap(() => patchState(s, { loading: true, error: null })),
        switchMap(({ id, patch }) =>
          api.update(id, patch).pipe(
            tapResponse({
              next: (updated) =>
                patchState(s, {
                  products: s.products().map((p) => (p.id === id ? updated : p)),
                }),
              error: () => patchState(s, { error: 'Update failed' }),
              finalize: () => patchState(s, { loading: false }),
            })
          )
        )
      )
    );

    return {
      load,
      add,
      edit,
      setNameFilter: (v: string) => patchState(s, { nameFilter: v }),
      setCategoryFilter: (v: string) => patchState(s, { categoryFilter: v }),
      setPriceSort: (v: PriceSortDir) => patchState(s, { priceSort: v }),
    };
  })
);
