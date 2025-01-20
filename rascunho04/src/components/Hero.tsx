const Hero = () => {
  return (
    <div id="home" className="relative bg-primary min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/1dc4bc28-6002-4d94-8184-7686a5a12999.png')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unlock Mobility, Embrace Life!
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Reclaim freedom of movement in Duque de Caxias! Our expert physiotherapy brings vitality back to your life. Start today!
          </p>
          <a
            href="#contact"
            className="bg-accent text-primary font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Schedule Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;