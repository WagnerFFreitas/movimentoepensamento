import React from 'react';
import Carousel from '../components/Carousel';
import { MapPin } from 'lucide-react';

const Home = () => {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
      title: 'Unlock Mobility, Embrace Life!',
      description: 'Reclaim freedom of movement in Duque de Caxias! Our expert physiotherapy brings vitality back to your life. Start today!'
    }
  ];

  const testimonials = [
    {
      text: "Movimento e Pensamento is outstanding! Their team provided exceptional physiotherapy that greatly improved my mobility. The staff is compassionate and highly skilled. I am truly thankful for their support and recommend them to anyone seeking quality care in Duque de Caxias. Thank you so much!",
      author: "Ana"
    }
  ];

  return (
    <div className="bg-[#1E2A20]">
      {/* Hero Section */}
      <Carousel slides={heroSlides} />
      
      {/* Logo Section */}
      <section className="bg-[#1E2A20] py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-around items-center">
          <div className="text-white text-2xl font-bold">Logoipsum</div>
          <div className="text-white text-2xl font-bold">LOQO</div>
          <div className="text-white text-2xl font-bold">Logoipsum</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4">
        <h2 className="text-white text-2xl font-bold mb-8 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" 
              alt="Advanced Muscle Therapy" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Advanced Muscle Therapy</h3>
              <p className="text-sm">Discover our targeted methods to unlock muscle tension and restore natural movement.</p>
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=80" 
              alt="Post-Surgery Rehabilitation" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Post-Surgery Rehabilitation</h3>
              <p className="text-sm">Specialized rehabilitation care plans designed to support post-operative recovery.</p>
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80" 
              alt="Chronic Pain Management" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Chronic Pain Management</h3>
              <p className="text-sm">Proven treatments that help with specific pain conditions, bringing relief and mobility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 bg-[#1E2A20]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80"
              alt="About Us"
              className="w-full h-96 object-cover"
            />
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4">About us</h2>
              <p className="mb-6">
                At Movimento e Pensamento, we are dedicated to providing top-quality physiotherapy services. Our experienced team uses advanced techniques and personalized approaches to help you achieve your health goals, manage chronic conditions, and enhance overall performance.
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4">
        <h2 className="text-white text-2xl font-bold mb-8 text-center">More info</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="bg-[#2A3B2C] p-6 rounded-lg">
            <h3 className="text-white text-xl font-bold mb-4">Basic Physiotherapy Session</h3>
            <div className="text-green-500 text-3xl font-bold mb-4">$120</div>
            <p className="text-gray-300 mb-4">per session</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✓ General care</li>
              <li>✓ Initial assessment</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors">
              Book Now
            </button>
          </div>
          <div className="bg-[#2A3B2C] p-6 rounded-lg relative">
            <div className="absolute -top-3 right-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm">
              Popular
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Specialized Physiotherapy Session</h3>
            <div className="text-green-500 text-3xl font-bold mb-4">$220</div>
            <p className="text-gray-300 mb-4">per session</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✓ Targeted treatment</li>
              <li>✓ Progress tracking</li>
              <li>✓ Tailored exercises</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors">
              Book Now
            </button>
          </div>
          <div className="bg-[#2A3B2C] p-6 rounded-lg">
            <h3 className="text-white text-xl font-bold mb-4">Comprehensive Physiotherapy Plan</h3>
            <div className="text-green-500 text-3xl font-bold mb-4">$1800</div>
            <p className="text-gray-300 mb-4">per month</p>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>✓ Intensive rehab</li>
              <li>✓ Regular sessions</li>
            </ul>
            <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Carousel 
            slides={testimonials.map(t => ({
              image: '',
              title: t.text,
              description: `- ${t.author}`
            }))}
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-2xl font-bold mb-8">Reach Out Today</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="bg-[#2A3B2C] text-white p-3 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#2A3B2C] text-white p-3 rounded-lg"
            />
            <textarea
              placeholder="Message"
              className="bg-[#2A3B2C] text-white p-3 rounded-lg md:col-span-2"
              rows={4}
            ></textarea>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors md:col-span-2">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-2xl font-bold mb-8">Location</h2>
          <div className="bg-[#2A3B2C] p-4 rounded-lg">
            <div className="flex items-center text-white mb-4">
              <MapPin className="h-5 w-5 text-green-500 mr-2" />
              <p>Duque de Caxias, RJ, Brasil</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.356219020248!2d-43.3099!3d-22.7865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ3JzExLjQiUyA0M8KwMTgnMzUuNiJX!5e0!3m2!1sen!2sbr!4v1620000000000!5m2!1sen!2sbr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;