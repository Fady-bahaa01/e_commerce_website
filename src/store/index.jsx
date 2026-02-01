import { create } from "zustand";

export const domain = "http://localhost:1337";

export const toggleMenu = create((set) => ({
  value: false,
  openMenu: () =>
    set(() => {
      return {
        value: true,
      };
    }),
  closeMenu: () =>
    set(() => {
      return {
        value: false,
      };
    }),
}));
export const cart = create((set) => ({
  state: false,
  openCart: () =>
    set(() => {
      return {
        state: true,
      };
    }),
  closeCart: () =>
    set(() => {
      return {
        state: false,
      };
    }),
}));

export const useCart = create((set) => ({
  items: [],

  count: 0,

  total: 0,

  addToCart: (newproduct) =>
    set((state) => {
      let product = state.items;

      let final = product.findIndex((el) => {
        return el.documentId === newproduct.documentId;
      });

      if (final === -1) {
        return {
          items: [...state.items, newproduct],
          count: (state.count += 1),
        };
        // product.push(newproduct);
      }
      const updateItems = state.items.map((el, index) =>
        index === final ? { ...el, qty: el.qty + newproduct.qty } : el,
      );

      return { items: updateItems };
    }),

  incrementQty: (documentId) =>
    set((state) => ({
      items: state.items.map((el) =>
        el.documentId === documentId ? { ...el, qty: (el.qty += 1) } : el,
      ),
    })),

  decrementQty: (documentId) =>
    set((state) => ({
      items: state.items.map((el) =>
        el.documentId === documentId && el.qty > 1
          ? { ...el, qty: (el.qty -= 1) }
          : el,
      ),
    })),

  removeFromCart: () =>
    set(() => {
      return { items: [], count: 0 };
    }),

  calcTotal: () =>
    set((state) => {
      let finalTotal = 0;
      state.items.forEach((el) => {
        finalTotal += el.qty * el.price;
      });
      return { total: finalTotal };
    }),
}));
