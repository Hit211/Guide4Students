import {upload} from "../config/cloudinary.js"

const uploadMiddleware = (req, res, next) => {
    const isMultipart = req.headers["content-type"]?.includes("multipart/form-data");

    if (isMultipart) {
        upload.single("resume")(req, res, (err) => {
            if (err) {
                return res.status(401).json({ message: "File Upload failed", error: err.message });
            }
            next();
        });
    } else {
        next();
    }
};

export default uploadMiddleware;