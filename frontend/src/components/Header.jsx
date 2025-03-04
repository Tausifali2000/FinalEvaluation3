import styles from "./cssModules/Header.module.css";
import { useAuthStore } from "../store/auth.store";

const Header = () => {

  //Stores
  const { user, logout } = useAuthStore();

  //Set userName in Greeting  
  const firstName = user?.firstName || "there";  
  const lastName = user?.lastName || "";  
  return (
    <div className={styles.header}>
        <div className={styles.greeting}>
          <h1><span className={styles.highlight}>Hi,</span> {firstName} {lastName}!</h1>
          <p>Congratulations. You got a great response today.</p>
        </div>
    </div>
  )
}

export default Header
