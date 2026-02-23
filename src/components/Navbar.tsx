import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Scissors } from 'lucide-react';
import { cn } from '../lib/utils';
import { SALON_DETAILS } from '../constants';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'bg-luxury-black/90 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <Scissors className="text-luxury-black w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-tight tracking-wider uppercase gold-gradient font-bold">
              Sky
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 -mt-1">
              Hairdressing
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-xs uppercase tracking-widest transition-colors hover:text-gold',
                location.pathname === link.path ? 'text-gold' : 'text-luxury-paper/70'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/services" className="gold-button !py-2 !px-6">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-luxury-paper p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-luxury-black border-b border-white/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-lg font-serif tracking-widest transition-colors',
                    location.pathname === link.path ? 'text-gold' : 'text-luxury-paper/70'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/services" className="gold-button text-center">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
