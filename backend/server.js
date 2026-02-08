import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'https://image-enhancer-git-master-khyati-kapils-projects.vercel.app',
  'https://image-enhancer-murex.vercel.app',
  'https://pixora-qpa9.onrender.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    

    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }
    
 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};


app.options('*', cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes); 
app.use("/api/images", imageRoutes);
app.use("/images", imageRoutes); 


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Image Enhancer API is running" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

