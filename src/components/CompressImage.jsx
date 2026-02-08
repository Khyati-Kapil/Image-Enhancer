import { useState, useRef, useEffect } from "react";
import { Icons } from "./Icons";
import { imageService } from "../services/image";
import { useAuth } from "../context/AuthContext";

const CompressImage = () => {
  const { user } = useAuth();
  const [uploadImage, setUploadImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("jpeg");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressionStats, setCompressionStats] = useState(null);
  const fileInputRef = useRef(null);
  const currentFileRef = useRef(null);

  const compressImage = (file, qualityValue, outputFormat) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          
          let mimeType = "image/jpeg";
          if (outputFormat === "png") {
            mimeType = "image/png";
          } else if (outputFormat === "webp") {
            mimeType = "image/webp";
          }
          
          const compressedDataUrl = canvas.toDataURL(mimeType, qualityValue / 100);
          
          const base64Length = compressedDataUrl.split(",")[1].length;
          const sizeInBytes = Math.round((base64Length * 3) / 4);
          
          resolve({
            dataUrl: compressedDataUrl,
            size: sizeInBytes,
          });
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleCompress = async (file) => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await compressImage(file, quality, format);
      setCompressedImage(result.dataUrl);
      
      const savings = ((originalSize - result.size) / originalSize * 100).toFixed(1);
      setCompressionStats({
        originalSize: formatFileSize(originalSize),
        compressedSize: formatFileSize(result.size),
        savings: savings,
        originalBytes: originalSize,
        compressedBytes: result.size,
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Compression error:", error);
      setLoading(false);
      alert("Error compressing image. Please try again.");
    }
  };

  useEffect(() => {
    if (uploadImage && originalSize > 0 && currentFileRef.current) {
      handleCompress(currentFileRef.current);
    }
  }, [quality, format]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    currentFileRef.current = file;

  
    if (!file.type.match(/image\/jpeg/)) {
      alert("Please upload a JPEG image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadImage(imageUrl);
    setOriginalSize(file.size);
    setCompressedImage(null);
    setCompressionStats(null);
    setLoading(true);

    try {
      const result = await compressImage(file, quality, format);
      setCompressedImage(result.dataUrl);
      
      const savings = ((file.size - result.size) / file.size * 100).toFixed(1);
      setCompressionStats({
        originalSize: formatFileSize(file.size),
        compressedSize: formatFileSize(result.size),
        savings: savings,
        originalBytes: file.size,
        compressedBytes: result.size,
      });
      

      if (user) {
        try {
          await imageService.saveEnhancedImage(
            imageUrl,
            result.dataUrl,
            "compress",
            file.name,
            file.size
          );
          console.log("Compressed image saved to gallery");
        } catch (saveError) {
          console.log("Could not save to gallery:", saveError.message);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Compression error:", error);
      setLoading(false);
      alert("Error compressing image. Please try again.");
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = `compressed-image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setUploadImage(null);
    setCompressedImage(null);
    setCompressionStats(null);
    setOriginalSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="pt-8 px-4 pb-12">

        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Image Compressor
          </h1>
          <p className="text-gray-400">
            Reduce image file size while maintaining quality
          </p>
        </div>

        {/* Upload Section */}
        {!uploadImage && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div 
              className="card cursor-pointer hover-scale"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-900 border border-gray-700 flex items-center justify-center mb-4">
                  <Icons.Compress className="w-8 h-8 text-white" />
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
                <p className="text-gray-600 text-sm mt-4">
                  Supports JPEG (max 10MB)
                </p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg"
              className="hidden"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Icons.Quality, title: "Quality Control", desc: "Adjust compression level" },
                { icon: Icons.Format, title: "Format Support", desc: "JPEG, PNG, WebP" },
                { icon: Icons.FileSize, title: "Size Reduction", desc: "Reduce up to 80%" },
                { icon: Icons.FastProcessing, title: "Fast Processing", desc: "Instant results" },
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
                  Compressing Your Image
                </h3>
                <p className="text-gray-500">
                  This may take a few seconds...
                </p>
              </div>
            </div>
          </div>
        )}

      
        {uploadImage && compressedImage && !loading && (
          <div className="max-w-7xl mx-auto animate-fade-in">
          
            <div className="card mb-6">
              <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                <h3 className="text-white font-medium">Compression Settings</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                  {format === "jpeg" && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icons.Quality className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-400 text-sm">Quality: {quality}%</span>
                        </div>
                        <span className="text-white text-sm">{quality}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-white"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>
                  )}

                
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icons.Format className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400 text-sm">Output Format</span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { value: "jpeg", label: "JPEG" },
                      ].map((fmt) => (
                        <button
                          key={fmt.value}
                          onClick={() => setFormat(fmt.value)}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            format === fmt.value
                              ? "bg-white text-black"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                          style={{ borderRadius: 0 }}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

         
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
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
                <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    Size: <span className="text-white">{compressionStats?.originalSize}</span>
                  </p>
                </div>
              </div>

       
              <div className="card overflow-hidden">
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                  <h3 className="text-white font-medium">Compressed</h3>
                  <span className="bg-green-900/50 text-green-400 text-xs px-2 py-1 rounded">
                    {compressionStats?.savings}% saved
                  </span>
                </div>
                <div className="aspect-video flex items-center justify-center bg-gray-900 p-4">
                  <img 
                    src={compressedImage} 
                    alt="Compressed" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    Size: <span className="text-white">{compressionStats?.compressedSize}</span>
                  </p>
                </div>
              </div>
            </div>


            <div className="card mb-6">
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-1">Original Size</p>
                    <p className="text-2xl font-bold text-white">{compressionStats?.originalSize}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-1">Compressed Size</p>
                    <p className="text-2xl font-bold text-green-400">{compressionStats?.compressedSize}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-sm mb-1">You Saved</p>
                    <p className="text-2xl font-bold text-blue-400">{compressionStats?.savings}%</p>
                  </div>
                </div>
                
             
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Original</span>
                    <span>Compressed</span>
                  </div>
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-gray-500 transition-all duration-300"
                      style={{ width: "100%" }}
                    />
                    <div 
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${(compressionStats?.compressedBytes / compressionStats?.originalBytes) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="btn-primary flex items-center justify-center gap-2 hover-scale"
                style={{ borderRadius: 0 }}
              >
                <Icons.Download />
                <span>Download Compressed Image</span>
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary flex items-center justify-center gap-2 hover-scale"
                style={{ borderRadius: 0 }}
              >
                <span>Compress Another Image</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompressImage;

