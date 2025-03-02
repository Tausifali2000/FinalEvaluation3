

import styles from "./cssModules/Appearance.module.css";

import Preview from "../../components/Preview";

import { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profile.store";

import FontSelector from "../../components/FontSelector";
import { useAppearanceStore } from "../../store/appearance.store";
import Spinner from "../../components/Spinner";

const Appearance = () => {


  const { fetchProfile, isFetching, error, isSaving } = useProfileStore();
  const { layout,
    button,
    setButtonType,
    setShadowType,
    setLayout,
    setButtonColor,
    setFontColor,
    setTextColor,
    setTheme,
    theme,
    font,
    fetchAppearance,
    saveAppearance } = useAppearanceStore()
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);



  useEffect(() => {
    fetchProfile();
    fetchAppearance();
  }, []);





  const handleSetTheme = (newTheme) => {
    setTheme(newTheme); // Update theme in Zustand store
  };


  const handlePreviewClick = () => {
    setIsPreviewVisible(true); // Show preview, hide customise
  };

  const handleCloseClick = () => {
    setIsPreviewVisible(false); // Hide preview
  };






  return (
    <div className={styles.body}>


      <div className={`${styles.preview} ${isPreviewVisible ? styles.show : styles.hide}`}>
        <Preview />
        <div className={isPreviewVisible ? styles.show : styles.hide}>
        <button className={styles.close} onClick={handleCloseClick}>
          X
        </button>
      </div>

      </div>


      <div className={`${styles.customise} ${isPreviewVisible ? styles.hide : styles.show}`}>

        <div className={styles.cLayout}>
          <h1>Layout</h1>
          <div className={styles.layoutForm}>
            <div className={styles.stack}>
              <button type="button"
                className={`${styles.layoutButton} ${layout === "stack" ? styles.selectedLayout : ""}`}
                onClick={() => setLayout("stack")}>
                <img src="/appearance/stack.svg" /></button>
              <label>Stack</label>
            </div>

            <div className={styles.grid}>
              <button
                type="button"
                className={`${styles.layoutButton} ${layout === "grid" ? styles.selectedLayout : ""}`}
                onClick={() => setLayout("grid")}>
                <img src="/appearance/grid.svg" /></button>
              <label>Grid</label>
            </div>
            <div className={styles.carousel}>
              <button
                type="button"
                className={`${styles.layoutButton} ${layout === "carousel" ? styles.selectedLayout : ""}`}
                onClick={() => setLayout("carousel")}>
                <img src="/appearance/carousel.svg" /></button>
              <label>Carousel</label>
            </div>
          </div>
        </div>






        <div className={styles.cLayout}>
          <h2>Buttons</h2>

          <div className={styles.pad}
          >
            <div className={styles.buttonForm}>

              <div className={styles.cFill}>
                <p>Fill</p>
                <div className={styles.fill}>
                  {["Fill1", "Fill2", "Fill3"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles[type.toLowerCase()]} ${button.type === type ? styles.selectedFill : ""}`}
                      onClick={() => setButtonType(type)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className={styles.cOutline}>
                <p>Outline</p>
                <div className={styles.outline}>
                  {["Outline1", "Outline2", "Outline3"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles[type.toLowerCase()]} ${button.type === type ? styles.selectedFill : ""}`}
                      onClick={() => setButtonType(type)}
                    ></button>
                  ))}
                </div>
              </div>
              <div className={styles.cHardShadow}>
                <p>Hard Shadow</p>
                <div className={styles.hardShadow}>
                  {["4px 4px 0px black", "4px 4px 0px #000000", "4px 4px 0px #000001"].map((shadow, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles[`hardShadow${index + 1}`]} ${button.shadowType === shadow ? styles.selectedFill : ""}`}
                      onClick={() => setShadowType(button.shadowType === shadow ? "none" : shadow)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className={styles.cSoftShadow}>
                <p>Soft Shadow</p>
                <div className={styles.softShadow}>
                  {["0px 4px 4px rgba(0, 0, 0, 0.40)", "0px 4px 4px rgba(0, 0, 0, 0.41)", "0px 4px 4px rgba(0, 0, 0, 0.42)"].map((shadow, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${styles[`softShadow${index + 1}`]} ${button.shadowType === shadow ? styles.selectedFill : ""}`}
                      onClick={() => setShadowType(button.shadowType === shadow ? "none" : shadow)}
                    ></button>
                  ))}
                </div>
              </div>



              <div className={styles.cSpecial}>
                <p>Special</p>
                <div className={styles.special}>
                {["Special1", "Special2", "Special3", "Special4", "Special5", "Special6"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles[type.toLowerCase()]} ${button.type === type ? styles.selectedFill : ""}`}
                      onClick={() => setButtonType(type)}
                    ></button>
                  ))}
                </div>
              </div>

              <div className={styles.buttonColor}>
                <p className={styles.colorLabel}>Button Color</p>

                <div className={styles.color}>
                  <input type="color"

                    className={styles.colorPicker}
                    value={button.buttonColor}
                    onChange={(e) => setButtonColor(e.target.value)}
                  />
                  <div className={styles.text}>
                    <label>Button Color</label>
                    <input type="text"
                      value={button.buttonColor}
                      maxLength={7}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className={styles.colorText} />
                  </div>

                </div>

              </div>


              <div className={styles.buttonColor}>
                <p className={styles.colorLabel}>Button font color</p>
                <div className={styles.color}>

                  <input type="color"

                    className={styles.colorPicker}
                    value={button.fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                  />

                  <div className={styles.text}>
                    <label>Button Font Color</label>
                    <input type="text"
                      value={button.fontColor}
                      maxLength={7}
                      onChange={(e) => setFontColor(e.target.value)}
                      className={styles.colorText} />
                  </div>

                </div>


              </div>

            </div>

          </div>



        </div>

        <div className={styles.cLayout}>
          <h3>Fonts</h3>
          <div className={styles.fontsForm}>

            <div className={styles.cFonts}>
              <p>Font</p>
              <FontSelector />
            </div>


            <div className={styles.buttonColor}>
              <p className={styles.colorLabel}>Color</p>
              <div className={styles.color}>

                <input type="color"

                  value={font.textColor}
                  className={styles.colorPicker}
                  onChange={(e) => setTextColor(e.target.value)}
                />

                <div className={styles.text}>
                  <label>Color</label>
                  <input type="text"
                    value={font.textColor}
                    maxLength={7}
                    onChange={(e) => setTextColor(e.target.value)}
                    className={styles.colorText} />
                </div>

              </div>


            </div>

          </div>

        </div>

        <div className={styles.cThemes}>
          <h4>Themes</h4>
          <div className={styles.cTheme}>
            <div className={styles.themeTop}>
              {[
                { label: "Air Snow", color: "#F9FAFB", img: "/themes/theme1.svg" },
                { label: "Air Grey", color: "#ebeef1", img: "/themes/theme2.svg" },
                { label: "Air Smoke", color: "#2a3235", img: "/themes/theme3.svg" },
                { label: "Air Black", color: "#000000", img: "/themes/theme4.svg" },
              ].map((themeOption) => (
                <div key={themeOption.label} className={styles.theme1}>
                  <button
                    className={`${styles.themeButton} ${theme === themeOption.color ? styles.themeSelect : ""}`}
                    onClick={() => handleSetTheme(themeOption.color)}
                  >
                    <img src={themeOption.img} alt={themeOption.label} />
                  </button>
                  <label>{themeOption.label}</label>
                </div>
              ))}
            </div>

            <div className={styles.themeBottom}>
              {[
                { label: "Mineral Blue", color: "#e0f6ff", img: "/themes/theme5.svg" },
                { label: "Mineral Green", color: "#e0faee", img: "/themes/theme6.svg" },
                { label: "Mineral Orange", color: "#ffeee2", img: "/themes/theme7.svg" },
              ].map((themeOption) => (
                <div key={themeOption.label} className={styles.theme1}>
                  <button
                    className={`${styles.themeButton} ${theme === themeOption.color ? styles.themeSelect : ""}`}
                    onClick={() => handleSetTheme(themeOption.color)}
                  >
                    <img src={themeOption.img} alt={themeOption.label} />
                  </button>
                  <label>{themeOption.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.cSave}>
          <button
            onClick={saveAppearance}
            disabled={isSaving}
            className={`${styles.saveButton} ${isSaving ? styles.disableSave : ""}`}>
            {isSaving && <Spinner />}
            Save
          </button>
        </div>

        <div className={isPreviewVisible ? styles.hide : styles.show}>
        <button className={styles.previewButton} onClick={handlePreviewClick} >
          <img src="/links/eye.svg" />
          Preview
        </button>
      </div>

     

      </div>
     



    </div>
  )
}

export default Appearance
