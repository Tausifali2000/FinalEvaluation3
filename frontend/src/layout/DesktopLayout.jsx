
import { Outlet } from "react-router-dom";
import styles from "./cssModules/Desktop.module.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DesktopLayout = () => {


  return (
    <>

      <div className={styles.body}>
        <div className={styles.sidebar}>
         
          <Sidebar />
        </div>



        <div className={styles.container}>
        <div className={styles.dummy}></div>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.page}>
            <Outlet />
          </div>



        </div>
      </div>
    </>

  );
};

export default DesktopLayout;