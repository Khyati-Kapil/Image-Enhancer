import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 checkered-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
       
        <div className="max-w-2xl animate-fade-in">
         
        
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in stagger-2">
            <span className="text-white">
              Enhance Your Images
            </span>
            <br />
            <span className="text-gradient">
              With Neural Magic
            </span>
          </h1>

         
         
          <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed animate-fade-in stagger-3">
            Transform low-resolution images into high-fidelity visuals using our 
            AI-powered enhancement. Professional-grade processing in seconds.
            Adjust according to your own preference till you get your desired Image!
          </p>

          

         
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16 animate-fade-in stagger-4">
            <Link
              to="/dashboard"
              className="btn-primary flex items-center space-x-2 hover-scale"
              style={{ borderRadius: 0 }}
            >
              <span>Start Enhancing</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/signup"
              className="btn-secondary flex items-center space-x-2 hover-scale"
              style={{ borderRadius: 0 }}
            >
              <span>Create Account</span>
            </Link>
          </div>

      
          
        </div>
      </div>

    
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="w-80 h-80 border border-gray-800 flex items-center justify-center relative card glow-subtle">
          <div className="absolute inset-2 border border-gray-700" />
          <div className="w-48 h-48 border border-gray-600 flex items-center justify-center bg-black/50 hover-scale transition-transform">
            <div className="text-center">
       
              <div className="text-sm text-gray-500 tracking-widest">ENHANCE YOUR GALLERY</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;

