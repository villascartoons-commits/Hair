import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { SALON_DETAILS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
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
          <p className="text-sm text-luxury-paper/50 leading-relaxed">
            Experience the pinnacle of grooming and beauty at Shrirampur's most premium salon. We define style with precision and care.
          </p>
          <div className="flex gap-4">
            <a href={SALON_DETAILS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-luxury-black transition-all">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-serif text-lg mb-6 tracking-wider">Quick Links</h4>
          <ul className="space-y-4 text-sm text-luxury-paper/60">
            <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-gold font-serif text-lg mb-6 tracking-wider">Contact Us</h4>
          <ul className="space-y-4 text-sm text-luxury-paper/60">
            <li className="flex gap-3">
              <MapPin size={18} className="text-gold shrink-0" />
              <span>{SALON_DETAILS.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span>{SALON_DETAILS.phone}</span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="text-gold shrink-0" />
              <span>Open Daily: {SALON_DETAILS.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-luxury-paper/30">
        <p>© 2024 <Link to="/login" className="hover:text-gold/50 transition-colors">Sky Hairdressing</Link>. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
