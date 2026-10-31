import { create } from 'zustand';

export const useUiStore = create((set) => ({
  drawer: null,
  search: '',
  openNewApplication: () => set({ drawer: { id: null } }),
  openApplication: (id) => set({ drawer: { id } }),
  closeDrawer: () => set({ drawer: null }),
  setSearch: (search) => set({ search }),
}));
