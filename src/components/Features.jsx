
const Icons = {
  Upscale: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
    </svg>
  ),
  Denoise: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Sharpen: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  Deblur: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  ColorCorrection: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  FastProcessing: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const features = [
  {
    icon: Icons.Upscale,
    title: "Smart Upscaling",
    description: "Increase image resolution up to 4x using advanced AI algorithms while preserving quality.",
  },
  {
    icon: Icons.Denoise,
    title: "Denoise",
    description: "Remove noise and grain from your photos to get crystal clear images.",
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
    icon: Icons.FastProcessing,
    title: "Fast Processing",
    description: "Get your enhanced images in seconds with our optimized AI pipeline.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Enhancement Tools
          </h2>
          <p className="text-gray-400 max-w-xl">
            Select from our suite of AI-powered enhancement options to transform your images.
          </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover-scale cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
             
              <div className="w-12 h-12 bg-gray-900 border border-gray-700 flex items-center justify-center text-white mb-4 transition-colors group-hover:bg-white group-hover:text-black">
                <feature.icon />
              </div>

            
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

       
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
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
        </div>
      </div>
    </section>
  );
};

export default Features;

