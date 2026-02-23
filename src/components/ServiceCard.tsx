import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { cn } from '../lib/utils';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500"
    >
      <div style={{ transform: "translateZ(75px)" }} className="relative h-64 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 bg-luxury-black/80 backdrop-blur-md px-3 py-1 border border-white/10">
          <span className="text-gold text-xs font-bold tracking-widest uppercase">{service.category}</span>
        </div>
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-serif text-luxury-paper group-hover:text-gold transition-colors">
            {service.name}
          </h3>
          <div className="flex items-center text-gold font-bold">
            <IndianRupee size={14} />
            <span>{service.price.replace('₹', '')}</span>
          </div>
        </div>
        
        <p className="text-sm text-luxury-paper/50 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-luxury-paper/40">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-gold" />
            <span>{service.duration}</span>
          </div>
        </div>

        <button
          onClick={() => onBook(service)}
          className="w-full py-3 border border-white/10 group-hover:border-gold group-hover:bg-gold group-hover:text-luxury-black transition-all duration-300 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold"
        >
          Book Appointment
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
