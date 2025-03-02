
import { Outlet } from "react-router-dom";
import styles from "./cssModules/Mobile.module.css";
import Sidebar from "../components/Sidebar";

import MobileHeader from "../components/Mobile/MobileHeader";
import MobileSidebar from "../components/Mobile/MobileSidebar";

const MobileLayout = () => {


  return (
    <>

      <div className={styles.body}>
     
        <MobileSidebar />


        <div className={styles.container}>
        <div className={styles.dummy}></div>
          <div className={styles.header}>
           <MobileHeader />
          </div>
          <div className={styles.page}>
            <Outlet />
          </div>



        </div>
      </div>
    </>

  );
};

export default MobileLayout;