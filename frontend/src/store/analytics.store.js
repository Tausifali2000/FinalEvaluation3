import axios from 'axios';
import { create } from 'zustand';

export const useAnalyticsStore = create((set) => ({
  isFetching: false,
  profileClicks: [],
  shopClicks: [],
  cta: [],
  totalClicks: [],
  totalProfileClicks: 0,
  totalShopClicks: 0,
  totalCtaClicks: 0,
  totalOverallClicks: 0,
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

  // Fetch analytics data from API
  fetchAnalytics: async (start, end) => {
    set({ isFetching: true });

    try {
      const response = await axios.post("/api/analytics/fetch", { start, end });

      set({
        isFetching: false,
        profileClicks: response.data.profileClicks || [],
        shopClicks: response.data.shopClicks || [],
        cta: response.data.cta || [],
        totalClicks: response.data.totalClicks || [],
        totalProfileClicks: response.data.totalProfileClicks || 0,
        totalShopClicks: response.data.totalShopClicks || 0,
        totalCtaClicks: response.data.totalCtaClicks || 0,
        totalOverallClicks: response.data.totalOverallClicks || 0,
        devices: response.data.devices || {
          linux: 0, mac: 0, ios: 0, windows: 0, android: 0, other: 0
        },
        sites: response.data.sites || {
          youtube: 0, facebook: 0, instagram: 0, other: 0
        }
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      set({ isFetching: false });
    }
  }
}));
