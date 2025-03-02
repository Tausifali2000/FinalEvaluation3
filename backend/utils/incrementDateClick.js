import dayjs from "dayjs";
import { Analytics } from "../models/analytics.model.js";



export async function incrementDateClick(userId) {
  try {
    // Get current date in Indian Standard Time (IST)
    const now = new Date().toLocaleString("en-IN", { 
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    // Convert to "2 Mar, 2025" format
    const [day, month, year] = now.split(" ");
    const today = `${day} ${month.replace(",", "")}, ${year}`;

    // Find the analytics record for the user
    let analytics = await Analytics.findOne({ userId });

    if (!analytics) {
      // If analytics record does not exist, create a new one
      analytics = new Analytics({
        userId,
        dates: [{ date: today, clicks: 1 }], // Initialize today's date with 1 click
      });
    } else {
      // Check if today's date already exists in the analytics record
      const todayEntry = analytics.dates.find(entry => entry.date === today);

      if (todayEntry) {
        todayEntry.clicks += 1; // Increment click count for today
      } else {
        analytics.dates.push({ date: today, clicks: 1 }); // Add new date entry
      }
    }

    await analytics.save(); // Save updated analytics record
  } catch (error) {
    console.error("Error incrementing date clicks:", error);
    throw new Error("Failed to update date clicks.");
  }
}
