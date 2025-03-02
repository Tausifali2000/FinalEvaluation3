import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchAppearance, saveAppearance } from "../controllers/appearance.controller.js";


const router = express.Router(); 

router.get("/fetch", protectRoute, fetchAppearance);
router.post("/save", protectRoute, saveAppearance);



export default router;