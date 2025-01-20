import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    title: "Basic Physiotherapy Session",
    price: "120",
    period: "per session",
    image: "/lovable-uploads/885c68f0-8917-4302-83e1-0ee2aa9c4065.png"
  },
  {
    title: "Specialized Physiotherapy Session",
    price: "220",
    period: "per session",
    popular: true,
    image: "/lovable-uploads/885c68f0-8917-4302-83e1-0ee2aa9c4065.png"
  },
  {
    title: "Comprehensive Physiotherapy Plan",
    price: "1800",
    period: "per month",
    image: "/lovable-uploads/885c68f0-8917-4302-83e1-0ee2aa9c4065.png"
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">More info</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="bg-[#222222] border-none p-6 relative">
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              )}
              <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>
              <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]">
                Select Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;