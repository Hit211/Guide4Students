import express from "express";
import {
  addCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunity,
  deleteCommunity,
} from "../controllers/community.js";

const router = express.Router();

router.post("/add", addCommunity);
router.get("/all", getAllCommunities);
router.get("/:id", getCommunityById);
router.put("/:id", updateCommunity);
router.delete("/:id", deleteCommunity);

export default router;
