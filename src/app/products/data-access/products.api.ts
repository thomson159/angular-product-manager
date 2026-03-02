import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../core/tokens/api-base-url';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsApi {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  private get url() {
    return `${this.baseUrl}/products`;
  }

  // GET /products
  list() {
    return this.http.get<Product[]>(this.url);
  }

  // POST /products
  create(product: Product) {
    return this.http.post<Product>(this.url, product);
  }

  // PATCH /products/:id
  update(id: string, patch: Partial<Product>) {
    return this.http.patch<Product>(`${this.url}/${id}`, patch);
  }

  // (opcjonalnie) DELETE
  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
