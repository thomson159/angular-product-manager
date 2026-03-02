import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductsStore } from '../../data-access/products.store';
import { Product } from '../../data-access/product.model';
import { ProductDialog, ProductDialogData } from '../product-dialog/product-dialog';
import { newId } from '../../../shared/utils/id';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './products-page.html',
  styleUrls: ['./products-page.scss'],
})
export class ProductsPage implements OnInit {
  store = inject(ProductsStore);
  private dialog = inject(MatDialog);

  displayedColumns = ['name', 'price', 'category', 'stock', 'active'];

  ngOnInit() {
    this.store.load();
  }

  openAdd() {
    const ref = this.dialog.open<ProductDialog, ProductDialogData>(ProductDialog, {
      width: '520px',
      data: { mode: 'add' },
    });

    ref.afterClosed().subscribe((v) => {
      if (!v) return;
      const product: Product = { id: newId(), ...v };
      this.store.add(product);
    });
  }

  openEdit(product: Product) {
    const ref = this.dialog.open<ProductDialog, ProductDialogData>(ProductDialog, {
      width: '520px',
      data: { mode: 'edit', product },
    });

    ref.afterClosed().subscribe((v) => {
      if (!v) return;
      this.store.edit({ id: product.id, patch: v });
    });
  }
}
