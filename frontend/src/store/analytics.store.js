import axios from 'axios';
import {create} from 'zustand';


export const useAnalyticsStore = create((set) => ({
  isFetching: false,
  profileClicks: 0,
  shopClicks: 0,
  cta: 0,
  devices: {
    linux: 0,
    mac: 0,
    ios: 0,
    windows: 0,
    android: 0,
    other: 0
  },
  sites: {
    youtube: 0,
    facebook: 0,
    instagram: 0,
    other: 0
  },
  dates: [], // Store for date-wise clicks

  // Fetch analytics data from API
  fetchAnalytics: async (userId) => {
    set({ isFetching: true });
    try {
      const response = await axios.get("/api/analytics/fetch");

      set({
        isFetching: false,
        profileClicks: response.data.profileClicks || 0,
        shopClicks: response.data.shopClicks || 0,
        cta: response.data.cta || 0,
        devices: response.data.devices || {
          linux: 0, mac: 0, ios: 0, windows: 0, android: 0, other: 0
        },
        sites: response.data.sites || {
          youtube: 0, facebook: 0, instagram: 0, other: 0
        },
        dates: response.data.dates || [],
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      set({ isFetching: false });
    }
  }
}));