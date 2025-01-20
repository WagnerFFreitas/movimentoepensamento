const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/lovable-uploads/dba0cdb2-b3c9-4cf2-8888-712745f22418.png"
              alt="Physiotherapy Session"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-primary mb-6">About us</h2>
            <p className="text-gray-600 mb-6">
              At Movimento e Pensamento, we are dedicated to providing top-quality physiotherapy services aimed at improving your overall wellbeing. Our experienced professionals specialize in personalized treatments designed to enhance your physical performance.
            </p>
            <p className="text-gray-600 mb-8">
              Our clinic offers a supportive and welcoming environment where every patient receives individualized care. Utilizing state-of-the-art techniques and equipment, we are committed to helping you achieve a healthier, more active lifestyle.
            </p>
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;