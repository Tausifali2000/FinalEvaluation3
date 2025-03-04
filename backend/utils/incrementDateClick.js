import { Analytics } from "../models/analytics.model.js";

export async function incrementDateClick(userId, type) {
  try {
    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    const [day, month, year] = now.split(" ");
    const today = `${day} ${month.replace(",", "")}, ${year}`;

    let analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      analytics = new Analytics({
        userId,
        profileClicks: [],
        shopClicks: [],
        cta: [],
        totalClicks: [{ date: today, clicks: 1 }]
      });

      if (type === "profile") {
        analytics.profileClicks.push({ date: today, clicks: 1 });
      } else if (type === "shop") {
        analytics.shopClicks.push({ date: today, clicks: 1 });
      } else if (type === "cta") {
        analytics.cta.push({ date: today, clicks: 1 });
      }
    } else {
      // Helper function to update clicks
      const updateClickArray = (clickArray) => {
        const todayEntry = clickArray.find(entry => entry.date === today);
        if (todayEntry) {
          todayEntry.clicks += 1;
        } else {
          clickArray.push({ date: today, clicks: 1 });
        }
      };

      // Update based on type
      if (type === "profile") updateClickArray(analytics.profileClicks);
      if (type === "shop") updateClickArray(analytics.shopClicks);
      if (type === "cta") updateClickArray(analytics.cta);

      // Always update totalClicks
      updateClickArray(analytics.totalClicks);
    }

    await analytics.save(); // Save updated analytics record
  } catch (error) {
    console.error("Error incrementing date clicks:", error);
    throw new Error("Failed to update date clicks.");
  }
}
