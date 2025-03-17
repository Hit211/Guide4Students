import Mentor from "../models/mentors.js";

export const addMentor = async(req,res)=>{
    try {
        const {name,email,service,rating,linkedInUrl,profilePic,description,mentorshipProvided,available} = req.body;
        const mentor = await Mentor.create({
            name,email,service,rating,linkedInUrl,profilePic,description,mentorshipProvided,available
        });

        res.status(201).json({
            success:true,
            message:"Mentor add successfully",
            mentor
        })
    } catch (error) {
        if(error.name === "ValidationError"){
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }
        res.status(500).json({
            success:false,
            message:"Internal Error"
        })
    }
}

export const allMentors = async(req,res)=>{
    try {
        const mentor = await Mentor.find();
        return res.status(201).json({
            success:true,
            message:"Fetched Successfully",
            mentor
        })
    } catch (error) {
        return res.status(500).json({
            status:"false",
            message:"Internal Server Error"
        })        
    }
}


export const changeAvailability = async(req,res)=>{
    try {
        const {id} = req.params;
        const {available} = req.body;

        const mentor = await Mentor.findById(id);
        if(!mentor){
            return res.status(400).json({
                status:false,
                message:"Mentors is not found"
            })
        }

        mentor.available = available;
        mentor.save();

        return res.status(201).json({
            success:true,
            message:"Changes Successfull"
        })

    } catch (error) {
        return res.status(500).json({
            status:"false",
            message:"Internal  Server Error"
        })
    }
}