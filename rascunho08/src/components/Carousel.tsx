import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  slides: {
    image: string;
    title: string;
    description: string;
  }[];
  autoplay?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ slides, autoplay = true }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      className="w-full h-[500px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {slide.image ? (
            <div 
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl max-w-2xl text-center">{slide.description}</p>
                {index === 0 && (
                  <button className="mt-8 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors">
                    Get Moving!
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-[#2A3B2C] flex flex-col justify-center items-center text-white p-8">
              <p className="text-xl max-w-2xl text-center italic mb-4">{slide.title}</p>
              <p className="text-lg">{slide.description}</p>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;