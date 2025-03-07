import express from "express";
import { addResource, getResourcesByCategory } from "../controllers/resources.js";


const router = express.Router();

router.post("/add",addResource);
router.get("/getresource/:category",getResourcesByCategory);


export default router;