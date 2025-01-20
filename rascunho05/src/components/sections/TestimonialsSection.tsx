import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#222222]">
      <div className="container mx-auto px-4">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            <CarouselItem>
              <div className="text-center px-12">
                <p className="text-xl mb-6">
                  "Movimento e Pensamento is outstanding! Their team provided exceptional physiotherapy that greatly improved my mobility. The staff is compassionate and highly skilled. I am truly thankful for their support and recommend them to anyone seeking quality care in Duque de Caxias. Thank you so much!"
                </p>
                <p className="font-semibold">- Ana</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;