import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTypeStore } from "../store/type.store";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  width: "240px",
  height: "35px",
  backgroundColor: "#c9c9c9",
  borderRadius: "100px",
  padding: "3px",
  display: "flex",
  alignItems: "center",
  gap: "1px"
});

const StyledToggleButton = styled(ToggleButton)(({ selected }) => ({
  width: "120px",
  height: "37px",
  borderRadius: "100px !important",
  fontSize: "14px  !important",
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

const MuiToggleButton = () => {
  const { previewType, setPreviewType } = useTypeStore();
  
  const handleChange = (_, newSelection) => {
    if (newSelection) { 
      setPreviewType(newSelection); // Update state only if a valid selection exists
    }
  };


  return (
    <StyledToggleButtonGroup
      value={previewType}
      exclusive
      onChange={handleChange}
      aria-label="toggle button"
    >
      <StyledToggleButton value="link" selected={previewType === "link"}>
        link
      </StyledToggleButton>
      <StyledToggleButton value="shop" selected={previewType === "shop"}>
        Shop
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default MuiToggleButton;
