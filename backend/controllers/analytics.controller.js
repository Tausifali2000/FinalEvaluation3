import { Analytics } from "../models/analytics.model.js";

export const fetchAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { start, end } = req.body;

    // Find the analytics data for the user
    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(404).json({ message: "Analytics data not found." });
    }

    // Function to calculate the sum of clicks for a given array within a date range
    const calculateTotalClicks = (clicksArray) => {
      if (!start || !end) {
        return clicksArray.reduce((sum, entry) => sum + (entry.clicks || 0), 0);
      }
      return clicksArray
        .filter(entry => entry.date >= start && entry.date <= end)
        .reduce((sum, entry) => sum + (entry.clicks || 0), 0);
    };

    // Compute total clicks for each category based on the date range
    const totalProfileClicks = calculateTotalClicks(analytics.profileClicks);
    const totalShopClicks = calculateTotalClicks(analytics.shopClicks);
    const totalCtaClicks = calculateTotalClicks(analytics.cta);
    const totalOverallClicks = calculateTotalClicks(analytics.totalClicks);

    res.status(200).json({
      ...analytics.toObject(),
      totalProfileClicks,
      totalShopClicks,
      totalCtaClicks,
      totalOverallClicks
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
