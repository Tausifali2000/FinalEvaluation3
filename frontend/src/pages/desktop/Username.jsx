import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./cssModules/Username.module.css";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import Spinner from "../../components/Spinner";

const categories = [
  { name: "Business", icon: "/username/buss.png" },
  { name: "Creative", icon: "/username/paint.png" },
  { name: "Education", icon: "/username/books.png" },
  { name: "Entertainment", icon: "/username/enter.png" },
  { name: "Fashion & Beauty", icon: "/username/fashion.png" },
  { name: "Food & Beverage", icon: "/username/food.png" },
  { name: "Government & Politics", icon: "/username/gov.png" },
  { name: "Health & Wellness", icon: "/username/health.png" },
  { name: "Non-Profit", icon: "/username/non.png" },
  { name: "Other", icon: "/username/other.png" },
  { name: "Tech", icon: "/username/tech.png" },
  { name: "Travel & Tourism", icon: "/username/travel.png" },
];

const Username = () => {

  const { username, error, isUsername } = useAuthStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryError, setCategoryError] = useState("");


  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // Allow user to unselect
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setCategoryError(""); // Clear error when selection is made
  };

  const {
    register,
    handleSubmit,  
    setError,
    formState: { errors },
  } = useForm()

  function onSubmit(data) {
    if (!selectedCategory) {
      setCategoryError("Please select a category before continuing!");
      return;
    }
   username(data, navigate);

   if (error?.field && error?.message) {
    setError(error.field, { type: "server", message: error.message });
  }
  }




  return (
    <div className={styles.body}>
       <div className={styles.brand}>
              <img src="/logo.svg" />
               <h1>SPARK&nbsp;&nbsp;<div className={styles.trademark}>™</div></h1>
      
            </div>
      <div className={styles.left}>
      <div className={styles.cont}>
        <div className={styles.heading}>
        <h1>Tell us about yourself</h1>
        <p>For a personalized Spark experience</p>
        </div>
       

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          

          <div className={styles.cInput}>
        
            <input
              {...register("username",
                {
                  required: { value: true, message: "username is required" },
                 
                })
              }
              type="text"
              placeholder="Tell us your username"
              className={`${styles.input} ${errors.username ? styles.errorBorder : ""}`}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>

          <div className={styles.container}>
      <h3 className={styles.title}>
        Select one category that best describes your Linktree:
      </h3>

      

      <div className={styles.gridContainer}>
        {categories.map((category) => (
          <button
          type="button" 
            key={category.name}
            className={
              selectedCategory === category.name
                ? styles.selectedButton
                : styles.defaultButton
            }
            onClick={() => handleCategoryClick(category.name)}
          >
            
            <img src={category.icon} alt={category.name} className={styles.icon} />
            {category.name}
          </button>
        ))}
      </div>
    </div>

          
    {categoryError && <p className={styles.error}>{categoryError}</p>}
        
    <button
            type="submit"
            disabled={isUsername}
            className={`${styles.submit} ${isUsername ? styles.disableSubmit : ""}`}
          >
            {isUsername && <Spinner/>}
            Continue
          </button>


        </form>
        

       
      </div>
      </div>
     
      <div className={styles.image}>
        
      </div>
      
    </div>
  )
}

export default Username
