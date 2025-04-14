import mongoose, { mongo } from "mongoose";

const mentorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    service:{
        type:[String],
        required:true
    },
    mentorshipProvided:{
        type:Number,
        default:0
    },
    linkedInUrl:{
        type:String,
        required:true,
        validate:{
            validator: function(v){
                return /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/.test(v);
            },
            message: props=> `${props.value} is not a valid LinkedIn Url`
        },
    },
    profilePic:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    available:{
        type:String
    },
    company:{
        type:String
    },
    totalrating:{
        type:Number,
        default:0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review" 
    }]
});

const Mentor = mongoose.model("Mentor",mentorSchema);
export default Mentor;