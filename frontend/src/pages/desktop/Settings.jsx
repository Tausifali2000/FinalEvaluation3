import { useEffect } from "react";
import styles from "./cssModules/Settings.module.css"
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/auth.store";
import Spinner from "../../components/Spinner";

const Settings = () => {

  const { user, updateUser, error, isUpdatingUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm()

    useEffect(() => {
      setValue("firstName", user?.firstName || "");
      setValue("lastName", user?.lastName || "");
      setValue("email", user?.email || "");
      
    }, [user, setValue]);
  

  async function onSubmit(data) {

    setError("email", { message: "" });  
    setError("firstName", { message: "" });
    setError("lastName", { message: "" });
    setError("password", { message: "" });
    setError("cPassword", { message: "" });
    await updateUser(data);
    
    if (error?.field && error?.message) {
      setError(error.field, { type: "server", message: error.message });
    }
   
  }

  const password = watch("password");

  return (
    <div className={styles.body}>
      <div className={styles.contSettings}>
        <div className={styles.title}>
          <h1>Edit Profile</h1>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >

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

          <div className={styles.cSave}>
          <button
            type="submit"
            disabled={isUpdatingUser}
            className={`${styles.saveButton} ${isUpdatingUser ? styles.disableSave : ""}`}
          >
            {isUpdatingUser && <Spinner/>}
            Save
          </button>
          </div>
          
          
        </form>
      </div>

    </div>
  )
}

export default Settings
