import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img 
          src="/lovable-uploads/fd04c9cb-ee98-4f45-9eda-f5e8110f6442.png" 
          alt="About" 
          className="rounded-lg"
        />
        <div>
          <h2 className="text-4xl font-bold mb-6">About us</h2>
          <p className="text-gray-300 mb-6">
            At Movimento e Pensamento, we are dedicated to providing top-quality physiotherapy services aimed at improving your overall wellbeing. Our experienced professionals specialize in personalized treatment designed to enhance your physical performance.
          </p>
          <p className="text-gray-300 mb-8">
            Our clinic offers a supportive and welcoming environment where every patient receives individualized care. Utilizing state-of-the-art techniques and equipment, we are committed to helping you achieve a healthier, more active lifestyle.
          </p>
          <Button className="bg-[#9b87f5] hover:bg-[#7E69AB]">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;