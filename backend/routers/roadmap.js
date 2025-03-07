import express from "express";
import { getRoadMap, insertRoadMap, selectRoadMap } from "../controllers/roadmap.js";


const router = express.Router();

router.post("/insert",insertRoadMap);
router.get("/getmaps",getRoadMap);
router.get("/:id",selectRoadMap);

export default router;