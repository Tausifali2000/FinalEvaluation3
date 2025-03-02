import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import styles from "./cssModules/MobileHeader.module.css"
import { Popover } from "@mui/material";

const MobileHeader = () => {
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);

  const pfp = `http://localhost:5000${user.image}`

  
  const handleUserClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "logout-popover" : undefined;
  return (
    <div className={styles.header}>
      <div className={styles.brand}>
        <img src="/logo.svg" />
        <h1>SPARK&nbsp;&nbsp;<div className={styles.trademark}>™</div></h1>

      </div>

      <div className={styles.user} onClick={handleUserClick}>
        <img src={pfp} />
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
  )
}

export default MobileHeader