import axios from 'axios';
import {create} from 'zustand';
import { CustomToast } from "../App";


export const useAuthStore = create((set) => ({
  withCredentials: true,
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  isUsername: false,
  isUpdatingUser: false,
  error: null,


  signup: async (credentials, navigate) => {
    set({ isSigningUp: true, error: null });
    try {
      const response = await axios.post("/api/auth/signup", credentials, { withCredentials: true });
      set({ user: response.data.user, isSigningUp: false });
      navigate("/username");
    } catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
      set({ isSigningUp: false, user: null, error: { field, message } });
      
     
    }
  },

  username: async (username, navigate) => {
    set({ isUsername: true, error: null });
    try {
      const response = await axios.post("/api/auth/username", username, { withCredentials: true });
      set({ user: response.data.user, isUsername: false });
      navigate("/");
    } catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
      set({ isUsername: false, error: { field, message } });
      
     
    }
  },
  

 
  signin: async (credentials, navigate) => {
		set({ isLoggingIn: true, error: null});
		try {
			const response = await axios.post("/api/auth/signin", credentials, { withCredentials: true });
			set({ user: response.data.user, isLoggingIn: false });
      navigate("/"); 
		} catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
			set({ isLoggingIn: false, user: null, error: { field, message }});
     
		}
	},
  
  logout: async () => {
    set({isLoggingOut:true})
    try {
      await axios.post("/api/auth/logout",  { withCredentials: true })
      set({user: null, isLoggingOut: false});
    } catch (error) {
      set({isLoggingOut: false});
    
    }
  },
  
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/auth/authCheck", {
        withCredentials: true,
      });
      
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth check failed:", error.response?.status); 
  
      // If user is unauthorized (cookie deleted, session expired), force logout
      if (error.response?.status === 401) {
        set({ user: null, isCheckingAuth: false });
      } else {
        set({ isCheckingAuth: false, user: null });
      }
    }
  },

  updateUser: async (credentials) => {
    set({ isUpdatingUser: true, error: null });
    try {
      const response = await axios.post("/api/auth/updateuser", credentials, { withCredentials: true });
      set({  isUpdatingUser: false });
      CustomToast.success("Successfully saved");
    } catch (error) {
      const field = error.response?.data?.field || null;
      const message = error.response?.data?.message || "An error occurred";
      set({ isUpdatingUser: false,  error: { field, message } });
    }
  }
  
}))