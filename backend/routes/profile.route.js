import express from "express";
import { protectRoute } from '../middleware/protectRoute.js';
import { profileSave, fetchProfile, imageUpload } from "../controllers/profile.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router(); 

router.post("/save", protectRoute, profileSave);
router.get("/fetchProfile", protectRoute, fetchProfile) 
router.post("/imageupload", protectRoute, upload.single("image"), imageUpload);

export default router;