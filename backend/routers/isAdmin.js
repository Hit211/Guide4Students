// import express from "express";
// import { isAdmin } from "../middleware/isAdmin.js";
// import { adminLogin } from "../controllers/adminLogin.js";
// import cookieParser from "cookie-parser";
// const router = express.Router();
// router.use(cookieParser());
// router.post("/admin/login",adminLogin);
// router.get("/admin",isAdmin,(req,res)=>{
//     res.json({
//         message:"Welcome Admin"
//     });
// });

// router.get("/admin/verify",isAdmin,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Token is valid"
//     });
// })

// export default router;