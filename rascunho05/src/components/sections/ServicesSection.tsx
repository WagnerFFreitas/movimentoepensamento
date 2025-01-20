import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const services = [
  {
    title: "Experience targeted treatment",
    description: "Experience targeted treatment for muscle tension and discomfort, tailored to promote optimal recovery.",
    image: "/lovable-uploads/920e2be1-9f00-4e28-aac5-b4acd15549c2.png"
  },
  {
    title: "Accelerate your healing",
    description: "Accelerate your healing journey with personalized care plans designed to support post-operative recovery.",
    image: "/lovable-uploads/fe10afbc-60c8-4491-b9d4-6d222ef56229.png"
  },
  {
    title: "Alleviate persistent pain",
    description: "Alleviate persistent pain with specialized therapies aimed at enhancing life quality and mobility.",
    image: "/lovable-uploads/65bfe885-a3b6-4621-8fb5-ffff7fb052d6.png"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">Services</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-[#222222] border-none p-6">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ServicesSection;