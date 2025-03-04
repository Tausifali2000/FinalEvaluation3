
import { CustomToast } from "../App";
import LoadingSpinner from "../skeletons/LoadingSpinner";
import { useAppearanceStore } from "../store/appearance.store";
import { useAuthStore } from "../store/auth.store";

import styles from "./cssModules/Preview.module.css"
import Carousel from "./layout/Carousel";
import Grid from "./layout/Grid";
import Stack from "./layout/Stack";
import MuiToggleButton from "./ToggleButton"


const PreviewLinks = ({ links, shopLinks, image, background}) => {

  const{ font, layout, theme,  isLoading} = useAppearanceStore();
  const {user} = useAuthStore()
   
  const username = user?.username
  const bg = background


  const handleShare = async () => {
    const shareableLink = `${window.location.origin}/${user?._id}`;


    try {
      await navigator.clipboard.writeText(shareableLink);
      CustomToast.success("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy link: ", error);
    }
  };
    
    

    const handleClick = async () => {
     CustomToast.error("Preview only use share")
    };
    

    
  
  return (
    <div className={styles.cPreview}>
       <div className={styles.preview} style={{ backgroundColor: theme, fontFamily: font.name}}>
        <div className={styles.banner} style={{ backgroundColor: bg }}>
          <button className={styles.share} onClick={handleShare}>
            <img src="/links/share.svg"className={styles.shareimg} />
          </button>
          <img src={image} className={styles.pfpimg} />
          <p className={styles.username} style={{ color: font.textColor }}>@{username}</p>
        </div>

        <div className={styles.buttonGroup}>
          <div className={styles.type}>
           <MuiToggleButton />
                     
          </div>
          {isLoading ? (
            <div className={styles.spinner}>  
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {layout === "stack" && <Stack links={links} shopLinks={shopLinks} />}
              {layout === "grid" && <Grid links={links} shopLinks={shopLinks}/>}
              {layout === "carousel" && <Carousel links={links} shopLinks={shopLinks} />}
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

export default PreviewLinks
