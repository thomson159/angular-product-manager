import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../data-access/product.model';

export type ProductDialogData = { mode: 'add' | 'edit'; product?: Product };

@Component({
  standalone: true,
  selector: 'app-product-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './product-dialog.html',
})
export class ProductDialog {
  mode: 'add' | 'edit';
  form;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) data: ProductDialogData
  ) {
    this.mode = data.mode;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      isActive: [true],
    });

    if (data.product) this.form.patchValue(data.product);
  }

  save() {
    if (this.form.invalid) return;
    this.ref.close(this.form.getRawValue());
  }

  cancel() {
    this.ref.close(null);
  }
}
