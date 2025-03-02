import { useEffect } from "react";
import { CustomToast } from "../../App";
import { useAppearanceStore } from "../../store/appearance.store";
import { useTypeStore } from "../../store/type.store";
import styles from "./cssModules/Layout.module.css"
import design from "./cssModules/Styles.module.css"
import { UAParser } from "ua-parser-js";
import { useTreeStore } from "../../store/linkTree.store";

const Grid = ({ links, shopLinks, user, tree }) => {

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

const specialButtons = ["Special1", "Special2", "Special3", "Special4", "Special5", "Special6"];
if (specialButtons.includes(button.type)) {
  CustomToast.error("Special buttons only work in Stack.");
  
}


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
    <div className={styles.grid}>
      {previewType === "link" &&
        links.map((link) => (
          <button 
         className={`${design[`grid${button.type}`] || design.gridFill3}`} 
          key={link.linkId} 
          style={{ boxShadow: button.shadowType, background: button.buttonColor, color: button.fontColor, fontFamily: font.name }}
          onClick={() => handleProfileLinkClick(link)}>
            <div className={styles.gridImg}>
              <img src={`/links/${link.icon}.svg`} />
            </div>
            {link.linkTitle}
          </button>
        ))}

      {previewType === "shop" &&
        shopLinks.map((shop) => (
          <div 
          style={{ boxShadow: button.shadowType, background: button.buttonColor, color: button.fontColor, fontFamily: font.name }}
          className={`${design[`gridShop${button.type}`] || design.gridFill3}`} 
          key={shop.shopId}>
            <div className={styles.gridShopImg}>
              No Preview
            </div>
            <p>{shop.shopTitle}</p>
            <button className={styles.cartGrid}  onClick={() => handleShopClick(shop)} ><img src="/cart.svg" />Buy Now</button>
          </div>
        ))}
    </div>
  )
}

export default Grid