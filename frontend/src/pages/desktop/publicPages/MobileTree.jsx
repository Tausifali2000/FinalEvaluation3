import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import styles from "./cssModules/MobileTree.module.css"
import { useTreeStore } from "../../../store/linkTree.store";
import Stack from "../../../components/layout/Stack";
import Grid from "../../../components/layout/Grid";
import Carousel from "../../../components/layout/Carousel";

import TreeSwitch from "../../../components/TreeSwitch";
import { CustomToast } from "../../../App";

const MobileTree = () => {

  const { username,
    background,
    profileLinks,
    shopLinks,
    fetchTree,
    layout,
    addCta,
    font,
    theme,
    image } = useTreeStore()

  const { userId } = useParams();

  const tree = true
  let pfp = `https://finalevaluation3.onrender.com${image}`

  useEffect(() => {
    fetchTree(userId);
  }, [fetchTree, userId]);

  const handleCtaClick = async () => {
    try {
      await addCta(userId);
      window.open("/", "_blank"); // Open "/" in a new tab
    } catch (error) {
      console.error("Error updating CTA count:", error);
    }
  };

    const handleShare = async () => {
      try {
        const currentURL = window.location.href;
        await navigator.clipboard.writeText(currentURL);
        CustomToast.success("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy link:", error);
        CustomToast.error("Failed to copy link. Try again!");
      }
    };
  

  return (
    <div className={styles.body}>
      <div className={styles.linkTree}  >
        <div className={styles.preview} style={{ backgroundColor: theme, fontFamily: font.name }}>
          <div className={styles.banner}
            style={{ backgroundColor: background }}>
            <button className={styles.share} onClick={handleShare}>
              <img src="/links/share.svg" className={styles.shareimg} />
            </button>
            <img src={pfp} alt="Profile" className={styles.pfpimg}/>
            <p className={styles.username} style={{ color: font.textColor }}>@{username}</p>
          </div>

          <div className={styles.buttonGroup}>
            <div className={styles.type}>
              <TreeSwitch user={userId} />

            </div>

            {layout === "stack" && <Stack links={profileLinks} shopLinks={shopLinks} user={userId} tree={tree} />}
            {layout === "grid" && <Grid links={profileLinks} shopLinks={shopLinks} user={userId} tree={tree} />}
            {layout === "carousel" && <Carousel links={profileLinks} shopLinks={shopLinks} tree={tree} user={userId} />}


            <div className={styles.bottom}>
              <button className={styles.connected} onClick={handleCtaClick} >Get Connected</button>
              <div className={styles.brand}>
                <img src="/blackLogo.svg" alt="" />
                <p style={{ color: font.textColor }}>SPARK</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MobileTree