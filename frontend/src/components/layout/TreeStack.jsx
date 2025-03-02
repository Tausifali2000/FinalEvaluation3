import { useEffect } from "react";
import { CustomToast } from "../../App";
import { useAppearanceStore } from "../../store/appearance.store";
import { UAParser } from "ua-parser-js";
import { useTreeStore } from "../../store/linkTree.store";
import { useTypeStore } from "../../store/type.store";
import styles from "./cssModules/Layout.module.css"
import design from "./cssModules/styles.module.css"
import { useParams } from "react-router-dom";

const TreeStack = ({  user}) => {

  const { previewType } = useTypeStore();
  const { username,
    background,
    profileLinks,
    shopLinks,
    fetchTree,
    profileClick,
    layout,
    button,
    font,
    theme } = useTreeStore()

    const userId = user

    
   

    const parser = new UAParser();
      const osName = parser.getOS().name || "other";
      
  let shadow = "none"
  
  if (["HardShadow1", "HardShadow2", "HardShadow3"].includes(button.shadowType)) {
    shadow = "4px 4px 0px black"; 
  }

  if (["SoftShadow1", "SoftShadow2", "SoftShadow3"].includes(button.shadowType)) {
    shadow = "0px 4px 4px rgba(0, 0, 0, 0.40)"; 
  }


  const handleProfileLinkClick = async (link) => {
    console.log("Profile Link Clicked:", {
      userId,
      linkId: link.linkId,
      icon: link.icon,
      os: osName,
      url: link.linkUrl
    });
  
    try {
      await profileClick(userId, link.linkId, link.icon, osName); // Wait for success
      window.open(link.linkUrl, "_blank"); // Opens in a new tab
    } catch (error) {
      console.error("Error updating profile click:", error);
    }
  };
  const handleShopLinkClick = (shop) => {
    console.log(`UserID: ${userId} | Shop Link Clicked: ${shop.shopTitle} (ID: ${shop.shopId}, Icon: ${shop.icon})`);
  };


  return (
    <div className={styles.stack}  >
      {previewType === "link" &&
        profileLinks.map((link) => (
          <button  className={`${design[`stack${button.type}`] || design.stackFill3}`} 
          style={{ boxShadow: shadow, background: button.buttonColor, color: button.fontColor, fontFamily: font.name }}
          key={link.linkId} onClick={() => handleProfileLinkClick(link)}>
            <div className={styles.stackImg}>
              <img src={`/links/${link.icon}.svg`} />
            </div>
            {link.linkTitle}
          </button>
        ))}

      {previewType === "shop" &&
        shopLinks.map((shop) => (
          <div className={styles.stackShop} key={shop.shopId}>
            <div className={styles.stackShopImg}>
              No Preview
            </div>
            <p>{shop.shopTitle}</p>
            <button className={styles.stackCart} onClick={() => handleShopLinkClick(shop)}><img src="/cart.svg" />Buy Now</button>
          </div>
        ))}
    </div>
  )
}

export default TreeStack