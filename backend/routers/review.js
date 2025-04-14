import express from "express";
import { createReview, deleteReview, getReviews, updateReview } from "../controllers/review.js";

const router = express.Router();

router.post("/create",createReview);
router.get("/:mentorId",getReviews);
router.put("/:reviewId",updateReview);
router.delete("/:reviewId",deleteReview);

export default router;