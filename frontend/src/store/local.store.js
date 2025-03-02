import { create } from "zustand";


export const useLocalStore = create((set) => ({
  fetchLinks: [],
  fetchShops: [],
  localFont: "Intern",

  setFetchLinks: (links) => set({ fetchLinks: links }),
  setFetchShops: (shops) => set({ fetchShops: shops }),
  setLocalFont: (font) => set({ localFont: font }),

 
}));