import express from "express";
import { addCta, fetchTree, profileClick, shopClick, toggleClick } from "../controllers/linkTree.controller.js";



const router = express.Router(); 

router.get("/:userId", fetchTree);

router.post("/addcta/:userId", addCta);
router.post("/profileclick/:userId", profileClick);
router.post("/shopclick/:userId", shopClick);
router.post("/toggleclick/:userId", toggleClick);


export default router;