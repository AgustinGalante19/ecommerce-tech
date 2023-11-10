import { Product } from "@prisma/client"
import { create } from "zustand"

interface CartStore {
  cartItems: Product[]
  addItem: (item: Product) => void
  removeItem: (item: Product) => void
  setCartItems: (items: Product[]) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addItem: (item: Product) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeItem: (item: Product) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => item.productId !== i.productId),
    })),
  clearCart: () => set({ cartItems: [] }),
  setCartItems: (items: Product[]) => set({ cartItems: items }),
}))
