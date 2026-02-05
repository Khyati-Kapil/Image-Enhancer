import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imageService } from "../services/image";

// Professional Icons
const Icons = {
  Upscale: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
    </svg>
  ),
  Denoise: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Sharpen: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  Deblur: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  ColorCorrection: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  General: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const typeConfig = {
  upscale: { icon: Icons.Upscale, label: "Upscale" },
  denoise: { icon: Icons.Denoise, label: "Denoise" },
  sharpen: { icon: Icons.Sharpen, label: "Sharpen" },
  deblur: { icon: Icons.Deblur, label: "Deblur" },
  "color-correct": { icon: Icons.ColorCorrection, label: "Color Correct" },
  general: { icon: Icons.General, label: "General" },
};

const Gallery = ({ images, onDelete, onEnhanceAgain }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const filteredImages = filterType === "all" 
    ? images 
    : images.filter(img => img.enhancementType === filterType);

  // Helper function to render icon
  const renderIcon = (type) => {
    const config = typeConfig[type];
    if (config?.icon) {
      const IconComponent = config.icon;
      return <IconComponent className="w-full h-full" />;
    }
    return null;
  };

  const handleDownload = (imageUrl, filename) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `enhanced-${filename || "image"}.jpg`;
    link.click();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Gallery</h2>
          <p className="text-gray-400">{filteredImages.length} images</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="upscale">Upscale</option>
            <option value="denoise">Denoise</option>
            <option value="sharpen">Sharpen</option>
            <option value="deblur">Deblur</option>
            <option value="color-correct">Color Correct</option>
            <option value="general">General</option>
          </select>

          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400"}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400"}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Images Grid/List */}
      {filteredImages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No images yet</h3>
          <p className="text-gray-400">Upload your first image to get started</p>
        </motion.div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Preview */}
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.enhancedImage}
                    alt={image.originalName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image.enhancedImage, image.originalName);
                      }}
                      className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(image._id);
                      }}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.status === "completed" 
                        ? "bg-green-500/20 text-green-400"
                        : image.status === "processing"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {image.status}
                    </span>
                  </div>

{/* Type Badge */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                      <span className="w-3 h-3">
                        {renderIcon(image.enhancementType)}
                      </span>
                      {typeConfig[image.enhancementType]?.label || image.enhancementType}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-white truncate">{image.originalName}</p>
                  <p className="text-xs text-gray-400">{formatDate(image.createdAt)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-center space-x-4 bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Thumbnail */}
                <img
                  src={image.enhancedImage}
                  alt={image.originalName}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{image.originalName}</p>
                  <p className="text-xs text-gray-400">{formatDate(image.createdAt)}</p>
<div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300 flex items-center gap-1">
                      <span className="w-3 h-3">
                        {renderIcon(image.enhancementType)}
                      </span>
                      {typeConfig[image.enhancementType]?.label || image.enhancementType}
                    </span>
                    {image.scaleFactor && image.enhancementType === "upscale" && (
                      <span className="px-2 py-0.5 bg-blue-500/20 rounded-full text-xs text-blue-400">
                        {image.scaleFactor}x
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image.enhancedImage, image.originalName);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(image._id);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full bg-gray-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Original</p>
                  <img
                    src={selectedImage.originalImage}
                    alt="Original"
                    className="w-full rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Enhanced</p>
                  <img
                    src={selectedImage.enhancedImage}
                    alt="Enhanced"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
<div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-white flex items-center gap-2">
                      <span className="w-4 h-4">
                        {renderIcon(selectedImage.enhancementType)}
                      </span>
                      {typeConfig[selectedImage.enhancementType]?.label || selectedImage.enhancementType}
                    </span>
                    <span className="text-gray-400 text-sm">{selectedImage.originalName}</span>
                    <span className="text-gray-500 text-sm">{formatDate(selectedImage.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        handleDownload(selectedImage.enhancedImage, selectedImage.originalName);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => {
                        onDelete(selectedImage._id);
                        setSelectedImage(null);
                      }}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

