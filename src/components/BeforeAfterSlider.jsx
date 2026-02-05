import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Original", afterLabel = "Enhanced" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700"
    >
     
      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[500px] cursor-ew-resize select-none"
        onTouchMove={handleTouchMove}
      >
       
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-contain blur-[1px]"
        />

        
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

       
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-600 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 rounded-full text-white text-sm font-medium">
          {afterLabel}
        </div>
      </div>

      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm">Drag the slider to compare</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-500">
              Position: <span className="text-white font-medium">{sliderPosition.toFixed(0)}%</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BeforeAfterSlider;

