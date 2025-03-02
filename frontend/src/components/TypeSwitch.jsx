import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTypeStore } from "../store/type.store";
import { useScreenStore } from "../store/screen.store";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({  screensize }) => ({
  width: screensize < 650 ? "200px" : "240px", // Decrease by 30% if screen is less than 650px
  height: screensize < 650 ? "30px" : "35px",
  backgroundColor: "#f3f3f1",
  borderRadius: "100px",
  padding: "3px",
  display: "flex",
  alignItems: "center",
  gap: "1px"
}));

const StyledToggleButton = styled(ToggleButton)(({ selected, screensize }) => ({
  width: screensize < 650 ? "84px" : "120px", // Decrease by 30%
  height: screensize < 650 ? "20px" : "37px",
  borderRadius: "100px !important",
  fontSize: screensize < 650 ? "8px !important" : "14px  !important", 
  fontWeight: "500",
  border: "none",
  gap: "8px",
  textTransform: "none",

  backgroundColor: selected ? "#28A263 !important" : "transparent",
  color: selected ? "#fff !important" : "#595959",
  "&:hover": {
    backgroundColor: selected ? "#28A263" : "#d6d6d6",
  },
}));

const TypeSwitch = () => {
  const { selectedType, setSelectedType } = useTypeStore();
  const {screenSize} = useScreenStore()

  
 
  const handleChange = (_, newSelection) => {
    if (newSelection) { 
      setSelectedType(newSelection); // Update state only if a valid selection exists
    }
  };

  return (
    <StyledToggleButtonGroup
      value={selectedType}
      exclusive
      onChange={handleChange}
      aria-label="toggle button"
      screensize={screenSize} 
    >
      <StyledToggleButton value="link" selected={selectedType === "link"}>
        <img src={selectedType === "link" ? "/links/activeShop.svg" : "/links/shop.svg"}/>link
      </StyledToggleButton>
      <StyledToggleButton value="shop" selected={selectedType === "shop"}>
      <img src={selectedType === "shop" ? "/links/activeShop.svg" : "/links/shop.svg"}/> Shop
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default TypeSwitch;
