import Web from "../models/web.js";
import Mobile from "../models/mobile.js";
import Game from "../models/game.js";
import Software from "../models/software.js";
import Cloud from "../models/cloud.js";


export const insertDevelopmentData = async (req, res) => {
    try {
        const { web, mobile, game, software, cloud } = req.body;

        if (web && (await Web.countDocuments()) === 0) {
            await Web.create(web);
        }
        if (mobile && (await Mobile.countDocuments()) === 0) {
            await Mobile.create(mobile);
        }
        if (game && (await Game.countDocuments()) === 0) {
            await Game.create(game);
        }
        if (software && (await Software.countDocuments()) === 0) {
            await Software.create(software);
        }
        if (cloud && (await Cloud.countDocuments()) === 0) {
            await Cloud.create(cloud);
        }

        res.status(201).json({ message: "Missing development data inserted successfully" });
    } catch (error) {
        console.error("Error inserting development data:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getDevelopmentData = async (req, res) => {
    try {
        const web = await Web.find();
        const mobile = await Mobile.find();
        const game = await Game.find();
        const software = await Software.find();
        const cloud = await Cloud.find();

        res.status(200).json({ web, mobile, game, software, cloud });
    } catch (error) {
        console.error("Error fetching development data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCategoryData = async (req, res) => {
    try {
        const { category } = req.params;
        let data;

        switch (category.toLowerCase()) {
            case "web":
                data = await Web.findOne();
                break;
            case "mobile":
                data = await Mobile.findOne();
                break;
            case "game":
                data = await Game.findOne();
                break;
            case "software":
                data = await Software.findOne();
                break;
            case "cloud":
                data = await Cloud.findOne();
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid category" });
        }

        if (!data) {
            return res.status(404).json({ success: false, message: "No data found for this category" });
        }

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching category data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateResources = async (req, res) => {
    try {
        const { category } = req.params;  
        const { resources } = req.body;    

        let Model;
        switch (category.toLowerCase()) {
            case "web":
                Model = Web;
                break;
            case "mobile":
                Model = Mobile;
                break;
            case "game":
                Model = Game;
                break;
            case "software":
                Model = Software;
                break;
            case "cloud":
                Model = Cloud;
                break;
            default:
                return res.status(400).json({ message: "Invalid category" });
        }

        if (!resources || !resources.category || !resources.data) {
            return res.status(400).json({ message: "Invalid resources data" });
        }

        const updatedData = await Model.findOneAndUpdate(
            {}, 
            { $set: { [`resources.${resources.category}`]: resources.data } }, 
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Resources updated successfully", updatedData });
    } catch (error) {
        console.error("Error updating resources:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

