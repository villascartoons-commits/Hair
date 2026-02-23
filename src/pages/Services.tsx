import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ServiceCard } from '../components/ServiceCard';
import BookingModal from '../components/BookingModal';
import { Service } from '../types';

export default function Services() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'hair', 'grooming', 'styling', 'spa'];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  const handleBook = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20 space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold uppercase tracking-[0.4em] text-xs font-bold"
        >
          Our Menu
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif"
        >
          Premium <span className="gold-gradient italic">Services</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-luxury-paper/60 max-w-2xl mx-auto font-light tracking-wide"
        >
          Discover our range of professional grooming and beauty treatments designed to make you look and feel your absolute best.
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-gold text-luxury-black border-gold' 
                : 'border-white/10 text-luxury-paper/50 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            index={index} 
            onBook={(s) => handleBook(s)}
          />
        ))}
      </div>

      {/* Custom Request */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 p-12 bg-white/5 border border-white/10 text-center space-y-6"
      >
        <h2 className="text-3xl font-serif">Looking for something specific?</h2>
        <p className="text-luxury-paper/60 max-w-xl mx-auto font-light">
          We offer customized packages for weddings, group bookings, and special events. Contact us to discuss your requirements.
        </p>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="outline-button"
        >
          Inquire Now
        </button>
      </motion.div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedService={selectedService}
      />
    </div>
  );
}
