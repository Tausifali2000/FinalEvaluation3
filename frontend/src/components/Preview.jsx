
import { CustomToast } from "../App";
import LoadingSpinner from "../skeletons/LoadingSpinner";
import { useAppearanceStore } from "../store/appearance.store";
import { useAuthStore } from "../store/auth.store";

import { useProfileStore } from "../store/profile.store";

import styles from "./cssModules/Preview.module.css"
import Carousel from "./layout/Carousel";
import Grid from "./layout/Grid";
import Stack from "./layout/Stack";
import MuiToggleButton from "./ToggleButton"


const Preview = () => {

  const { user } = useAuthStore();
  const { font, layout, theme, background, isLoading } = useAppearanceStore();
  const { links, shopLinks, isFetching } = useProfileStore()
  const username = user?.username


  const tree = false


  const handleClick = async () => {
    CustomToast.error("Preview only use share")
  };

  const handleShare = async () => {
    const shareableLink = `${window.location.origin}/${user?._id}`;


    try {
      await navigator.clipboard.writeText(shareableLink);
      CustomToast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy link: ", error);
    }
  };




  return (
    <div className={styles.cPreview}>
      <div className={styles.preview} style={{ backgroundColor: theme, fontFamily: font.name }}>
        <div className={styles.banner} style={{ backgroundColor: background }}>
          <button className={styles.share} onClick={handleShare}>
            <img src="/links/share.svg" className={styles.shareimg} />
          </button>
          <img src={`https://finalevaluation3.onrender.com${user.image}`} className={styles.pfpimg} />
          <p className={styles.username} style={{ color: font.textColor }}>@{username}</p>
        </div>

        <div className={styles.buttonGroup}>
          <div className={styles.type}>
            <MuiToggleButton />

          </div>

          {isFetching ? (
            <div className={styles.spinner}>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {layout === "stack" && <Stack links={links} shopLinks={shopLinks} tree={tree} />}
              {layout === "grid" && <Grid links={links} shopLinks={shopLinks} tree={tree} />}
              {layout === "carousel" && <Carousel links={links} shopLinks={shopLinks} tree={tree} />}
            </>
          )}

          <div className={styles.bottom}>
            <button className={styles.connected} onClick={handleClick} >Get Connected</button>
            <div className={styles.brand}>
              <img src="/blackLogo.svg" alt="" />
              <p>SPARK</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Preview
