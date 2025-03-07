import mongoose from "mongoose";

const softwareSchema = new mongoose.Schema({
  languages: {
    desktop_apps: { type: [String] },
    backend: { type: [String] }
  },
  total_time_required: { type: String },
  examples: { type: [String] },
  documentation_links: { type: Map, of: String }
});

const Software = mongoose.model("Software", softwareSchema);
export default Software;
