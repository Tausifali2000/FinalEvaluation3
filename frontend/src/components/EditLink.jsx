import { Dialog } from "@mui/material";
import styles from "./cssModules/EditDialog.module.css"
import SwitchButton from "./SwitchButton.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CustomToast } from "../App.jsx";

const EditLink = ({ open, setOpen, editLink, selectedLink, localLinks }) => {
  const handleClose = () => setOpen(false);
  const [switchOn, setSwitchOn] = useState(false);





  // Form handling for links
  const {
    register: registerLink,
    handleSubmit: handleSubmitLink,
    watch: watchLink,
    setValue: setValueLink,
    reset: resetLink,
    formState: { errors: errorsLink },
  } = useForm();



  useEffect(() => {
    const selectedLinkData = localLinks.find(link => link.linkId === selectedLink);

    if (selectedLinkData) {
      setValueLink("linkTitle", selectedLinkData.linkTitle || "");
      setValueLink("linkUrl", selectedLinkData.linkUrl || "");
      setValueLink("selectedApp", selectedLinkData.icon || "");
    }
  }, [selectedLink, localLinks, setValueLink]);


  // Array of icons
  const apps = [
    { name: "instagram", icon: "/links/instagram.svg" },
    { name: "facebook", icon: "/links/facebook.svg" },
    { name: "youtube", icon: "/links/youtube.svg" },
    { name: "twitter", icon: "/links/twitter.svg" },
  ];

  const selectedApp = watchLink("selectedApp");
  const linkUrl = watchLink("linkUrl");

  const onSubmitLink = (data) => {
    const updatedLink = {
      linkId: selectedLink,
      linkTitle: data.linkTitle,
      linkUrl: data.linkUrl,
      icon: data.selectedApp,
    };

    editLink(updatedLink); // ✅ Update localLinks in parent
    resetLink();
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


      <form className={styles.form} onSubmit={handleSubmitLink(onSubmitLink)}>
        <div className={styles.top}>
          <h1>Edit Url</h1>
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
              } />
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



    </Dialog>
  );
};

export default EditLink;
