import { Dialog } from "@mui/material";
import styles from "./cssModules/EditDialog.module.css"
import SwitchButton from "./SwitchButton.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CustomToast } from "../App.jsx";

const EditShop = ({ open, setOpen, editShop, selectedShop, localShops }) => {
  const handleClose = () => setOpen(false);
  
   
     const selectedShopData = localShops.find(link => link.linkId === selectedShop) || {};
     
     const {
      register: registerShop,
      handleSubmit: handleSubmitShop,
      watch: watchShop,
      setValue: setValueShop,
      reset: resetShop,
      formState: { errors: errorsShop },
    } = useForm();
    
    const shopUrl = watchShop("shopUrl");



useEffect(() => {
  const selectedShopData = localShops.find(shop=> shop.shopId === selectedShop);
  
  if (selectedShopData) {
    setValueShop("shopTitle", selectedShopData.shopTitle || "");
    setValueShop("shopUrl", selectedShopData.shopUrl || "");
    
  }
}, [selectedShop, localShops, setValueShop]);



    
  

   
    const onSubmitShop = (data) => {

      const updatedShop = {
        shopId: selectedShop,
        shopTitle: data.shopTitle,
        shopUrl: data.shopUrl,
       
      };
      editShop(updatedShop);
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

          width: 642,
          height: 624,
          borderRadius: 3,
          backgroundColor: "white",
          padding: 2,

        },
      },
    }}
  >
      
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
                    <img src="/links/copy.svg"  onClick={() => copyToClipboard(shopUrl)} />
                      <img src="/links/delete.svg" onClick={() => setValueShop("shopUrl", "")}/>
                    </div>
                    
                  </div>
                  {errorsShop.shopUrl && <p className={styles.error}>{errorsShop.shopUrl.message}</p>}
                  </div>
        
                  
                
                
                </form>
         


    </Dialog>
  );
};

export default EditShop;
