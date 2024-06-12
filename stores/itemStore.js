import { create } from 'zustand';

const itemStore = create((set) => ({
  items: [],
  itemLoading: true, // Add loading state
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (updatedItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    })),
  setItemLoading: (loading) => set({ itemLoading: loading })
}));

export default itemStore;
