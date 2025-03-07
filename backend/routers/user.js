import express from "express";
import { logIn, logOut, signUp } from "../controllers/user.js";


const router = express.Router();

router.post("/signup",signUp);
router.post("/login",logIn);
router.delete("/logout",logOut);


export default router;