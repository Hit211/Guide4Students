import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    platform: {
      type: String,
      enum: ["Telegram", "WhatsApp", "Discord"],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
