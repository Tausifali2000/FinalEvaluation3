import { Link } from "react-router-dom";
import styles from "./cssModules/MobileLanding.module.css";
import { useScreenStore } from "../../../store/screen.store";


const integrations = [
  { name: "Audiomack", description: "Add an Audiomack player to your Linktree", icon: "/landing/audio.svg" },
  { name: "Bandsintown", description: "Drive ticket sales by listing your events", icon: "/landing/band.svg" },
  { name: "Bonfire", description: "Display and sell your custom merch", icon: "/landing/bonfire.svg" },
  { name: "Books", description: "Promote books on your Linktree", icon: "/landing/books.svg" },
  { name: "Buy Me A Gift", description: "Let visitors support you with a small gift", icon: "/landing/gift.svg" },
  { name: "Cameo", description: "Make impossible fan connections possible", icon: "/landing/cameo.svg" },
  { name: "Clubhouse", description: "Let your community in on the conversation", icon: "/landing/clubhouse.svg" },
  { name: "Community", description: "Build an SMS subscriber list", icon: "/landing/community.svg" },
  { name: "Contact Details", description: "Easily share downloadable contact details", icon: "/landing/contacts.svg" }
];



const MobileLanding = () => {

const {screenSize} = useScreenStore()
  
  return (
    <div className={styles.body}>

      {/*Header*/}
      <div className={styles.header}>
        <div className={styles.brand}>
          <img src="/logo.svg" />
         </div>
         <Link to="/login">  <button className={styles.okay}>Admin</button></Link>
        <Link to="/signup">  <button className={styles.signup}>Sign up free</button></Link>

      </div>

      {/*Section 1*/}
      <div className={styles.cont}>
        <div className={styles.cont0}>
          <div className={styles.sec1}>
            <h1>The easiest place to update and share your Connection</h1>
            <p>Help your followers discover everything you’re sharing all over the internet, in one simple place.
              They’ll thank you for it!</p>
            <Link to="/signup">  <button>Get your free Spark</button></Link>
          </div>
          <div className={styles.sec2}>
            <img src="/landing/image1.svg" />
          </div>
        </div>

        {/*Section 2*/}
        <div className={styles.cont1}>
          <div className={styles.sec3}>
            <div className={styles.revenue}>
              <div>
                <div>
                  $10
                </div>
              </div>
              <div>
                <div>
                  $20
                </div>
              </div>
              <div>
                <div>
                  $40
                </div>
              </div>
              <div>
                <div>
                  $30
                </div>
              </div>
              <div>
                <div>
               
                  <h3>$4,560</h3>
                  Revenue
                </div>
              </div>
            </div>
            <p>Sell products and collect payments. It’s monetization made simple.</p>
          </div>
          <div className={styles.sec4}>
            <h1>Analyze your audience and keep your followers engaged</h1>
            <p>Track your engagement over time,
              monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.</p>
          </div>
        </div>

        {/*Section 3*/}
        <div className={styles.cont2}>
          <div className={styles.sec5}>
            <h1>Share limitless content in limitless ways</h1>
            <p>Connect your content in all its forms and help followers find more of what they’re looking for.
              Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more… It all comes together in one powerful place</p>
          </div>

          <div className={styles.sec6}>
            <img src="/landing/image2.svg" />
          </div>
        </div>


        {/*Section 4*/}
        <div className={styles.testimonialsSection}>
          <div className={styles.head}>
            <h1>Here's what our <span className={styles.highlight}>customer</span> has to say</h1>
            <button className={styles.readButton}>Read customer stories</button>
          </div>


          <div className={styles.testimonialsGrid}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.testimonialCard}>
                <h3>Amazing tool! Saved me months</h3>
                <p>
                  This is a placeholder for your testimonials and what your client has to say,
                  put them here and make sure it's 100% true and meaningful.
                </p>
                <div className={styles.clientInfo}>
                  <div className={styles.avatar}></div>
                  <div>
                    <h1>John Master</h1>
                    <p>Director, Spark.com</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/*Section 5*/}
        <div className={styles.integrationsSection}>
          <h2>All Link Apps and Integrations</h2>
          <div className={styles.integrationsGrid}>
            {integrations.map((item, index) => (
              <div key={index} className={styles.integrationCard}>
                <img src={item.icon} alt={item.name} className={styles.icon} />
                <div>
                  <h1>{item.name}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.top}>
             
              <div className={styles.linksSection}>
             
                  <p>About Spark</p>
                  <p>Blog</p>
                  <p>Press</p>
                  <p>Social Good</p>
                  <p>Contact</p>
               
                  <p>Careers</p>
                  <p>Getting Started</p>
                  <p>Features and How-Tos</p>
                  <p>FAQs</p>
                  <p>Report a Violation</p>
               
               
                  <p>Terms and Conditions</p>
                  <p>Privacy Policy</p>
                  <p>Cookie Notice</p>
                  <p>Trust Center</p>
               
              </div>
            </div>

            <div className={styles.bottom}>
            <div className={styles.authButtons}>
                <Link to="/signin"><button className={styles.login}>Admin</button></Link>
                <Link to="/signup"> <button className={styles.signup}>Sign up free</button></Link>
              </div>
              
              <div className={styles.socialIcons}>
                <img src="/landing/x.svg" />
                <img src="/landing/insta.svg" />
                <img src="/landing/yt.svg" />
                <img src="/landing/tiktok.svg" />
                <img src="/landing/fire.svg" />
              </div>
            </div>
          </div>
        </footer>
        

        
      </div>
    </div>
  )
}

export default MobileLanding
