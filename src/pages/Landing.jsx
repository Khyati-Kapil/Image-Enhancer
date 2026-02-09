
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Spotlight from "../components/Spotlight";
import HowItWorks from "../components/HowItWorks";
import FAQSection from "../components/FAQSection";
import cloudImage from "../assets/greycloud.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Spotlight />
      
      <img 
        src={cloudImage}
        alt="Cloud"
        className="absolute animate-float-slow pointer-events-none z-[10000]"
        style={{
          top: '120px',
          right: '80px',
          width: '240px',
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
      <img 
        src={cloudImage}
        alt="Cloud"
        className="absolute animate-float-slow pointer-events-none z-[10000]"
        style={{
          top: '80px',
          right: '180px',
          width: '240px',
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
      <img 
        src={cloudImage}
        alt="Cloud"
        className="absolute animate-float-slow pointer-events-none z-[10000]"
        style={{
          top: '150px',
          right: '350px',
          width: '240px',
          mixBlendMode: 'screen',
          opacity: 0.6,
        }}
      />
      
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <FAQSection />
      </div>
      
      <footer className="relative z-10 bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center border border-gray-700">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">Pixora</span>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Transform your images with AI-powered enhancement tools.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Home</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Pixora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

