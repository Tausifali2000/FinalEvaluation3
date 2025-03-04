
import { useForm } from "react-hook-form";
import styles from "./cssModules/Links.module.css";

import { useAuthStore } from "../../store/auth.store";
import { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profile.store";
import CustomDialog from "../../components/CustomDialog";

import SwitchButton from "../../components/SwitchButton";
import TypeSwitch from "../../components/TypeSwitch";
import { useTypeStore } from "../../store/type.store";
import EditLink from "../../components/EditLink";
import EditShop from "../../components/EditShop";
import Spinner from "../../components/Spinner";
import { CustomToast } from "../../App";

import PreviewLinks from "../../components/PreviewLinks";
import { useAppearanceStore } from "../../store/appearance.store";



const Links = () => {

  const { user } = useAuthStore();
  const { background, fetchProfile, saveProfile, links, shopLinks, isSaving, isFetching, error, imageUpload } = useProfileStore();
  const { selectedType } = useTypeStore();
  const { fetchAppearance, font } = useAppearanceStore()

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [localLinks, setLinks] = useState([]);
  const [localShops, setShopLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false); 


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchProfile();
    fetchAppearance();
  }, []);

  useEffect(() => {
    setLinks(links || []);
    setShopLinks(shopLinks || []);

  }, [links, shopLinks]);



  // Sync initial username from user store
  useEffect(() => {
    setValue("username", user?.username || "there");
    setValue("bio", user?.bio || "");
    if (user?.image) {
      setPreviewImage(`https://finalevaluation3.onrender.com${user.image}`);
    } else {
      setPreviewImage("/uploads/pfp.svg"); // Default profile image
    }
  }, [user, setValue]);

  useEffect(() => {
    if (background) {
      setValue("color", background);
    }
  }, [background, setValue]);

  const username = watch("username");
  const color = watch("color");

  const handleColorChange = (newColor) => {
    setValue("color", newColor);
  };



  const addLink = (newLink) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
    CustomToast.success("Successfully added link");
  };

  const deleteLink = (linkId) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.linkId !== linkId));
    CustomToast.success("Successfully deleted link");
  };

  const addShopLink = (newShopLink) => {
    setShopLinks([...localShops, newShopLink]);
    CustomToast.success("Successfully added shop");
  };

  const deleteShopLink = (shopId) => {
    setShopLinks((prevShops) => prevShops.filter((shop) => shop.shopId !== shopId));
    CustomToast.success("Successfully deleted shop");
  };


  const openEditLink = (linkId) => {
    setSelectedLink(linkId);
    setEditOpen(true);
  };



  const openEditShop = (shopId) => {
    setSelectedShop(shopId);
    setShopOpen(true);
  };

  const editLink = (updatedLink) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.linkId === updatedLink.linkId ? updatedLink : link
      )
    );
    CustomToast.success("Successfully edited link");
  };

  const editShop = (updatedShop) => {
    setShopLinks((prevShops) =>
      prevShops.map((shop) =>
        shop.shopId === updatedShop.shopId ? updatedShop : shop
      )
    );
    CustomToast.success("Successfully edited shop");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file); // Store the file for upload

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Show preview instantly
      };
      reader.readAsDataURL(file);
      CustomToast.success("Successfully added image");
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null); // Clear the selected file
    setPreviewImage("http://localhost:5200/uploads/pfp.svg"); // Reset preview to default image
    setImageRemoved(true);
    CustomToast.success("Image removed successfully"); // Show a toast notification

  };



  const onSubmit = async (data) => {
    try {
        if (selectedFile) {
            await imageUpload(selectedFile); // Upload new image
        } else if (imageRemoved) {
            data.image = "http://localhost:5200/uploads/pfp.svg"; // Explicitly tell backend to remove image
        }

        await saveProfile(data, localLinks, localShops); // Save other profile data

        if (error?.field && error?.message) {
            setError(error.field, { type: "server", message: error.message });
        }

     
    } catch (err) {
        console.error("Error updating profile:", err);
        CustomToast.error("Failed to update profile");
    }
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

  const handlePreviewClick = () => {
    setIsPreviewVisible(true); // Show preview, hide customise
  };

  const handleCloseClick = () => {
    setIsPreviewVisible(false); // Hide preview
  };





  return (
    <div className={styles.body}>
      {/* Mobile Preview */}
      <button className={styles.share} onClick={handleShare}>
        <img src="/links/share2.svg" />
        <p>Share</p>
      </button>
      <div className={`${styles.preview} ${isPreviewVisible ? styles.show : styles.hide}`}>

        <PreviewLinks links={localLinks} shopLinks={localShops} image={previewImage} background={color} />
        <div className={isPreviewVisible ? styles.show : styles.hide}>
          <button className={styles.close} onClick={handleCloseClick}>
            X
          </button>
          </div>

      </div>


      <div className={`${styles.customise} ${isPreviewVisible ? styles.hide : styles.show}`}>
        {/* Profile Form */}
        <div className={styles.profile}>
          <h1>Profile</h1>
          <div className={styles.cProfileForm}>
            <div className={styles.profileForm}>
              <div className={styles.cImage}>
                <img src={previewImage} />
                <div className={styles.pickImage}>
                  <div className={styles.fileUploadContainer}>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      onChange={handleImageChange}
                      className={styles.hiddenFileInput}
                    />
                    <label htmlFor="fileInput" className={styles.addImage}>
                      Pick an Image
                    </label>
                  </div>

                  <button className={styles.removeImage} onClick={handleRemoveImage}>Remove</button>
                </div>
              </div>
              <div className={styles.profileTitle}>
                <label>Profile Title</label>
                <input
                  type="text"
                  {...register("username", {
                    required: { value: true, message: "Username is required" },
                    minLength: { value: 3, message: "Minimum 3 letters required" }
                  })}
                />


                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  style={{ display: "none" }} // Hide input]
                />
              </div>

              {errors.username && <p className={styles.error}>{errors.username.message}</p>}

              <div className={styles.bio}>
                <label>Bio</label>
                <textarea
                  type="text"
                  {...register("bio", {

                    maxLength: { value: 80, message: "Letters must be less than the limit" }
                  })}></textarea>

              </div>
              <div className={styles.words}>{watch("bio", "").length}/80</div>
              {errors.bio && <p className={styles.error}>{errors.bio.message}</p>}
            </div>
          </div>
        </div>

        <div className={styles.cAddLinks}>
          <div className={styles.addLinks}>
            <TypeSwitch />
            <button className={styles.addButton} onClick={() => setDialogOpen(true)}>
              + Add
            </button>

            {selectedType === "link" && (
              <div className={styles.links}>
                {localLinks.map((link) => (
                  <div className={styles.link} key={link.id}>
                    <div className={styles.sec0}>
                      <div className={styles.sec00}>
                        <h1>{link.linkTitle}</h1>
                        <img src="/links/edit.svg" alt="Edit" onClick={() => openEditLink(link.linkId)} />
                      </div>

                      <SwitchButton
                        sx={{ m: 1 }}
                        checked={true}
                        disabled={true}
                      />

                    </div>
                    <div className={styles.sec1}>
                      <p>{link.linkUrl}</p>
                      <img src="/links/edit.svg" onClick={() => openEditLink(link.linkId)} />
                    </div>
                    <div className={styles.sec2}>
                      <div className={styles.sec22}>
                        <img src="/links/clicks.svg" />
                        <p>{link.clicks} clicks</p>
                      </div>
                      <img
                        src="/links/delete.svg"
                        alt="Delete"
                        onClick={() => deleteLink(link.linkId)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedType === "shop" && (
              <div className={styles.shopLinks}>
                {localShops.map((link) => (
                  <div className={styles.shopLink} key={link.id}>
                    <div className={styles.sec0}>
                      <div className={styles.sec00}>
                        <h1>{link.shopTitle}</h1>
                        <img src="/links/edit.svg" onClick={() => openEditShop(link.shopId)} />
                      </div>

                      <SwitchButton
                        sx={{ m: 1 }}
                        checked={true}
                        disabled={true}
                      />

                    </div>
                    <div className={styles.sec1}>
                      <p>{link.shopUrl}</p>
                      <img src="/links/edit.svg" onClick={() => openEditShop(link.shopId)} />
                    </div>
                    <div className={styles.sec2}>
                      <div className={styles.sec22}>
                        <img src="/links/shopclick.svg" alt="" />
                        <img src="/links/clicks.svg" />
                        <p>{link.clicks} clicks</p>
                      </div>
                      <img
                        src="/links/delete.svg"
                        alt="Delete"
                        onClick={() => deleteShopLink(link.shopId)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>




        <div className={styles.bannerCustomization}>
          <h3>Banner</h3>
          <div className={styles.cBanner}>
            <div className={styles.bannerForm}>
              <div className={styles.banPreview} style={{ backgroundColor: color }}>
                <div className={styles.userPfp}>
                  <img src={previewImage} className={styles.blackLogo} />
                </div>

                <h1 style={{ color: font.textColor }}>@{username}</h1>
                <div className={styles.banSub}><img src="/greyLogo.svg" /><p style={{ color: font.textColor }}>/{username}</p></div>
              </div>
              <div className={styles.colorCont}>
                <label>Custom Background Color</label>
                <div className={styles.colors}>
                  {["#342B26", "#FFFFFF", "#000000"].map((col) => (
                    <button
                      key={col}
                      className={styles.color}
                      style={{
                        backgroundColor: col,
                        border: color === col ? "2px solid #28a263" : "2px solid #c4c4c4",
                      }}
                      onClick={() => handleColorChange(col)}
                    ></button>
                  ))}
                </div>
                <div className={styles.picker}>

                  {/* <input type="color"
                    {...register("color")}
                    className={styles.colorPicker}
                    onChange={(e) => setValue("color", e.target.value)} /> */}
                    <div
                    className={styles.colorPreview}
                    style={{ backgroundColor: color }}
                    onClick={() => document.getElementById("colorInput").click()}
                  ></div>

                  <input type="text"
                    value={color}
                    maxLength={7}
                    onChange={(e) => setValue("color", e.target.value)}
                    className={styles.colorText} />
                </div>

              </div>
            </div>
          </div>

          <div className={styles.cSave}>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className={`${styles.saveButton} ${isSaving ? styles.disableSave : ""}`}>
            {isSaving && <Spinner />}
            Save
          </button>
          </div>

         
         

        </div>

        <div className={isPreviewVisible ? styles.hide : styles.show}>
      <button className={styles.previewButton} onClick={handlePreviewClick} >
                <img src="/links/eye.svg" />
                Preview
          </button>
          </div>

         


      </div>

  
        


      <CustomDialog open={dialogOpen} setOpen={setDialogOpen} addLink={addLink} addShopLink={addShopLink} />
      <EditLink open={editOpen} setOpen={setEditOpen} selectedLink={selectedLink} localLinks={localLinks} editLink={editLink} />
      <EditShop open={shopOpen} setOpen={setShopOpen} selectedShop={selectedShop} localShops={localShops} editShop={editShop} />
    </div>
  )
}

export default Links
