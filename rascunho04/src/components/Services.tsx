import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Basic Physiotherapy Session",
      price: "$120",
      period: "per session",
      description: "Experience targeted treatment for muscle tension and discomfort, tailored to promote optimal recovery.",
      image: "/lovable-uploads/bcd5de1c-3e87-4ab9-82de-f22429edca91.png"
    },
    {
      title: "Specialized Physiotherapy Session",
      price: "$220",
      period: "per session",
      description: "Accelerate your healing journey with personalized care plans designed to support post-operative recovery.",
      popular: true,
      image: "/lovable-uploads/17dd4557-cfad-4b28-9c82-c139a7b04017.png"
    },
    {
      title: "Comprehensive Physiotherapy Plan",
      price: "$1800",
      period: "per month",
      description: "Alleviate persistent pain with specialized therapies aimed at enhancing life quality and mobility.",
      image: "/lovable-uploads/0b6f9fc6-df43-4a2e-ac24-0f425bad24c2.png"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="relative">
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-accent text-primary">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <div className="h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{service.price}</div>
                <div className="text-sm text-gray-500">{service.period}</div>
              </CardContent>
              <CardFooter>
                <a
                  href="#contact"
                  className="w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Book Now
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;