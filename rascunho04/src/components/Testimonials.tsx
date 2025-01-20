import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    text: "Movimento e Pensamento is outstanding! Their team provided exceptional physiotherapy that greatly improved my mobility. The staff is compassionate and highly skilled. I am truly thankful for their support and recommend them to anyone seeking quality care in Duque de Caxias. Thank you so much!",
    author: "Ana"
  },
  {
    text: "The personalized attention and professional care I received here was exceptional. My recovery progress exceeded my expectations.",
    author: "Carlos"
  },
  {
    text: "A truly transformative experience. The therapists are knowledgeable and caring, making each session both effective and comfortable.",
    author: "Maria"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <div className="text-center px-12">
            <p className="text-white text-xl md:text-2xl mb-8">
              "{testimonials[currentIndex].text}"
            </p>
            <p className="text-accent font-semibold">
              - {testimonials[currentIndex].author}
            </p>
          </div>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-white opacity-50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;