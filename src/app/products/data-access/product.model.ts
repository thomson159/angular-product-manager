export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
}

export type PriceSortDir = 'asc' | 'desc';
