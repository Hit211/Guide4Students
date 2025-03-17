import express from "express";
import { addMentor, allMentors, changeAvailability } from "../controllers/mentor.js";


const router = express.Router();

router.post("/add",addMentor);
router.get("/all",allMentors);
router.patch("/:id/updatestate",changeAvailability);

export default router;