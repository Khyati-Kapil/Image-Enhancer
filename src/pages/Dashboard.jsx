import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Spotlight from "../components/Spotlight";
import { enhancedImageAPI } from "../utils/enhanceImageApi";
import { imageService } from "../services/image";
import { useAuth } from "../context/AuthContext";
import BeforeAfterSlider from "../components/BeforeAfterSlider";

const Icons = {
  Brightness: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Contrast: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Saturation: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Blur: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Grayscale: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Reset: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
};

const Dashboard = () => {
    const { user } = useAuth();
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        grayscale: 0,
    });
const [activeTab, setActiveTab] = useState("upload"); 
    const [showSlider, setShowSlider] = useState(true);
    const fileInputRef = useRef(null);

    const UploadImageHandler = async (file) => {
        const originalImageUrl = URL.createObjectURL(file);
        setUploadImage(originalImageUrl);
        setActiveTab("upload");
        setLoading(true);
        try {
            const enhancedData = await enhancedImageAPI(file);
            
            
            const imageUrl = typeof enhancedData.image === 'string' 
                ? enhancedData.image 
                : enhancedData.image?.url || enhancedData.image?.image || enhancedData.image;

            if (enhancedData && imageUrl) {
                setEnhancedImage({ image: enhancedData.image });
                
                
                if (user) {
                    try {
                        await imageService.saveEnhancedImage(
                            originalImageUrl,  
                            imageUrl,          
                            "general",
                            file.name,
                            file.size
                        );
                        console.log("Image saved to gallery successfully");
                    } catch (saveError) {
                        console.log("Could not save to gallery:", saveError.message);
                    }
                }
                
                setActiveTab("result");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            alert("Error while enhancing the image. Please try again later.");
        }
    };

    const handleReset = () => {
        setUploadImage(null);
        setEnhancedImage(null);
        setActiveTab("upload");
        setFilters({
            brightness: 100,
            contrast: 100,
            saturation: 100,
            blur: 0,
            grayscale: 0,
        });
    };

    const handleDownload = async () => {
        if (enhancedImage?.image) {
            try {
                
                const imageUrl = typeof enhancedImage.image === 'string' 
                    ? enhancedImage.image 
                    : enhancedImage.image?.url || enhancedImage.image?.image || enhancedImage.image;

                if (!imageUrl) {
                    throw new Error('No image URL found');
                }

                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);
                
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = "enhanced-image.jpg";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error("Download failed:", error);
               
                const imageUrl = typeof enhancedImage.image === 'string' 
                    ? enhancedImage.image 
                    : enhancedImage.image?.url;
                
                if (imageUrl) {
                    const link = document.createElement("a");
                    link.href = imageUrl;
                    link.download = "enhanced-image.jpg";
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            UploadImageHandler(file);
        }
    };

    const getImageStyle = () => ({
        filter: `
            brightness(${filters.brightness}%) 
            contrast(${filters.contrast}%) 
            saturate(${filters.saturation}%) 
            blur(${filters.blur}px) 
            grayscale(${filters.grayscale}%)
        `,
        transition: "filter 0.3s ease",
    });

    return (
        <div className="min-h-screen bg-black">
            <Spotlight />
            <Navbar />
            <main className="pt-16 px-4 pb-12">
                
                <div className="max-w-7xl mx-auto mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                    >
                        Image Enhancer
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400"
                    >
                        Transform your images with AI-powered enhancement
                    </motion.p>
                </div>

            
                {activeTab === "upload" && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div 
                            className="card cursor-pointer hover-scale"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-16 h-16 bg-gray-900 border border-gray-700 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Upload Your Image
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Click or drag to upload
                                </p>
                                <span className="btn-primary" style={{ borderRadius: 0 }}>
                                    Choose File
                                </span>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            className="hidden"
                        />

                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                            {[
                                { icon: Icons.Brightness, title: "Smart Upscale", desc: "4x resolution boost" },
                                { icon: Icons.Contrast, title: "Denoise", desc: "Remove noise & grain" },
                                { icon: Icons.Saturation, title: "Sharpen", desc: "Enhance details" },
                                { icon: Icons.Blur, title: "Deblur", desc: "Fix blurry images" },
                                { icon: Icons.Grayscale, title: "Color Correct", desc: "Auto adjustment" },
                                { icon: Icons.Reset, title: "Fast Process", desc: "Seconds ready" },
                            ].map((feature, index) => (
                                <div key={index} className="card py-4 px-4 hover-scale cursor-default">
                                    <div className="w-10 h-10 bg-gray-900 border border-gray-700 flex items-center justify-center text-white mb-2">
                                        <feature.icon />
                                    </div>
                                    <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                                    <p className="text-gray-500 text-xs">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {loading && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="card py-16">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 border-4 border-t-white border-gray-700 rounded-full animate-spin mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Enhancing Your Image
                                </h3>
                                <p className="text-gray-500">
                                    This may take a few seconds...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

               
                {activeTab === "result" && enhancedImage && !loading && (
                    <div className="max-w-7xl mx-auto animate-fade-in">
                   
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowSlider(!showSlider)}
                                className="btn-secondary flex items-center gap-2 hover-scale"
                                style={{ borderRadius: 0 }}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                <span>{showSlider ? "Show Side by Side" : "Show Slider Comparison"}</span>
                            </button>
                        </div>

                        {showSlider ? (
                            <div className="mb-8">
                                <BeforeAfterSlider 
                                    beforeImage={uploadImage}
                                    afterImage={enhancedImage.image}
                                    beforeLabel="Original"
                                    afterLabel="Enhanced"
                                />
                                <p className="text-center text-gray-400 text-sm mt-4">
                                    Drag the slider to compare original and enhanced images
                                </p>
                            </div>
                        ) : (
                           
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            
                                <div className="card overflow-hidden">
                                    <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                                        <h3 className="text-white font-medium">Original</h3>
                                    </div>
                                    <div className="aspect-video flex items-center justify-center bg-gray-900 p-4">
                                        <img 
                                            src={uploadImage} 
                                            alt="Original" 
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                </div>

                               
                                <div className="card overflow-hidden lg:col-span-2">
                                    <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                                        <h3 className="text-white font-medium">Enhanced</h3>
                                    </div>
                                    <div className="aspect-video flex items-center justify-center bg-gray-900 p-4">
                                        <img 
                                            src={enhancedImage.image} 
                                            alt="Enhanced" 
                                            className="max-w-full max-h-full object-contain"
                                            style={getImageStyle()}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                       
                        <div className="card mb-6">
                            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                                <h3 className="text-white font-medium">Adjustments</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {[
                                    { key: "brightness", label: "Brightness", icon: Icons.Brightness, min: 0, max: 200 },
                                    { key: "contrast", label: "Contrast", icon: Icons.Contrast, min: 50, max: 150 },
                                    { key: "saturation", label: "Saturation", icon: Icons.Saturation, min: 0, max: 200 },
                                    { key: "blur", label: "Blur", icon: Icons.Blur, min: 0, max: 10 },
                                    { key: "grayscale", label: "Grayscale", icon: Icons.Grayscale, min: 0, max: 100 },
                                ].map((filter) => (
                                    <div key={filter.key}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <filter.icon />
                                                <span className="text-gray-400 text-sm">{filter.label}</span>
                                            </div>
                                            <span className="text-white text-sm">{filters[filter.key]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={filter.min}
                                            max={filter.max}
                                            value={filters[filter.key]}
                                            onChange={(e) => setFilters({ ...filters, [filter.key]: Number(e.target.value) })}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleDownload}
                                className="btn-primary flex items-center justify-center gap-2 hover-scale"
                                style={{ borderRadius: 0 }}
                            >
                                <Icons.Download />
                                <span>Download</span>
                            </button>
                            <button
                                onClick={handleReset}
                                className="btn-secondary flex items-center justify-center gap-2 hover-scale"
                                style={{ borderRadius: 0 }}
                            >
                                <Icons.Reset />
                                <span>Enhance Another</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
