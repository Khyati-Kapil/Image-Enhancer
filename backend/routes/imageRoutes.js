import express from "express";
import {
  enhanceImage,
  getUserImages,
  getImageById,
  deleteImage,
  getEnhancementTypes,
} from "../controllers/imageController.js";
import { protect } from "../middleware/auth.js";
import multer from "multer";
import Image from "../models/Image.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

router.get("/types", getEnhancementTypes);

router.post("/enhance", upload.single("image"), enhanceImage);

// Save enhanced image from client-side processing
router.post("/save-enhanced", protect, async (req, res) => {
  try {
    const { originalImage, enhancedImage, enhancementType, originalName, fileSize } = req.body;
    
    const image = await Image.create({
      user: req.user._id,
      originalImage,
      enhancedImage,
      enhancementType: enhancementType || "general",
      scaleFactor: 2,
      originalName: originalName || "enhanced-image.jpg",
      fileSize: fileSize || 0,
      status: "completed",
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Save enhanced image error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.route("/").get(protect, getUserImages);
router.route("/:id").get(protect, getImageById).delete(protect, deleteImage);

export default router;

