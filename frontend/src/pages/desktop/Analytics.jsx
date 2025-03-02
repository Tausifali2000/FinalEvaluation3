import { useEffect } from "react";

import { useAnalyticsStore } from "../../store/analytics.store";
import styles from "./cssModules/Analytics.module.css";
import BarChartComponent from "../../components/BarChart";
import PieChartComponent from "../../components/PieChart";
import BarChartComponent2 from "../../components/BarChart2";
import DateRangePicker from "../../components/DateRangePicker";
import CustomLineChart from "../../components/CustomLineChart";



const Analytics = () => {

  const {profileClicks, shopClicks, cta, devices, sites, fetchAnalytics} = useAnalyticsStore()

  useEffect(() => {
    
    fetchAnalytics();
  }, []);


  return (
      <div className={styles.body}>
      <div className={styles.analytics}>
      
      <div className={styles.head}>
        <div className={styles.title}>
          <h1>Overview</h1>
        </div>
        <div className={styles.date}>
          <DateRangePicker />
        </div>
      </div>

    

     
      <div className={styles.overview}>
        <div className={styles.clicks}>
          <p>Clicks on Links</p>
          <h1>{profileClicks}</h1>
        </div>
        <div className={styles.clicks2}>
          <p>Clicks on Shop</p>
          <h2>{shopClicks}</h2>
        </div> <div className={styles.clicks2}>
          <p>CTA</p>
          <h2>{cta}</h2>
        </div>
      </div>

      <div className={styles.totalcount}>
        <CustomLineChart />
      </div>

      <div className={styles.sec0}>
        <div className={styles.barchart}>
          <h1>Traffic by Device</h1>
          <BarChartComponent />
          </div>
        <div className={styles.piechart}>
        <h1>Sites</h1>
          <PieChartComponent /></div>
      </div>

      <div className={styles.sec1}>
        <div className={styles.barchart2}>
          <BarChartComponent2 />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Analytics
