import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What image formats does Pixora support?",
    answer: "Pixora supports all major image formats including JPEG, PNG, WebP, and TIFF. For the best results, we recommend using high-resolution images in JPEG or PNG format. Maximum file size is 25MB per image.",
  },
  {
    question: "How does AI image enhancement work?",
    answer: "Our AI uses advanced neural networks trained on millions of professional photos to analyze and enhance your images. It intelligently adjusts details, reduces noise, and sharpens edges while preserving the natural look of your photos.",
  },
  {
    question: "Can I enhance multiple images at once?",
    answer: "Yes! Pixora offers batch processing for logged-in users. You can upload up to 20 images at once and apply the same enhancement settings to all of them, saving you valuable time.",
  },
  {
    question: "How long does image enhancement take?",
    answer: "Most images are enhanced in just 3-5 seconds. Larger images or batch uploads may take a bit longer. You'll see a real-time progress indicator during the processing.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All images are processed in secure, isolated environments and are automatically deleted from our servers within 24 hours. We never use your images to train our AI models.",
  },
  {
    question: "Can I try Pixora for free?",
    answer: "Yes, Pixora offers a generous free tier with 10 enhanced images per month. No credit card required. For unlimited access, check out our premium plans.",
  },
  {
    question: "What's the difference between the enhancement options?",
    answer: "Smart Upscale increases resolution up to 4x, Denoise removes grain and noise, Sharpening enhances edges and details, Deblur fixes motion blur, and Color Correction optimizes colors and contrast automatically.",
  },
  {
    question: "Do I need to create an account?",
    answer: "You can try Pixora as a guest without creating an account. However, creating a free account gives you access to your image gallery, batch processing, and additional features.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
   
      <div className="absolute inset-0 grid-lines opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have questions? We've got answers. If you don't see your question here, feel free to contact us.
          </p>
        </motion.div>

      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
             
              <div
                className={`card cursor-pointer transition-all duration-300 ${
                  openIndex === index
                    ? "bg-white/5 border-white/20"
                    : "bg-transparent border-white/5 hover:border-white/10"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`text-lg font-medium transition-colors duration-300 ${
                      openIndex === index ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <motion.div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-white text-black rotate-180"
                        : "bg-white/10 text-white"
                    }`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </div>

               
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

             
              {index < faqs.length - 1 && (
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
};

export default FAQSection;

