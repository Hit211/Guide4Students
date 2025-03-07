import mongoose from "mongoose";

const adviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type:String, enum:["pending","completed"], default:"pending" },
  createdAt: { type: Date, default: Date.now },
});

const Advice = mongoose.model("Advice",adviceSchema);
export default Advice;