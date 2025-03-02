import styles from "./cssModules/MainSkeleton.module.css"
import LoadingSpinner from './LoadingSpinner'

const MainSkeleton = () => {
  return (
    <div className={styles.body}>
          <LoadingSpinner />
    </div>
 
  )
}

export default MainSkeleton