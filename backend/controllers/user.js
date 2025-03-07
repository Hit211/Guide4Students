import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const signUp = async(req,res)=>{
   try {

    const {name,email,password} = req.body;

    if(!name || !email || !password) 
        return res.status(401).json({
           status:false,
           message:"All fields are required"
        })

    const hashedPassword = await bcrypt.hash(password,10); 
    
    const adminEmails = ["phit73650@gmail.com"];
    const role = adminEmails.includes(email)? "admin" : "user";

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });

    return res.status(201).json({
        user,
        status:true,
        message:"Account Created"
    })    
   } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server Error" });
   }    
}

export const logIn = async(req,res)=>{
   try {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(401).json({
            status:false,
            message:"Fill the field"
        })
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            status:false,
            message:"User Doenot Exists"
        })
    }
    
    const matchPassword = await bcrypt.compare(password,user.password);
    if(!matchPassword){
        return res.status(401).json({
            status:false,
            message:"Incorrect Password"
        })
    }

    const token = await jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn :'1d'});
    return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
        message: `Welcome back ${user.name}`,
        success: true,
        user,
        token
    });

   } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server Error" });
   }
}


export const logOut = async(req,res)=>{
    return res.cookie("token","",{maxAge: 0}).json({
        success:true,
        message:"LogOut successfully"
    })
}