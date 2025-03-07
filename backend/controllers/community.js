import Community from "../models/community.js";

export const addCommunity = async (req, res) => {
  try {
    const { name, platform, link, description } = req.body;
    const community = new Community({ name, platform, link, description });
    await community.save();
    res.status(201).json({ success: true, message: "Community added successfully", community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding community", error: error.message });
  }
};

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json({ success: true, communities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching communities", error: error.message });
  }
};


export const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ success: false, message: "Community not found" });
    res.status(200).json({ success: true, community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching community", error: error.message });
  }
};

export const updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!community) return res.status(404).json({ success: false, message: "Community not found" });
    res.status(200).json({ success: true, message: "Community updated successfully", community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating community", error: error.message });
  }
};

export const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);
    if (!community) return res.status(404).json({ success: false, message: "Community not found" });
    res.status(200).json({ success: true, message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting community", error: error.message });
  }
};
