import express from "express";
import { getCategoryData, getDevelopmentData, insertDevelopmentData, updateResources } from "../controllers/development.js";

const router = express.Router();

router.post("/insert", insertDevelopmentData);
router.get("/fetch",getDevelopmentData);
router.get("/:category",getCategoryData);
router.patch("/update/:category",updateResources);

export default router;
