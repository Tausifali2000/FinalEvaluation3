import { create } from "zustand";
import axios from "axios";
import { CustomToast } from "../App";

export const useAppearanceStore = create((set, get) => ({
  background: "#342B26",
  layout: "stack",
  button: {
    type: "Fill3",
    shadowType: "none",
    buttonColor: "#C9C9C9",
    fontColor: "#000000",
  },
  font: {
    name: "",
    textColor: "#",
  },
  theme: "#FFF2FF",
  isLoading: false,
  error: null,
  isSaving: false,

  /** Fetch appearance settings from DB and update Zustand state */
  fetchAppearance: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get("/api/appearance/fetch"); // Adjust API route if needed
      const data = response.data; // Store response data

      // ✅ Set Zustand state with fetched values
      set({
        background: data.background || "#342B26",
        layout: data.layout || "stack",
        button: {
          type: data.button?.type || "Fill3",
          shadowType: data.button?.shadowType || "none",
          buttonColor: data.button?.buttonColor || "#C9C9C9",
          fontColor: data.button?.fontColor || "#000000",
        },
        font: {
          name: data.font?.name || "Inter",
          textColor: data.font?.textColor || "#FFFFFF",
        },
        theme: data.theme || "#FFFFFF",
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch appearance:", error);
      set({
        error: error.response?.data?.message || "Failed to load appearance",
        isLoading: false,
      });
    }
  },

  /** Save appearance settings to DB */
  saveAppearance: async () => {
    set({ isSaving: true, error: null });
  
    try {
      const { layout, button, font, theme } = get(); // Extract current Zustand state
      
      const appearanceData = {
        layout,
        buttonType: button.type,
        shadowType: button.shadowType,
        buttonColor: button.buttonColor,
        fontColor: button.fontColor,
        fontType: font.name,
        textColor: font.textColor,
        theme,
      };
  
      await axios.post("/api/appearance/save", appearanceData);
      CustomToast.success("Successfully saved");
  
      set({ isSaving: false });
    } catch (error) {
      console.error("Failed to save appearance:", error);
      set({
        error: error.response?.data?.message || "Failed to save appearance",
        isSaving: false,
      });
    }
  },

  /** Real-time state updates */
  setBackground: (newBackground) => set({ background: newBackground }),
  setLayout: (newLayout) => set({ layout: newLayout }),
  setTheme: (newTheme) => set({ theme: newTheme }),
  setButtonColor: (newColor) =>
    set((state) => ({ button: { ...state.button, buttonColor: newColor } })),
  setFontColor: (newColor) =>
    set((state) => ({ button: { ...state.button, fontColor: newColor } })),
  setShadowType: (newShadowType) =>
    set((state) => ({ button: { ...state.button, shadowType: newShadowType } })),
  setButtonType: (newType) =>
    set((state) => ({ button: { ...state.button, type: newType } })),
  setFontName: (newFont) =>
    set((state) => ({ font: { ...state.font, name: newFont } })),
  setTextColor: (newColor) =>
    set((state) => ({ font: { ...state.font, textColor: newColor } })),
}));
