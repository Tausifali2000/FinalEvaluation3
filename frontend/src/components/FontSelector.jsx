import { useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import styles from "./cssModules/FontSelector.module.css";
import { useAppearanceStore } from "../store/appearance.store";

const fontOptions = [
  { label: "Inter", value: '"Inter", serif'},
  { label: "Poppins", value: '"Poppins", serif' },
  { label: "Outfit", value: '"Outfit", serif' },
  { label: "Roboto", value: '"Roboto", serif' },
  { label: "DM Sans", value: '"DM Sans", serif' },
  { label: "Plus Jakarta Sans", value: '"Plus Jakarta Sans", serif' },
];

const FontSelector = () => {
  const { font, setFontName, fetchAppearance, isLoading } = useAppearanceStore(); // Zustand store

  const [selectedFont, setSelectedFont] = useState(font.name || "Inter"); // Default to Inter

  // Fetch appearance data when the component mounts
  useEffect(() => {
    fetchAppearance();
  }, []);

  // Update selectedFont when Zustand state updates
  useEffect(() => {
    if (font.name) {
      setSelectedFont(font.name);
    }
  }, [font.name]);

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setSelectedFont(newFont);
    setFontName(newFont); // Update Zustand store
  };

  return (
    <div className={styles.fontSelector}>
      {isLoading ? (
        <p>Loading fonts...</p>
      ) : (
        <>
          <div className={styles.fontPrev} style={{ fontFamily: selectedFont }}>
            Aa
          </div>
          <Select
            value={selectedFont}
            onChange={handleFontChange}
            variant="outlined"
            className={styles.fontSelect}
            sx={{
              border: "none",
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" },
            }}
            displayEmpty
          >
            {fontOptions.map((font) => (
              <MenuItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </div>
  );
};

export default FontSelector;
