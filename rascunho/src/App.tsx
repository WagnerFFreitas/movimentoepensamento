import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Square } from 'lucide-react';

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "Movimento e Pensamento is outstanding! Their team provided exceptional physiotherapy that greatly improved my mobility. The staff is compassionate and highly skilled. I am truly thankful for their support and recommend them to anyone seeking quality care in Duque de Caxias. Thank you so much!",
      author: "Ana"
    },
    // Add more testimonials as needed
  ];

  const services = [
    {
      title: "Basic Physiotherapy Session",
      price: "120",
      period: "per session",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
      buttonText: "Book Basic Session"
    },
    {
      title: "Specialized Physiotherapy Session",
      price: "220",
      period: "per session",
      image: "https://images.unsplash.com/photo-1599497992816-c7e8f0d1c0f5?auto=format&fit=crop&q=80",
      buttonText: "Book Specialized Session",
      popular: true
    },
    {
      title: "Comprehensive Physiotherapy Plan",
      price: "1800",
      period: "per month",
      image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?auto=format&fit=crop&q=80",
      buttonText: "Start Complete Plan"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a2421] text-white">
      {/* Header */}
      <header className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Square className="w-8 h-8" />
          <span className="text-xl font-bold">Movimento e Pensamento</span>
        </div>
      </header>

      {/* Location Section */}
      <section className="relative h-[400px] bg-[#1a2421] mb-20">
        <div className="container mx-auto px-4 py-16">
          <div className="absolute right-0 top-0 bg-[#1a2421]/80 p-8 max-w-md">
            <h2 className="text-4xl font-bold mb-4">Location</h2>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-400" />
              <p className="text-xl">Duque de Caxias, RJ, Brasil</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-[#1a2421] p-8 rounded-lg border border-gray-800">
          <h2 className="text-3xl font-bold mb-4">Reach Out Today</h2>
          <p className="mb-8 text-gray-300">
            Use the contact form to connect with us. We're eager to assist you and answer any questions you may have.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="bg-[#2a342f] p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-[#2a342f] p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full bg-[#2a342f] p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#1a2421] py-16">
        <div className="container mx-auto px-4">
          <div className="relative">
            <button
              onClick={() => setCurrentTestimonial(prev => prev > 0 ? prev - 1 : testimonials.length - 1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="max-w-3xl mx-auto text-center px-12">
              <p className="text-2xl mb-8">{testimonials[currentTestimonial].text}</p>
              <p className="text-xl">- {testimonials[currentTestimonial].author}</p>
            </div>
            <button
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-800 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">More info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-[#2a342f] rounded-lg overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  {service.popular && (
                    <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${service.price}</span>
                    <span className="text-gray-400 ml-2">{service.period}</span>
                  </div>
                  <button className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors">
                    {service.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2421] border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Made with Durable © {new Date().getFullYear()} Movimento e Pensamento. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;