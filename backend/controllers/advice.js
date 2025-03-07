import transporter from "../config/mailer.js";
import dotenv from  'dotenv';
import Advice from "../models/advice.js";
dotenv.config();

export const sendContactRequest = async (req, res) => {
  try {

    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    const { name, email, service, message, interviewDateTime, discoveryCallDateTime, mentorshipTopics, prepTopics, topicsLearned, urgency } = req.body;
    const resumeurl = req.file ? req.file.path : null;

    if (!name || !email || !service) {
      return res.status(400).json({ success: false, message: "Name, email, and service are required." });
    }
    if (service === "Resume Review" && !resumeurl) {
      return res.status(400).json({ success: false, message: "Resume is required for Resume Review." });
    }
    if (service === "Mock Interview" && !interviewDateTime) {
      return res.status(400).json({ success: false, message: "Interview Date & Time is required for Mock Interview." });
    }
    if (service === "Discovery Call" && !discoveryCallDateTime) {
      return res.status(400).json({ success: false, message: "Date & Time is required for Discovery Call." });
    }
    if (service === "1:1 Mentorship (Career Guidance)" && !mentorshipTopics) {
      return res.status(400).json({ success: false, message: "Preferred topics are required for 1:1 Mentorship." });
    }
    if (service === "Interview Prep & Tips" && (!prepTopics || !topicsLearned)) {
      return res.status(400).json({ success: false, message: "Both prep topics and topics learned are required for Interview Prep & Tips." });
    }
    if (service === "Priority Messages" && !urgency) {
      return res.status(400).json({ success: false, message: "Urgency level is required for Priority Messages." });
    }

    const adviceData = { name, email, service, status: "pending" };

    if (message) adviceData.message = message;
    if (resumeurl) adviceData.resume = resumeurl;
    if (interviewDateTime) adviceData.interviewDateTime = interviewDateTime;
    if (discoveryCallDateTime) adviceData.discoveryCallDateTime = discoveryCallDateTime;
    if (mentorshipTopics) adviceData.mentorshipTopics = mentorshipTopics;
    if (prepTopics) adviceData.prepTopics = prepTopics;
    if (topicsLearned) adviceData.topicsLearned = topicsLearned;
    if (urgency) adviceData.urgency = urgency;

    const advice = new Advice(adviceData);
    await advice.save();
    const mailOptions = {
      from: adviceData.email,
      to: process.env.EMAIL,
      replyTo: email,
      subject: "New Contact Form Submission",
      text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message || "N/A"}\nResume: ${resumeurl || "N/A"}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({ success: true, message: "Form submitted successfully & email sent!" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const addServices = async(req,res)=>{
    try {
        const {name,email,message,service,status} = req.body;
        const servicenew = await Advice.create({
            name,email,message,service,status
        });
        return res.status(201).json({
            status:true,
            message:"Service added",
            servicenew
        })
    } catch (error) {
        console.error("error",error);
    }
}

export const updateStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;

        const contact = await Advice.findById(id);
        if(!contact){
            return res.status(401).json({
                success:false,
                message:"Contact request not found"
            });
        }
        contact.status = status;
        await contact.save();
        return res.status(201).json({
            success:true,
            message:"Status Updated Successdully"
        });
    } catch (error) {
        console.error("Error occur in updating status:",error);
    }
}

export const getServices = async(req,res)=>{
    try {
        const contact = await Advice.find();

        if(!contact) return res.status(401).json({
            status:false,
            message:"There are no entries in the services"
        })

        return res.status(201).json({
            status:true,
            message:"All fetched",
            contact
        })
    } catch (error) {
        console.error('Error while fetching',error);
    }
}

export const deleteService = async(req,res)=>{
  try {
    const {id} = req.params;
    const service = await Advice.findByIdAndDelete(id);
    return res.json({
      status:true,
      message:"deleted successfully"
    })
  } catch (error) {
    console.log("error in delete",error);
  }
}