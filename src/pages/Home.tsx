import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Scissors, Star, ArrowRight, Phone, MapPin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, SALON_DETAILS } from '../constants';
import { ServiceCard } from '../components/ServiceCard';
import BookingModal from '../components/BookingModal';
import { Service } from '../types';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Video 3D Tilt
  const videoX = useMotionValue(0);
  const videoY = useMotionValue(0);
  const videoRotateX = useTransform(useSpring(videoY, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["15deg", "-15deg"]);
  const videoRotateY = useTransform(useSpring(videoX, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleVideoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    videoX.set((e.clientX - rect.left) / rect.width - 0.5);
    videoY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleBook = (service?: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1920"
            alt="Salon Interior"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black" />
          
          {/* Floating 3D Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-10 w-32 h-32 border border-gold/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-10 w-48 h-48 border border-gold/10 rounded-full blur-2xl"
          />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <div className="h-[1px] w-12 bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold">Est. 2020</span>
            <div className="h-[1px] w-12 bg-gold" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
              rotateX: 0 
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 0.8, delay: 0.2 }
            }}
            className="text-6xl md:text-8xl font-serif leading-tight"
          >
            Style That <br />
            <span className="gold-gradient italic">Defines You</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-luxury-paper/60 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide"
          >
            Experience premium hair & grooming excellence in the heart of Shrirampur. Where tradition meets modern luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <button onClick={() => handleBook()} className="gold-button group">
              Book Appointment
              <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link to="/services" className="outline-button">
              View Services
            </Link>
          </motion.div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-12 flex items-center justify-center gap-4"
          >
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest text-luxury-paper/40">
              ⭐ 5.0 (2 Reviews)
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gold" />
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-serif">Premium Services</h2>
          </div>
          <Link to="/services" className="text-gold uppercase tracking-widest text-xs font-bold flex items-center gap-2 hover:gap-4 transition-all border-b border-gold/30 pb-2">
            Explore All Services <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.slice(0, 3).map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onBook={(s) => handleBook(s)}
            />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-32 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onMouseMove={handleVideoMove}
            onMouseLeave={() => { videoX.set(0); videoY.set(0); }}
            style={{
              rotateX: videoRotateX,
              rotateY: videoRotateY,
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
            className="relative"
          >
            <div style={{ transform: "translateZ(100px)" }} className="aspect-[4/5] overflow-hidden border border-white/10 relative">
              <video
                src="https://res.cloudinary.com/dyglyixlk/video/upload/v1771702993/SaveVid.Net_AQOokP3XtRVl_kCcIcFjLXDhu0OXqoCE3ckKXF6ShnfaFN8VZbNnibjdftQrwNk2EgERCDnv_z88yCoy8a2snfDs_1_toyza1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Since 2020</span>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Crafting Excellence <br />
              <span className="italic opacity-60">In Every Cut</span>
            </h2>
            <p className="text-luxury-paper/60 leading-relaxed font-light text-lg">
              Located near Swayamwar Mangal Karyalay, our salon has been the cornerstone of style in Shrirampur. We believe that a haircut is more than just a service—it's an experience that defines your personality.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-3xl font-serif text-gold mb-1">5.0</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Google Rating</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold mb-1">10+</h4>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Expert Stylists</p>
              </div>
            </div>
            <Link to="/about" className="gold-button inline-block">
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Client Stories</span>
          <h2 className="text-4xl md:text-5xl font-serif">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 bg-white/5 border border-white/10 relative"
            >
              <div className="flex text-gold mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-xl font-serif italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold tracking-widest uppercase text-xs">{t.name}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-30">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=1920"
            alt="CTA Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-luxury-black/80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            Ready to Transform <br />
            <span className="gold-gradient italic">Your Look?</span>
          </h2>
          <p className="text-luxury-paper/60 text-lg font-light">
            Book your appointment today and experience the luxury you deserve.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button onClick={() => handleBook()} className="gold-button">
              Book Now
            </button>
            <a href={`tel:${SALON_DETAILS.phone}`} className="flex items-center gap-3 text-gold uppercase tracking-widest text-xs font-bold hover:opacity-80 transition-opacity">
              <Phone size={18} /> Call {SALON_DETAILS.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-serif">Follow Our Journey</h2>
          <a href={SALON_DETAILS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold text-sm uppercase tracking-widest font-bold">
            <Instagram size={18} /> @sky_hairdressing
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
            'https://i.ibb.co/bR8D3g4S/Screenshot-2026-02-21-230435.png',
            'https://i.ibb.co/sdrMmfKX/Screenshot-2026-02-21-230346.png'
          ].map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                z: 50
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="aspect-square overflow-hidden border border-white/10 shadow-xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src={url} alt="Gallery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </section>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        selectedService={selectedService}
      />
    </div>
  );
}
