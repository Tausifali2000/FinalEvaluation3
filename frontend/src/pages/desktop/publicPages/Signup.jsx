import styles from "./cssModules/auth.module.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";
import Spinner from "../../../components/Spinner";

const Signup = () => {

  const { signup, error, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {

    setError("email", { message: "" });  
    setError("firstName", { message: "" });
    setError("lastName", { message: "" });
    setError("password", { message: "" });
    setError("cPassword", { message: "" });
    setError("server", { message: "" });
    await signup(data, navigate);
    if (error?.field && error?.message) {
      setError(error.field, { type: "server", message: error.message });
    }

  }

 
  const password = watch("password");


  return (
    <div className={styles.body}>
      <Link to="/" className={styles.link}>
            <div className={styles.brand}>
              <img src="/logo.svg" />
               <h1>SPARK&nbsp;&nbsp;<div className={styles.trademark}>™</div></h1>
      
            </div>
      
            </Link>

      <div className={styles.cont}>
        <h1>Sign up to your Spark</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.title}>
            <h2>Create an account</h2>
            <Link to="/signin"><p>Sign in instead</p></Link>
          </div>

          <div className={styles.cInput}>
            <label htmlFor="firstName">First name</label>
            <input
              {...register("firstName",
                {
                  required: { value: true, message: "First name is required" },
                  minLength: { value: 3, message: "Length must be minimun 3 letters" }
                })
              }
              type="text"
              name="firstName"
              className={`${styles.input} ${errors.firstName ? styles.errorBorder : ""}`}
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>

          <div className={styles.cInput}>
            <label htmlFor="lastName">Last name</label>
            <input
              {...register("lastName",
                {

                  minLength: { value: 3, message: "Length must be minimun 3 letters" }
                })
              }
              type="text"
              name="lastName"
              className={`${styles.input} ${errors.lastName ? styles.errorBorder : ""}`}
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>

          <div className={styles.cInput}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email",
                {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }
              )}
              type="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.errorBorder : ""}`}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.cInput}>
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                  message: "Password must include uppercase, lowercase, number, and special character (!@#$%^&*)"
                }
              })}
              type="password"
              name="password"
              className={`${styles.input} ${errors.password ? styles.errorBorder : ""}`}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          </div>

          <div className={styles.cInput}>
            <label htmlFor="cPassword">Confirm Password</label>
            <input
              {...register("cPassword",
                {
                  required: { value: true, message: "Confirm Password is required" },
                  validate: (value) =>
                    value === password || "The password you entered does not match",
                }
              )}
              type="password"
              name="cPassword"
              className={`${styles.input} ${errors.cPassword ? styles.errorBorder : ""}`}
            />
            {errors.cPassword && <p className={styles.error}>{errors.cPassword.message}</p>}
          </div>

          <div className={styles.terms}>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  {...register("terms", {
                    required: { value: true, message: "You must agree to continue" },
                  })}
                />
              }
              label={
                <p>
                  By creating an account, I agree to our <span className={styles.underline}>Terms of Use</span> and <span className={styles.underline}>Privacy Policy</span>
                </p>
              }
            />
            {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className={`${styles.submit} ${isSigningUp ? styles.disabledSubmit : ""}`}
          >
            {isSigningUp && <Spinner />}
            Create an account
          </button>

        </form>

        <div className={styles.captcha}>This site is protected by reCAPTCHA and the <span className={styles.underline}>Google Privacy Policy</span> and <span className={styles.underline}>Terms of Service</span> apply. </div>
      </div>
      <div className={styles.image}>

      </div>

    </div>
  )
}

export default Signup
