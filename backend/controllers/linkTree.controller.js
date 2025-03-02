import { Analytics } from "../models/analytics.model.js";
import { Appearance } from "../models/appearance.model.js";
import { Link } from "../models/link.model.js";
import { User } from "../models/user.model.js";
import dayjs from "dayjs"; // Import Day.js
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

    // Increment CTA count by 1
    const analytics = await Analytics.findOneAndUpdate(
      { userId },
      { $inc: { cta: 1 } },
      { new: true, upsert: true } 
    );
    await incrementDateClick(userId); 

    res.json({
      message: "CTA count updated successfully",
      cta: analytics.cta,
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

    const today = dayjs().format("MMM D, YYYY");

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

    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId }, // Find by userId
      {
        $inc: {
          [siteField]: 1,      // Increment site click count
          [deviceField]: 1,    // Increment device click count
          profileClicks: 1     // Increment profile clicks count
        },
      },
      { upsert: true, new: true } // Create new doc if not exists, return updated
    );

    await incrementDateClick(userId); 

    const updatedLink = await Link.findOneAndUpdate(
      { userId, "profileLinks.linkId": linkId }, // Find user and specific link
      { $inc: { "profileLinks.$.clicks": 1 } }, // Increment clicks
      { new: true } // Return the updated document
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Profile link not found" });
    }

    res.status(200).json({
      message: "profile Link successfully",
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
    const { shopId, os } = req.body; // Extract link ID, icon, and OS
    const { userId } = req.params; // Extract user ID from params

   


    // Map OS to device analytics field
    const osMap = {
      iOS: "devices.ios",
      Windows: "devices.windows",
      Android: "devices.android",
      macOS: "devices.mac",
      Linux: "devices.linux",
    };
    const deviceField = osMap[os] || "devices.other";

    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId }, // Find by userId
      {
        $inc: {
          [deviceField]: 1,    // Increment device click count
          shopClicks: 1     // Increment profile clicks count
        },
      },
      { upsert: true, new: true } // Create new doc if not exists, return updated
    );

    await incrementDateClick(userId); 

    const updatedShop = await Link.findOneAndUpdate(
      { userId, "shopLinks.shopId": shopId }, // Find user and specific link
      { $inc: { "shopLinks.$.clicks": 1 } }, // Increment clicks
      { new: true } // Return the updated document
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop link not found" });
    }

    res.status(200).json({
      message: "Shop Link successfully",
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
    console.log(type)
   

    if (!userId || !type) {
      return res.status(400).json({ message: "User ID and type are required." });
    }

    const osMap = {
      iOS: "devices.ios",
      Windows: "devices.windows",
      Android: "devices.android",
      macOS: "devices.mac",
      Linux: "devices.linux",
    };
    const deviceField = osMap[os] || "devices.other";

    await incrementDateClick(userId); 

    // Determine the correct field to increment based on type
    const incrementField = type === "link" ? "profileClicks" : "shopClicks";

    const updatedAnalytics = await Analytics.findOneAndUpdate(
      { userId },
      {
        $inc: {
          [deviceField]: 1,
          [incrementField]: 1,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Analytics updated successfully", analytics: updatedAnalytics });

  } catch (error) {
    console.error("Error updating analytics:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

