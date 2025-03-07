import mongoose from "mongoose";

const webSchema = new mongoose.Schema({
  languages: {
    frontend: { type: [String] },
    backend: { type: [String] }
  },
  total_time_required: { type: String },
  examples: { type: [String] },
  documentation_links: { type: Object, of: String }
});

const Web = mongoose.model("Web", webSchema);
export default Web;
