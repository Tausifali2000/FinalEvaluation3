import { create } from "zustand";

export const useTypeStore = create((set) => ({
  selectedType: "link", // Default value
  previewType: "link",

  setSelectedType: (type) => set({ selectedType: type }),

  setPreviewType: (type) => set({previewType: type})
}));
