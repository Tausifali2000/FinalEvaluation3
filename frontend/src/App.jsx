import { useEffect, useState } from "react";
import { Route,Routes, Navigate, useNavigate} from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { toast, ToastContainer } from "react-toastify";
import './Toast.css';
import { useAuthStore } from "./store/auth.store";
import DesktopLayout from "./layout/DesktopLayout";
import Links from "./pages/desktop/Links";
import Username from "./pages/desktop/Username";
import Signin from "./pages/desktop/publicPages/Signin";
import LandingPage from "./pages/desktop/publicPages/LandingPage";
import Signup from "./pages/desktop/publicPages/Signup";
import Appearance from "./pages/desktop/Appearance";
import Analytics from "./pages/desktop/Analytics";
import Settings from "./pages/desktop/Settings";
import LinkTree from "./pages/desktop/publicPages/LinkTree";
import { useScreenStore } from "./store/screen.store.js";
import MobileLayout from "./layout/MobileLayout.jsx";
import MobileTree from "./pages/desktop/publicPages/MobileTree.jsx";
import MainSkeleton from "./skeletons/MainSkeleton.jsx";
import MobileLanding from "./pages/desktop/publicPages/MobileLanding.jsx";

export const CustomToast = {
  success: (message) => {
    toast.success(message, {
      icon: <img src="/toast/success.svg" className="toast-icon" />,
      className: "success-toast",
      closeButton: <span className="toast-close-btn">×</span>,
      position: "top-center",
    });
  },
  error: (message) => {
    toast.error(message, {
      icon: <img src="/toast/warning.svg" className="toast-icon" />,
      className: "error-toast",
      closeButton: <span className="toast-close-btn">×</span>,
      position: "top-center",
    });
  },
};



function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
   const { screen } = useScreenStore();
  
 
  const navigate = useNavigate();
  useEffect(() => {
    authCheck();
    }, []);

    useEffect(() => {
      const checkScreenSize = () => {
        screen(window.innerWidth)
        setScreenSize(window.innerWidth);
      };
      checkScreenSize();
  
     window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
      if (user && !user.username && window.location.pathname !== "/username") {
        navigate("/username"); // Redirect only if user has no username
      }
    }, [user, navigate]);
    

    if (isCheckingAuth) {
      return <MainSkeleton />; // ✅ Prevent rendering before auth check completes
    }

  return (
<>
  <Routes>
    <Route path="/welcome" element={!user ? (screenSize <= 650 ? <MobileLanding/> : <LandingPage />): <Navigate to="/" />}></Route>
    <Route path="/signup" element={!user ? <Signup /> : <Navigate to ="/" />}></Route>
    <Route path="/signin" element={!user ? <Signin /> : <Navigate to ="/" />}></Route>
    <Route path="/:userId" element={screenSize <= 650 ? <MobileTree/> : <LinkTree />}></Route>
    

    <Route path="/username" element={user ? <Username /> : <Navigate to="/signin" />} />
    
       {/* Home layout with nested routes */}
       <Route path="/" element={user ? (screenSize <= 650 ? <MobileLayout/> : <DesktopLayout />): <Navigate to="/welcome" />}>
          <Route index element={<Links />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
  </Routes>
  <Toaster />
  <ToastContainer
      position= "top-centre"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
      />
</>
  )
}

export default App
