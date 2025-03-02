import { User } from "../models/user.model.js";
import { Appearance } from "../models/appearance.model.js";
import { Link } from "../models/link.model.js";


export async function profileSave(req, res) {
  try {
    

    const { username, bio, color, links, shopLinks } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    const userId = req.user.id;
  console.log(shopLinks);

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(409).json({ success: false, field:"username", message: "Username is already taken" });
    }

    // Update user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update or create appearance settings
    let userAppearance = await Appearance.findOne({ userId });

    if (userAppearance) {
      userAppearance.background = color;
    } else {
      userAppearance = new Appearance({ userId, background: color });
    }

    await userAppearance.save();

    // Update or create links only if provided in request
    if (links !== undefined || shopLinks !== undefined) {
      let userLinks = await Link.findOne({ userId });

      if (!userLinks) {
        userLinks = new Link({ userId, profileLinks: [], shopLinks: [] });
      }

      // Only update `profileLinks` if `links` is provided
      if (Array.isArray(links)) {
        userLinks.profileLinks = links.map(link => ({
          linkId: link.linkId,
          linkTitle: link.linkTitle,
          linkUrl: link.linkUrl,
          icon: link.icon || "",
          clicks: link.clicks
        }));
      }

      // Only update `shopLinks` if `shopLinks` is provided
      if (Array.isArray(shopLinks)) {
        userLinks.shopLinks = shopLinks.map(shopLink => ({
          shopId: shopLink.shopId,
          shopTitle: shopLink.shopTitle,
          shopUrl: shopLink.shopUrl,
          clicks: shopLinks.clicks
        }));
      }

      await userLinks.save();
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      appearance: userAppearance
    });

  } catch (error) {
    console.error("Error Saving Profile:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

export async function fetchProfile(req, res) {
  try {
    const userId = req.user.id;

    // Find user's appearance settings
    const appearance = await Appearance.findOne({ userId });

    // Find user's links (profile & shop)
    const links = await Link.findOne({ userId });

    if (!appearance) {
      return res.status(404).json({ message: "Appearance settings not found" });
    }

    res.json({
      background: appearance.background,
      profileLinks: links ? links.profileLinks : [],
      shopLinks: links ? links.shopLinks : []
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function imageUpload(req, res) { 

  try {

    const userId = req.user.id;
    const imageUrl = `/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(userId, { image: imageUrl });
    res.json({ message: "Image uploaded successfully", imageUrl });
    
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Server error" });
  }
}


