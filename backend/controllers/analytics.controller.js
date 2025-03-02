import { Analytics } from "../models/analytics.model.js";


export const fetchAnalytics = async (req, res) => {
  try {
 
    const userId = req.user.id;
    // Find the analytics data for the user
    const analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      return res.status(404).json({ message: "Analytics data not found." });
    }

    res.status(200).json(analytics); // Send analytics data
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};