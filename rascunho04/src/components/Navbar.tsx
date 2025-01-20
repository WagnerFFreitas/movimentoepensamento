import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-primary z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">Movimento e Pensamento</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#services" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Services</a>
              <a href="#about" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#services" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Services</a>
            <a href="#about" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#contact" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;