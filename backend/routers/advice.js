import express from "express";
import {addServices, deleteService, getServices, sendContactRequest, updateStatus} from "../controllers/advice.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/send", uploadMiddleware , sendContactRequest);

router.patch("/:id/status",updateStatus);
router.post("/addservice",addServices);
router.get("/allservices",getServices);
router.delete("/:id/delete",deleteService);
export default router;
