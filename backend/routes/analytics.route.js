import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchAnalytics } from "../controllers/analytics.controller.js";




const router = express.Router(); 

router.get("/fetch", protectRoute, fetchAnalytics);



export default router;