import { productAmount } from '@constants/student';
import type { Product } from '@services/productApi';
import { create } from 'zustand';
export interface CartItem {product: Product; qty: number;}
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, qty: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
}
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: product => set(state => ({items: state.items.some(row => row.product.id === product.id)
    ? state.items.map(row => row.product.id === product.id ? {...row, qty: row.qty + 1} : row)
    : [...state.items, {product, qty: 1}]})),
  removeItem: id => set(state => ({items: state.items.filter(row => row.product.id !== id)})),
  changeQty: (id, qty) => {
    if (!Number.isFinite(qty)) return;
    const quantity = Math.max(0, Math.floor(qty));
    set(state => ({items: quantity === 0 ? state.items.filter(row => row.product.id !== id)
      : state.items.map(row => row.product.id === id ? {...row, qty: quantity} : row)}));
  },
  totalQuantity: () => get().items.reduce((sum, row) => sum + row.qty, 0),
  totalAmount: () => get().items.reduce((sum, row) => sum + productAmount(row.product.price) * row.qty, 0),
}));

