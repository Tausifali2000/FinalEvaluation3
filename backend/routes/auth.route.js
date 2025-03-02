import express from "express";
import {signup, username, signin, logout, authCheck, updateUser} from "../controllers/auth.controller.js";
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router(); 

router.post("/signup", signup); //Signup
router.post("/username", protectRoute, username); 
router.post("/signin", signin); //Signin
router.post("/logout", logout); //Logout
router.post("/updateuser", protectRoute, updateUser); 
router.get("/authCheck", protectRoute, authCheck); //Checks user

export default router;