import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { CustomToast } from "../App";

export const useProfileStore = create((set, get) => ({
  background: "#342B26",
  links: [],
  shopLinks: [],
  isFetching: false,
  isSaving: false,
  image: "/links/pfp.svg",
  error: null,

  /** Fetch profile settings from DB and update Zustand state */
  fetchProfile: async () => {
    set({ isFetching: true, error: null });

    try {
      const response = await axios.get("/api/profile/fetchProfile");
      const { background, profileLinks, shopLinks } = response.data;

      set({
        background: background || "#342B26",
        links: profileLinks || [],
        shopLinks: shopLinks || [],
        isFetching: false,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      set({
        isFetching: false,
        error: error.response?.data?.message || "Failed to load profile",
      });
    }
  },

  /** Save profile settings to DB */
  saveProfile: async (formData, links, shopLinks) => {
    try {
      set({ isSaving: true });
      const payload = { ...formData, links, shopLinks }; 
     

      const response = await axios.post("/api/profile/save", payload);

      if (response.data.success) {
        set({ isSaving: false });
          CustomToast.success("Successfully saved");
      } else {
        toast.error("Error saving profile:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
      set({ isSaving: false, error: { field, message } });
    } 
  },

  imageUpload: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/profile/imageupload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.imageUrl) {
        set({ image: response.data.imageUrl });
        CustomToast.success("Image uploaded successfully!");
      } else {
        toast.error("Error uploading image");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
  },
  /** Real-time state updates */
  setBackground: (newBackground) => set({ background: newBackground }),
  setLinks: (newLinks) => set({ links: newLinks }),
  setShopLinks: (newShopLinks) => set({ shopLinks: newShopLinks }),
}));
