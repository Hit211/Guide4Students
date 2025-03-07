import Resource from "../models/resources.js";

export const addResource = async(req,res)=>{
    try {
        const {category,title,language,video_url,thumbnail,
          time_length,description} = req.body;
        if (!category || !language || !title || !video_url || !thumbnail || !description || !time_length) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newResource = await Resource.create({
            category, 
            language,
            title,
            video_url,
            thumbnail,
            description,
            time_length
          });
          res.status(201).json({ message: "Resource added successfully!", newResource });
    } catch (error) {
        console.error("Error adding resource:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const getResourcesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const resources = await Resource.find({ category });

    if (resources.length === 0) {
      return res.status(404).json({ message: "No resources found for this category" });
    }

    res.status(200).json({ category, resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
