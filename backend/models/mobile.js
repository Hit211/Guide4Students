import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  languages: {
    frontend: { type: [String] },
    backend: { type: [String] }
  },
  total_time_required: { type: String },
  examples: { type: [String] },
  documentation_links: { type: Map, of: String }
});

const Mobile = mongoose.model("Mobile", mobileSchema);
export default Mobile;
