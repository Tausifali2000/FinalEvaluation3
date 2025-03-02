import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";


export const useTreeStore = create((set) => ({
  background: "", 
  layout: "stack",
  button: {
    type: "Fill3",
    shadowType: "none",
    buttonColor: "#C9C9C9",
    fontColor: "#000000"
  },
  font: {
    name: "Inter",
    textColor: "#FFFFFF"
  },
  theme: "#FFFFFF",
  isFetching: false,
  profileLinks: [],
  shopLinks: [],
  username: "",
  image: "/uploads/pfp.svg",


  fetchTree: async (userId) => {
    set({ isFetching: true });
    try {
      const response = await axios.get(`/api/linktree/${userId}`);

      set({
        background: response.data.appearance.background,
        layout: response.data.appearance.layout,
        button: response.data.appearance.button,
        font: response.data.appearance.font,
        theme: response.data.appearance.theme,
        profileLinks: response.data.profileLinks || [],
        shopLinks: response.data.shopLinks || [],
        username: response.data.username,
        image: response.data.image || "/uploads/pfp.svg",
        isFetching: false
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      set({ isFetching: false });
    }
  },

  profileClick: async (userId, linkId, icon, os) => {
    try {
      await axios.post(`/api/linktree/profileclick/${userId}`, {
        linkId,
        icon,
        os
      });
      toast.success("Profile Click successfully");
    } catch (error) {
      console.error("Error updating profile click:", error);
    }
  },

  shopClick: async (userId, shopId,  os) => {
    try {
      await axios.post(`/api/linktree/shopclick/${userId}`, {
        shopId,
        os
      });
      toast.success("Shop Click successfully");
    } catch (error) {
      console.error("Error updating shop click:", error);
    }
  },

  addCta: async (userId) => {
    try {
      const response = await axios.post(`/api/linktree/addcta/${userId}`);
    
    } catch (error) {
      console.error("Error updating CTA count:", error);
    }
  },

  toggleClick: async (userId, type, os) => {
    try {
      const response = await axios.post(`/api/linktree/toggleClick/${userId}`, {type, os});
    
    } catch (error) {
      console.error("Error updating toggleClick count:", error);
    }
  },
}));

