import mongoose from "mongoose";

const cloudSchema = new mongoose.Schema({
  languages: {
    cloud_platforms: { type: [String] },
    backend: { type: [String] }
  },
  total_time_required: { type: String },
  examples: { type: [String] },
  documentation_links: { type: Map, of: String }
});

const Cloud = mongoose.model("Cloud", cloudSchema);
export default Cloud;
