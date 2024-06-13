import { create } from 'zustand';
import { database } from '@/firebase';

import { ref, set, get, update, remove } from 'firebase/database';
const firebaseSet = set;

const itemStore = create((set) => ({
  items: [],
  itemData: {},
  itemLoading: true,
  error: null,

  getAllItems: async (userID) => {
    set({ itemLoading: true });
    try {
      const menuRef = ref(database, 'menu');
      const snapshot = await get(menuRef);

      if (snapshot.exists()) {
        const rawData = snapshot.val();
        const allItems = Object.entries(rawData)
          .filter(([id, data]) => data.userID === userID) // Filter items by userID
          .map(([id, data]) => ({
            id,
            ...data,
          }));
        set({ items: allItems, itemLoading: false });
      } else {
        set({ items: [], itemLoading: false });
      }
    } catch (error) {
      console.error('Error fetching all items', error);
      set({ error, itemLoading: false });
    }
  },

  addCategory: async (itemId, itemData) => {
    set({ itemLoading: true });
    try {
      await firebaseSet(ref(database, `menu/${itemId}`), itemData);
      set((state) => ({
        // items: [],
        items: [...state.items, { id: itemId, ...itemData }],
        itemLoading: false,
      }));
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },

  addMenuItem: async (itemId, newMenuItem) => {
    set({ itemLoading: true });
    try {
      const itemRef = ref(database, `menu/${itemId}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        const itemData = snapshot.val();
        const updatedMenuItems = itemData.menuItems
          ? [...itemData.menuItems, newMenuItem]
          : [newMenuItem];

        await update(itemRef, { menuItems: updatedMenuItems });
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, menuItems: updatedMenuItems } : item
          ),
          itemLoading: false,
        }));
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },

  editCategory: async (itemId, category) => {
    set({ itemLoading: true });
    try {
      const itemRef = ref(database, `menu/${itemId}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        await update(itemRef, { category: category });
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, category: category } : item
          ),
          itemLoading: false,
        }));
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },

  editItem: async (itemId, editItemID, editedItem) => {
    set({ itemLoading: true });
    try {
      const itemRef = ref(database, `menu/${itemId}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        const itemData = snapshot.val();
        const updatedMenuItems = itemData.menuItems.map((menuItem) =>
          menuItem.id === editItemID ? { ...menuItem, ...editedItem } : menuItem
        );

        await update(itemRef, { menuItems: updatedMenuItems });
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, menuItems: updatedMenuItems } : item
          ),
          itemLoading: false,
        }));
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },

  deleteCategory: async (itemId) => {
    set({ itemLoading: true });
    try {
      const itemRef = ref(database, `menu/${itemId}`);

      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        await remove(itemRef);

        // Update local state
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          itemLoading: false,
        }));
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },

  deleteItem: async (itemId, deleteItemID) => {
    set({ itemLoading: true });
    try {
      const itemRef = ref(database, `menu/${itemId}`);
      const snapshot = await get(itemRef);

      if (snapshot.exists()) {
        const itemData = snapshot.val();
        const updatedMenuItems = itemData.menuItems.filter(
          (menuItem) => menuItem.id !== deleteItemID
        );

        await update(itemRef, { menuItems: updatedMenuItems });
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, menuItems: updatedMenuItems } : item
          ),
          itemLoading: false,
        }));
      } else {
        throw new Error('Item not found');
      }
    } catch (error) {
      set({ error, itemLoading: false });
    }
  },
}));

export default itemStore;
