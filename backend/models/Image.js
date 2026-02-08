import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  originalImage: {
    type: String,
    required: true,
  },
  enhancedImage: {
    type: String,
    default: "",
  },
  enhancementType: {
    type: String,
    enum: ["upscale", "denoise", "sharpen", "deblur", "color-correct", "general", "compress"],
    default: "general",
  },
  scaleFactor: {
    type: Number,
    default: 2,
  },
  originalName: {
    type: String,
    default: "",
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Image", imageSchema);

