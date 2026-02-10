import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeforeAfterSlider from "./BeforeAfterSlider";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 checkered-bg">
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/30" />
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">Enhance Your Images</span>
            <br />
            <span className="text-gradient">With Neural Magic</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed"
          >
            Transform low-resolution images into high-fidelity visuals using our 
            AI-powered enhancement. Professional-grade processing in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Link to="/dashboard" className="btn-primary flex items-center space-x-2 hover-scale" style={{ borderRadius: 0 }}>
              <span>Start Enhancing</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link to="/compress" className="btn-secondary flex items-center space-x-2 hover-scale" style={{ borderRadius: 0 }}>
              <span>Compress Image</span>
            </Link>
            <Link to="/signup" className="btn-secondary flex items-center space-x-2 hover-scale" style={{ borderRadius: 0 }}>
              <span>Create Account</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block pr-6"
        >
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=10"
            afterImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80"
            beforeLabel="Blur"
            afterLabel="Clear"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

