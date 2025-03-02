import { Appearance } from "../models/appearance.model.js";

export const fetchAppearance = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the appearance settings for the user
    let appearance = await Appearance.findOne({ userId });

    // If no appearance settings exist, create a default one
    if (!appearance) {
      appearance = new Appearance({ userId });
      await appearance.save();
    }

    res.status(200).json(appearance);
  } catch (error) {
    console.error("Error fetching appearance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const saveAppearance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { layout, buttonType, shadowType, buttonColor, fontColor, fontType, textColor, theme } = req.body;

   

    let appearance = await Appearance.findOne({ userId });

    if (!appearance) {
      appearance = new Appearance({
        userId,
        layout,
        button: {
          type: buttonType,
          shadowType,
          buttonColor,
          fontColor,
        },
        font: {
          name: fontType,
          textColor,
        },
        theme,
      });
    } else {
      appearance.layout = layout;
      appearance.button.type = buttonType;
      appearance.button.shadowType = shadowType;
      appearance.button.buttonColor = buttonColor;
      appearance.button.fontColor = fontColor;
      appearance.font.name = fontType;
      appearance.font.textColor = textColor;
      appearance.theme = theme;
    }

    await appearance.save();
    res.status(200).json({ message: "Appearance settings saved successfully", appearance });
  } catch (error) {
    console.error("Error saving appearance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
