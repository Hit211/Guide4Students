import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  
  port: 465,               
  secure: true,           
  auth: {
    user: process.env.EMAIL,   
    pass: process.env.PASSWORD, 
  },
});

export default transporter;
