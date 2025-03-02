import styles from "./cssModules/auth.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";

const Signin = () => {

  const { signin, error, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {
   
   
    await signin(data, navigate);
    
   
  }

  useEffect(() => {
    if (error?.message) {
      setError("username", { type: "server", message: error.message });
      setError("password", { type: "server", message: error.message });
    }
  }, [error, setError]); // Runs when `error` changes





  return (
    <div className={styles.body}>
      <Link to="/" className={styles.link}>
      <div className={styles.brand}>
        <img src="/logo.svg" />
         <h1>SPARK&nbsp;&nbsp;<div className={styles.trademark}>™</div></h1>

      </div>

      </Link>
   
      <div className={styles.cont}>
        <h1>Sign in to your Spark</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          

          <div className={styles.cInput}>
        
            <input
              {...register("username",
                {
                  required: { value: true, message: "username is required" },
                 
                })
              }
              type="text"
              placeholder="Spark/ Username"
              className={`${styles.input} ${errors.username ? styles.errorBorder : ""}`}
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
          </div>

          

          <div className={styles.cInput}>
          
            <input
              {...register("password", {
                required: { value: true, message: "Password is required" },
                
              })}
              type="password"
              placeholder="Password"
              className={`${styles.input} ${errors.password ? styles.errorBorder : ""}`}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          </div>

        

         

          <button
            type="submit"
            disabled={isLoggingIn}
            className={`${styles.submit} ${isLoggingIn? styles.disabledSubmit : ""}`}
          >
            {isLoggingIn && <Spinner />}
            Log in
          </button>

        </form>
        <div className={styles.options}><p className={styles.gn}>Forgot Password?</p>
        <p>Don't have an account? <Link to="/signup"><span className={styles.gn}>Sign up</span></Link></p></div>

        <div className={styles.captcha2}>This site is protected by reCAPTCHA and the <span className={styles.underline}>Google Privacy Policy</span> and <span className={styles.underline}>Terms of Service</span> apply. </div>
      </div>
      <div className={styles.image2}>
        
      </div>
      
    </div>
  )
}

export default Signin
