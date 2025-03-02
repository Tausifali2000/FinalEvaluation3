import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./cssModules/Sidebar.module.css";
import { useSidebarStore } from "../store/sidebar.store";
import { useAuthStore } from "../store/auth.store";
import { Popover } from "@mui/material";

const Sidebar = () => {

   //Store Function
   const { selectedOption, setSelectedOption } = useSidebarStore();
   const { user, logout } = useAuthStore();
  
  const pfp = `http://localhost:5000${user.image}`

   const [anchorEl, setAnchorEl] = useState(null);
   


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

 

   const handleUserClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "logout-popover" : undefined;





  //Set userName in Greeting  
  const firstName = user?.firstName || "there";  
  const lastName = user?.lastName || "";  
  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <img src="/logo.svg" alt="Logo" />
        <h1>Spark</h1>
      </div>

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

      <div className={styles.userC} onClick={handleUserClick}>
        <div className={styles.user}>
        <img src={pfp}/>
        <p>{firstName} {lastName}</p>
        </div>
       
        <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  slotProps={{
    paper: {
      sx: {
        borderRadius: "22px", // ✅ Apply border-radius here
        marginTop: "10px",
      },
    },
  }}
>
        <div className={styles.logout} onClick={logout}>
          <img src="/auth/logout.svg" />
          <p>Logout</p>
        </div>
      </Popover>
     
      </div>
    </div>
  );
};

export default Sidebar;
