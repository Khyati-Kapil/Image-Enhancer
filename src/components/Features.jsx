
import { motion } from "framer-motion";
import { Icons } from "./Icons";

const features = [
  {
    icon: Icons.Upscale,
    title: "Smart Upscaling",
    description: "Increase image resolution up to 4x using advanced AI algorithms while preserving quality.",
  },
  {
    icon: Icons.Sharpen,
    title: "Sharpening",
    description: "Enhance image details and edges for a crisper, more defined look.",
  },
  {
    icon: Icons.Deblur,
    title: "Deblur",
    description: "Fix blurry images caused by camera shake or motion blur.",
  },
  {
    icon: Icons.ColorCorrection,
    title: "Color Correction",
    description: "Automatically adjust colors and contrast for perfect-looking photos.",
  },
  {
    icon: Icons.Compress,
    title: "Image Compression",
    description: "Reduce file size by up to 80% while maintaining quality. Optimized JPEG compression.",
  },
  {
    icon: Icons.FastProcessing,
    title: "Fast Processing",
    description: "Get your enhanced or compressed images in seconds with our optimized AI pipeline.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enhancement Tools
          </h2>
          <p className="text-gray-400 max-w-xl">
            Select from our suite of AI-powered enhancement options to transform your images.
          </p>
        </motion.div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover-scale cursor-pointer"
            >
             
              <div className="w-12 h-12 bg-gray-900 border border-gray-700 flex items-center justify-center text-white mb-4 transition-colors group-hover:bg-white group-hover:text-black">
                <feature.icon />
              </div>

            
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="card glow-subtle">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to transform your images?
                </h3>
                <p className="text-gray-500">
                  Join thousands of users who have enhanced millions of images with our AI technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/dashboard"
                  className="btn-primary text-center hover-scale"
                  style={{ borderRadius: 0 }}
                >
                  Get Started
                </a>
                <a
                  href="/login"
                  className="btn-secondary text-center hover-scale"
                  style={{ borderRadius: 0 }}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

