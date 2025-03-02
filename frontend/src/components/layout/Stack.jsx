import { CustomToast } from "../../App";
import { useAppearanceStore } from "../../store/appearance.store";

import { UAParser } from "ua-parser-js";
import { useTypeStore } from "../../store/type.store";
import styles from "./cssModules/Layout.module.css"
import design from "./cssModules/Styles.module.css"
import { useEffect } from "react";
import { useTreeStore } from "../../store/linkTree.store";

const Stack = ({ links, shopLinks, user, tree}) => {

  const { previewType } = useTypeStore();
    const{ button, font, fetchAppearance} = useAppearanceStore();
    const { profileClick, shopClick} = useTreeStore()

    

     const parser = new UAParser();
      const osName = parser.getOS().name || "other";
      const userId = user
       
      const check = tree

      useEffect(() => {
        if (check) {
          fetchAppearance();
        }
      }, [check]); 

      const handleProfileLinkClick = async (link) => {
        if (!check) {
          CustomToast.error("Preview only, use share");
          return;
        }

      try {
          await profileClick(userId, link.linkId, link.icon, osName);
          window.open(link.linkUrl, "_blank");
        } catch (error) {
          console.error("Error updating profile click:", error);
        }
      
      };

      const handleShopClick = async (shop) => {
        if (!check) {
          CustomToast.error("Preview only, use share");
          return;
        }
      
      try {
          await shopClick(userId, shop.shopId, osName);
          window.open(shop.shopUrl, "_blank");
        } catch (error) {
          console.error("Error updating shop click:", error);
        }
      
      };
      




  return (
    <div className={styles.stack}  >
      {previewType === "link" &&
        links.map((link) => (
          <button  className={`${design[`stack${button.type}`] || design.stackFill3}`} 
          style={{ boxShadow: button.shadowType, background: button.buttonColor, color: button.fontColor, fontFamily: font.name }}
          key={link.linkId}  onClick={() => handleProfileLinkClick(link)} >
            <div className={styles.stackImg}>
              <img src={`/links/${link.icon}.svg`} />
            </div>
            {link.linkTitle}
          </button>
        ))}

      {previewType === "shop" &&
        shopLinks.map((shop) => (
          <div className={`${design[`stackShop${button.type}`] || design.stackFill3}`} 
          key={shop.shopId} 
          style={{ boxShadow: button.shadowType, background: button.buttonColor, color: button.fontColor, fontFamily: font.name }}>
            <div className={styles.stackShopImg}>
              No Preview
            </div>
            <p>{shop.shopTitle}</p>
            <button className={styles.stackCart} onClick={() => handleShopClick(shop)} ><img src="/cart.svg" />Buy Now</button>
          </div>
        ))}
    </div>
  )
}

export default Stack