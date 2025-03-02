

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';

import styles from "./cssModules/CustomDialog.module.css"
import SwitchButton from "./SwitchButton.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useTypeStore } from "../store/type.store.js";
import TypeSwitch from "./TypeSwitch.jsx";
import { CustomToast } from "../App.jsx";




const CustomDialog = ({ open, setOpen, addLink, addShopLink }) => {
  const handleClose = () => setOpen(false);

     const { selectedType } = useTypeStore(); 
     
 

// Form handling for links
const {
  register: registerLink,
  handleSubmit: handleSubmitLink,
  watch: watchLink,
  setValue: setValueLink,
  reset: resetLink,
  formState: { errors: errorsLink },
} = useForm();

// Form handling for shop
const {
  register: registerShop,
  handleSubmit: handleSubmitShop,
  watch: watchShop,
  setValue: setValueShop,
  reset: resetShop,
  formState: { errors: errorsShop },
} = useForm();

    // Array of icons
    const apps = [
      { name: "instagram", icon: "/links/instagram.svg" },
      { name: "facebook", icon: "/links/facebook.svg" },
      { name: "youtube", icon: "/links/youtube.svg" },
      { name: "twitter", icon: "/links/twitter.svg" },
    ];
    
    const selectedApp = watchLink("selectedApp");
    const linkUrl = watchLink("linkUrl");
    const shopUrl = watchShop("shopUrl");

    const onSubmitLink = (data) => {
      addLink({ linkId: Date.now(), linkTitle: data.linkTitle, linkUrl: data.linkUrl, icon: data.selectedApp, clicks: 0 });
      resetLink();
      setValueLink("selectedApp", "");
      setOpen(false);
    };
  
    const onSubmitShop = (data) => {
      addShopLink({ shopId: Date.now(), shopTitle: data.shopTitle, shopUrl: data.shopUrl, clicks: 0 });
      resetShop();
      setOpen(false);
    };

  
    const copyToClipboard = async (url) => {
      if (!url) {
        CustomToast.error("No URL to copy!");
        return;
      }
    
      try {
        await navigator.clipboard.writeText(url);
        CustomToast.success("Copied to clipboard");
      } catch (error) {
        console.error("Failed to copy link:", error);
        CustomToast.error("Failed to copy link");
      }
    };
    
    
  

  return (
    
<Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            display: "flex",
            alignItems: "center",

            width: 612,
            height: 604,
            borderRadius: 3,
            backgroundColor: "white",
            padding: 4,

          },
        },
      }}
    >
      
      <div className={styles.toggle}>
      <TypeSwitch />
      </div>
   
      {selectedType === "link" && (
      <form className={styles.form} >
          <div className={styles.top}>
          <h1>Enter Url</h1>
          <div className={styles.title}>
            <input type="text" 
              placeholder='Link Title'
              {...registerLink("linkTitle",
                {
                  required: { value: true, message: "Link title is required" },
                  minLength: { value: 3, message: "Length must be minimun 3 letters" }
                })
              } />
            
            <div className={styles.abso}>
              
               
                   <SwitchButton
                        sx={{ m: 1 }}
                        onChange={() => handleSubmitLink(onSubmitLink)()}
                       
                      />


                  </div>
           
          </div>
          {errorsLink.linkTitle && <p className={styles.error}>{errorsLink.linkTitle.message}</p>}
          <div className={styles.url}>
            <input type="text" 
            placeholder='Link Url'
            {...registerLink("linkUrl",
              {
                required: { value: true, message: "Link url is required" },
                pattern: {
                  value: /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.*)?$/,
                  message: "Enter a valid URL (e.g., https://example.com)",
                },
              })
            }  />
            <div className={styles.actions}>
            <img src="/links/copy.svg"  onClick={() => copyToClipboard(linkUrl)} />
            <img src="/links/delete.svg" onClick={() => setValueLink("linkUrl", "")}/>
            </div>
            
          </div>
          {errorsLink.linkUrl && <p className={styles.error}>{errorsLink.linkUrl.message}</p>}
          </div>

          
          <div className={styles.border}></div>

          <div className={styles.bottom}>
              <h2>Applications</h2>
             
              <div className={styles.icons}>
              {apps.map((app) => (
              <button
                key={app.name}
                 type="button"
                className={`${styles.icon} ${selectedApp === app.name ? styles.selected : ""}`}
                onClick={() => setValueLink("selectedApp", app.name)} 
              >
                <img src={app.icon} alt={app.name} />
              </button>
            ))}
             
              </div>
              {errorsLink.selectedApp && <p className={styles.error}>{errorsLink.selectedApp.message}</p>}
          </div>
          <input type="hidden" {...registerLink("selectedApp", { required: "Please select an application." })} />
        
        </form>
          )}

{selectedType === "shop" && (
        <form className={styles.form2} onSubmit={handleSubmitShop(onSubmitShop)}>
          <div className={styles.top}>
          <h1>Enter Url</h1>
          <div className={styles.title}>
            <input type="text" 
              placeholder='Shop Title'
              {...registerShop("shopTitle",
                {
                  required: { value: true, message: "Shop title is required" },
                  minLength: { value: 3, message: "Length must be minimun 3 letters" }
                })
              } />
            
            <div className={styles.abso}>
              
                
            <SwitchButton
                        sx={{ m: 1 }}
                        onChange={() => handleSubmitShop(onSubmitLink)()}
                       
                      />


                  </div>
           
          </div>
          {errorsShop.shopTitle && <p className={styles.error}>{errorsShop.shopTitle.message}</p>}
          <div className={styles.url}>
            <input type="text" 
            placeholder='Shop Url'
            {...registerShop("shopUrl",
              {
                required: { value: true, message: "Shop url is required" },
                pattern: {
                  value: /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/.*)?$/,
                  message: "Enter a valid URL (e.g., https://example.com)",
                },
              })
            }  />
            <div className={styles.actions}>
            <img src="/links/copy.svg" onClick={() => copyToClipboard(shopUrl)} />
            <img src="/links/delete.svg" onClick={() => setValueShop("shopUrl", "")}/>
            </div>
            
          </div>
          {errorsShop.shopUrl && <p className={styles.error}>{errorsShop.shopUrl.message}</p>}
          </div>

          
        
        
        </form>
         )}

    </Dialog>
  );
};

export default CustomDialog;
