export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string; // For bonus category filter
}

export interface CartItem extends Product {
  quantity: number;
}
