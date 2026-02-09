import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Upload Your Image",
    description: "Simply drag and drop or select any image you want to enhance. We support all popular formats.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Choose Enhancement",
    description: "Select from our AI-powered tools: upscale, denoise, sharpen, deblur, or color correct.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "AI Processing",
    description: "Our advanced neural networks analyze and enhance your image in seconds with precision.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Download Result",
    description: "Preview the enhanced result and download it in high quality. No watermarks, just pure quality.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">

      <div className="absolute inset-0 grid-lines opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Transform your images in just four simple steps with our AI-powered platform.
          </p>
        </motion.div>

    
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
     
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => setActiveStep(index)}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white/5 border border-white/20"
                    : "bg-transparent border border-transparent hover:bg-white/5"
                }`}
              >
  
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 ${
                    activeStep === index ? "bg-white" : "bg-transparent"
                  }`}
                />

                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === index
                        ? "bg-white text-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <span className="text-sm font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                        activeStep === index ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm transition-all duration-300 ${
                        activeStep === index
                          ? "text-gray-300 max-h-20"
                          : "text-gray-500 max-h-0 overflow-hidden"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        
          <div className="relative">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden"
            >

              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-gradient-conic from-white/10 via-transparent to-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ borderRadius: "inherit" }}
                />
              </div>


              <div className="relative z-10 flex flex-col items-center text-center p-8">
                <motion.div
                  className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-white w-16 h-16 flex items-center justify-center">
                    {steps[activeStep].icon}
                  </span>
                </motion.div>

                <motion.div
                  key={`title-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-gray-400 max-w-sm">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              </div>

              <motion.div
                className="absolute top-4 right-4 w-20 h-20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="5 5"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16"
                animate={{
                  rotate: [-360, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <rect
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    rx="10"
                  />
                </svg>
              </motion.div>
            </motion.div>

            <div className="flex justify-center gap-3 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "bg-white w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

