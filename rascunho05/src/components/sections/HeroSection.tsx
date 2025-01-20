import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/d06472cf-259d-48e0-9666-dd7ba11024f7.png" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-6xl font-bold mb-6">Unlock Mobility, Embrace Life!</h1>
        <p className="text-xl mb-8">
          Reclaim freedom of movement in Duque de Caxias! Our expert physiotherapy brings vitality back to your life. Start today!
        </p>
        <Button className="w-fit bg-primary hover:bg-primary-hover">
          Get Started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;