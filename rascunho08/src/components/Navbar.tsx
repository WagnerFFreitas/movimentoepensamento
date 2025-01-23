import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-[#1E2A20] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Movimento e Pensamento
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-green-500">INÍCIO</Link>
            <Link to="/services" className="hover:text-green-500">SERVIÇOS</Link>
            <Link to="/about" className="hover:text-green-500">SOBRE</Link>
            <Link to="/contact" className="hover:text-green-500">CONTATO</Link>
            <Link 
              to="/register" 
              className="bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              AGENDAMENTO/CADASTRO/LOGIN
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#2A3B2C]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 hover:text-green-500">INÍCIO</Link>
            <Link to="/services" className="block px-3 py-2 hover:text-green-500">SERVIÇOS</Link>
            <Link to="/about" className="block px-3 py-2 hover:text-green-500">SOBRE</Link>
            <Link to="/contact" className="block px-3 py-2 hover:text-green-500">CONTATO</Link>
            <Link to="/register" className="block px-3 py-2 hover:text-green-500">AGENDAMENTO/CADASTRO/LOGIN</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;