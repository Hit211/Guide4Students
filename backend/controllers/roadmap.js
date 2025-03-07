import RoadMap from "../models/roadmap.js";

export const insertRoadMap = async (req, res) => {
    try {
        const roadmapItems = [
            "Development (Mobile, Game, Web, Software, Cloud)",
            "Artificial Intelligence & Machine Learning",
            "Quality Assurance & Testing",
            "Cybersecurity",
            "Database Management",
            "Networking",
            "Blockchain",
            "Business Intelligence (BI)",
            "IT Support & Infrastructure",
            "Data Engineering",
            "IT Consulting",
            "Augmented Reality (AR) / Virtual Reality (VR)",
            "Robotics Process Automation (RPA)",
        ];

        const count = await RoadMap.countDocuments();
        if (count > 0) {
            return res.status(400).json({ message: "Roadmap items already exist" });
        }

        await RoadMap.insertMany(roadmapItems.map((item) => ({ name: item })));

        res.status(201).json({ message: "Roadmap items inserted successfully" });
    } catch (error) {
        console.error("Error inserting roadmap items:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getRoadMap = async(req,res)=>{
    try {
        const roadmap = await RoadMap.find();
        return res.status(200).json({
            roadmap,
            success:true,
            message:"Fetched Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const selectRoadMap = async(req,res)=>{
    try {
        const {id} = req.params;
        const selectroadmap = await RoadMap.findById(id);

        if(!selectroadmap){
            return res.status(400).json({
                success:false,
                message:"Roadmap Not Found"
            })
        }
        return res.status(200).json({
            selectroadmap,
            status:true,
            message:"fetched"
        })
    } catch (error) {
        console.log(error);
    }
}