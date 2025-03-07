import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary config is missing.");
    process.exit(1);
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
      let resourceType = 'image';
      if (file.mimetype === 'application/pdf') {
          resourceType = 'raw'; 
      }
      return {
          folder: 'uploads',
          allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'webp'],
          resource_type: resourceType,
      };
  },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export { upload, cloudinary };
