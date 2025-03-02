import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./cssModules/MobileSidebar.module.css";

import { Popover } from "@mui/material";
import { useSidebarStore } from "../../store/sidebar.store";
import { useAuthStore } from "../../store/auth.store";

const MobileSidebar = () => {

   //Store Function
   const { selectedOption, setSelectedOption } = useSidebarStore();
   const { user, logout } = useAuthStore();

   //useNavigate Hook
   const navigate = useNavigate();
 
 //Navigates to selected option
 useEffect(() => {
  if (selectedOption) {
    navigate(selectedOption === "/" ? "/" : `/${selectedOption}`);
  }
}, [selectedOption, navigate]);

 
   //Handle Sidebar clicks
   const handleOptionClick = (option) => {
  
    setSelectedOption(option);
   };

 







  return (
    <div className={styles.sidebar}>
      

      <div className={styles.options}>
        <NavLink to="/" end onClick={() => handleOptionClick("/")}
        className={({ isActive }) =>
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }>
            {({ isActive }) => (
          <div className={styles.option}>
            <img src={isActive ? "/sidebar/activeSide1.svg" : "/sidebar/side1.svg"}  />
            <p>Links</p>
          </div>
            )}
        </NavLink>

        <NavLink to="/appearance" onClick={() => handleOptionClick("appearance")}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }>
          {({ isActive }) => (
          <div className={styles.option}>
            <img src={isActive ? "/sidebar/activeSide2.svg" : "/sidebar/side2.svg"}  />
            <p>Appearance</p>
          </div>
            )}
        </NavLink>

        <NavLink to="/analytics" onClick={() => handleOptionClick("analytics")}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }>
             {({ isActive }) => (
          <div className={styles.option}>
            <img src={isActive ? "/sidebar/activeSide3.svg" : "/sidebar/side3.svg"}  />
            <p>Analytics</p>
          </div>
            )}
        </NavLink>

        <NavLink to="/settings" onClick={() => handleOptionClick("settings")}
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }>
           {({ isActive }) => (
          <div className={styles.option}>
            <img src={isActive ? "/sidebar/activeSide4.svg" : "/sidebar/side4.svg"}  />
            <p>Settings</p>
          </div>
            )}
        </NavLink>
      </div>

    </div>
  );
};

export default MobileSidebar;
