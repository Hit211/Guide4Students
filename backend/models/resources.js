import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ["web", "mobile", "software", "game","cloud"] },
  language: { type: String, required: true },
  title: { type: String, required: true },
  video_url: { type: String, required: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  time_length: { type: String, required: true }
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
