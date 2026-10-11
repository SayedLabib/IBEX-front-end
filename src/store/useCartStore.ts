import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartLine, Product } from "@/types";

interface CartState {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const sameLine = (a: CartLine, productId: string, color?: string, size?: string) =>
  a.product.id === productId && a.color === color && a.size === size;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          const existing = state.lines.find((l) => sameLine(l, product.id, color, size));
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, product.id, color, size) ? { ...l, quantity: l.quantity + quantity } : l
              ),
            };
          }
          return { lines: [...state.lines, { product, quantity, color, size }] };
        });
      },
      removeItem: (productId, color, size) =>
        set((state) => ({ lines: state.lines.filter((l) => !sameLine(l, productId, color, size)) })),
      updateQuantity: (productId, quantity, color, size) =>
        set((state) => ({
          lines: state.lines.map((l) => (sameLine(l, productId, color, size) ? { ...l, quantity } : l)),
        })),
      clearCart: () => set({ lines: [] }),
      totalItems: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      totalPrice: () => get().lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    }),
    { name: "ibex-cart", skipHydration: true }
  )
);
