import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createAdmin = async(req,res)=>{
    try {
        const existingAdmin = await User.findOne({email:process.env.EMAIL});
        if(existingAdmin) return;

        const hashedPassword = await bcrypt.hash(process.env.VITE_ADMIN_PASSWORD,10);

        const admin = await User.create({
            name:"Admin",
            email:process.env.EMAIL,
            password:hashedPassword,
            role:"admin"
        })
    } catch (error) {
        console.error(error);
    }
}

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        const admin = await User.findOne({ email });

        if (!admin || admin.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Access Denied!",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
            },
            process.env.SECRET_KEY_ADMIN,
            { expiresIn: "1d" }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, 
        });

        res.status(201).json({
            success: true,
            message: "Admin Login Successful",
            user: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
