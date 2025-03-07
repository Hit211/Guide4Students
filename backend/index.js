import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/database.js";
import roadmapRoute from "./routers/roadmap.js";
import developmentRoute from "./routers/development.js";  
import userRoute from "./routers/user.js";
import resourceRoute from "./routers/resource.js";
import communityRoute from "./routers/community.js";
import adviceRoute from "./routers/advice.js";
import adminRoute from "./routers/admin.js";
import { createAdmin } from "./controllers/adminLogin.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"], 
    credentials: true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDB();
createAdmin();
const PORT = process.env.PORT || 5000;

app.use("/api/roadmaps", roadmapRoute);
app.use("/api/development", developmentRoute);
app.use("/api/user",userRoute);  
app.use("/api/resources",resourceRoute);
app.use("/api/community", communityRoute);
app.use("/api/advice", adviceRoute);
app.use("/api",adminRoute);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
