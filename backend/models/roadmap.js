import mongoose from "mongoose";

const roadmapSchema = await mongoose.Schema({
    name :{
        type: String,
        required:true
    },
    shortname:{
        type:String,
    }
});


const RoadMap = await mongoose.model("RoadMap",roadmapSchema);
export default RoadMap;