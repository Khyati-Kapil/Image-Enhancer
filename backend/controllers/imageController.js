import Image from "../models/Image.js";
import { enhancedImageAPI } from "../utils/enhanceImageApi.js";


const enhanceImage = async (req, res) => {
  try {
    const { enhancementType, scaleFactor } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Please upload an image" });
    }


    const userId = req.user ? req.user._id : null;

    const image = await Image.create({
      user: userId,
      originalImage: file.path,
      enhancedImage: "",
      enhancementType: enhancementType || "general",
      scaleFactor: scaleFactor || 2,
      originalName: file.originalname,
      fileSize: file.size,
      status: "processing",
    });

  
    processEnhancement(image._id, file, enhancementType, scaleFactor);

    res.status(201).json({
      _id: image._id,
      status: "processing",
      message: "Image enhancement started",
    });
  } catch (error) {
    console.error("Enhancement error:", error);
    res.status(500).json({ message: error.message });
  }
};

async function processEnhancement(imageId, file, enhancementType, scaleFactor) {
  try {
    const result = await enhancedImageAPI(file, enhancementType, scaleFactor);
    
    await Image.findByIdAndUpdate(imageId, {
      enhancedImage: result.image || result.url,
      status: "completed",
    });
  } catch (error) {
    await Image.findByIdAndUpdate(imageId, {
      status: "failed",
    });
    console.error("Background processing error:", error);
  }
}


const getUserImages = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    
    const query = { user: req.user._id };
    if (type) {
      query.enhancementType = type;
    }

    const images = await Image.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Image.countDocuments(query);

    res.json({
      images,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (image && image.user.toString() === req.user._id.toString()) {
      res.json(image);
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    if (image && image.user.toString() === req.user._id.toString()) {
      await image.deleteOne();
      res.json({ message: "Image removed" });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnhancementTypes = async (req, res) => {
  res.json([
    { id: "upscale", name: "Upscale", description: "Increase image resolution up to 4x" },
    { id: "denoise", name: "Denoise", description: "Remove noise and grain" },
    { id: "sharpen", name: "Sharpen", description: "Enhance image details" },
    { id: "deblur", name: "Deblur", description: "Fix blurry images" },
    { id: "color-correct", name: "Color Correct", description: "Improve colors and contrast" },
    { id: "general", name: "General Enhance", description: "Overall image improvement" },
  ]);
};

export {
  enhanceImage,
  getUserImages,
  getImageById,
  deleteImage,
  getEnhancementTypes,
};

