import { Analytics } from "../models/analytics.model.js";
import { Appearance } from "../models/appearance.model.js";
import { Link } from "../models/link.model.js";
import { User } from "../models/user.model.js";

import { incrementDateClick } from "../utils/incrementDateClick.js";


export async function fetchTree(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId).select("username image");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch appearance data
    const appearance = await Appearance.findOne({ userId });

    // Fetch links data
    const links = await Link.findOne({ userId });

    res.json({
      username: user.username,
      image: user.image,
      appearance: appearance || {}, // Send all appearance data
      profileLinks: links ? links.profileLinks : [],
      shopLinks: links ? links.shopLinks : [],
    });

  } catch (error) {
    console.error("Error fetching user tree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addCta(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Call the new function with type "cta"
    await incrementDateClick(userId, "cta");

    // Fetch updated analytics
    const analytics = await Analytics.findOne({ userId });

    res.json({
      message: "CTA count updated successfully",
      cta: analytics?.cta || [],
    });

  } catch (error) {
    console.error("Error updating CTA count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export async function profileClick(req, res) {
  try {
    const { linkId, icon, os } = req.body; // Extract link ID, icon, and OS
    const { userId } = req.params; // Extract user ID from params

  

    // Map icon to site analytics field
    const siteField = ["youtube", "facebook", "instagram", "twitter"].includes(icon)
      ? `sites.${icon}`
      : "sites.other";

    // Map OS to device analytics field
    const osMap = {
      iOS: "devices.ios",
      Windows: "devices.windows",
      Android: "devices.android",
      macOS: "devices.mac",
      Linux: "devices.linux",
    };
    const deviceField = osMap[os] || "devices.other";

    // Update site & device tracking
    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId }, // Find by userId
      {
        $inc: {
          [siteField]: 1,      // Increment site click count
          [deviceField]: 1,    // Increment device click count
        },
      },
      { upsert: true, new: true } // Create new doc if not exists, return updated
    );

    // Call the new function to handle profile click tracking
    await incrementDateClick(userId, "profile");

    // Increment clicks for the specific profile link
    const updatedLink = await Link.findOneAndUpdate(
      { userId, "profileLinks.linkId": linkId }, // Find user and specific link
      { $inc: { "profileLinks.$.clicks": 1 } }, // Increment clicks
      { new: true } // Return the updated document
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Profile link not found" });
    }

    res.status(200).json({
      message: "Profile link click recorded successfully",
      updatedAnalytics,
      updatedLink,
    });
  } catch (error) {
    console.error("Error updating analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}



export async function shopClick(req, res) {
  try {
    const { shopId, os } = req.body; // Extract shop ID and OS
    const { userId } = req.params; // Extract user ID from params
    const type = "shop"; // Define type for tracking

    // Map OS to device analytics field
    const osMap = {
      iOS: "devices.ios",
      Windows: "devices.windows",
      Android: "devices.android",
      macOS: "devices.mac",
      Linux: "devices.linux",
    };
    const deviceField = osMap[os] || "devices.other";

    // Update analytics for device tracking
    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId }, // Find by userId
      { $inc: { [deviceField]: 1 } }, // Increment device click count
      { upsert: true, new: true } // Create new doc if not exists, return updated
    );

    // Update shop click count in analytics
    await incrementDateClick(userId, type);

    // Update shop link click count
    const updatedShop = await Link.findOneAndUpdate(
      { userId, "shopLinks.shopId": shopId }, // Find user and specific shop link
      { $inc: { "shopLinks.$.clicks": 1 } }, // Increment clicks
      { new: true } // Return the updated document
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop link not found" });
    }

    res.status(200).json({
      message: "Shop link successfully updated",
      updatedAnalytics,
      updatedShop,
    });
  } catch (error) {
    console.error("Error updating analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}


export async function toggleClick(req, res) {
  try {
    const { type, os } = req.body;
    const { userId } = req.params;

    if (!userId || !type) {
      return res.status(400).json({ message: "User ID and type are required." });
    }

    // Map OS to device analytics field
    const osMap = {
      iOS: "devices.ios",
      Windows: "devices.windows",
      Android: "devices.android",
      macOS: "devices.mac",
      Linux: "devices.linux",
    };
    const deviceField = osMap[os] || "devices.other";

    // Ensure type is one of the expected values
    const validTypes = ["profile", "shop", "cta"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid type parameter." });
    }

    // Update analytics for device tracking
    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId },
      { $inc: { [deviceField]: 1 } }, // Increment device click count
      { upsert: true, new: true }
    );

    // Update click counts based on type
    await incrementDateClick(userId, type);

    res.status(200).json({
      message: "Analytics updated successfully",
      analytics: updatedAnalytics,
    });

  } catch (error) {
    console.error("Error updating analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
