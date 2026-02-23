import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';
import { SALON_DETAILS } from '../constants';

export default function Contact() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      value: SALON_DETAILS.phone,
      link: `tel:${SALON_DETAILS.phone}`,
      label: 'Direct Line'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: 'Quick Chat',
      link: `https://wa.me/${SALON_DETAILS.whatsapp}`,
      label: 'Instant Support'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Shrirampur, MH',
      link: SALON_DETAILS.googleMapsLink,
      label: 'Get Directions'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20 space-y-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold uppercase tracking-[0.4em] text-xs font-bold"
        >
          Get In Touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif"
        >
          Contact <span className="gold-gradient italic">Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-luxury-paper/60 max-w-2xl mx-auto font-light tracking-wide"
        >
          Have a question or want to book a special session? We're here to help you with all your grooming needs.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 hover:border-gold/50 transition-all group"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-luxury-black transition-all">
                <method.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-luxury-paper/40 font-bold">{method.label}</p>
                <h4 className="text-lg font-serif">{method.title}</h4>
                <p className="text-sm text-gold">{method.value}</p>
              </div>
            </motion.a>
          ))}

          {/* Opening Hours */}
          <div className="p-8 bg-gold text-luxury-black space-y-6">
            <div className="flex items-center gap-3">
              <Clock size={24} />
              <h4 className="text-xl font-serif font-bold">Opening Hours</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-luxury-black/10 pb-2">
                <span className="text-xs uppercase tracking-widest font-bold">Mon – Sun</span>
                <span className="text-sm font-bold">{SALON_DETAILS.hours}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Open 7 days a week for your convenience.</p>
            </div>
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="lg:col-span-2 space-y-12">
          {/* Map Placeholder */}
          <div className="aspect-video w-full bg-white/5 border border-white/10 relative overflow-hidden group">
            <iframe
              src={SALON_DETAILS.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salon Location"
            ></iframe>
            <div className="absolute inset-0 bg-luxury-black/20 pointer-events-none group-hover:opacity-0 transition-opacity" />
            <a 
              href={SALON_DETAILS.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 gold-button flex items-center gap-2"
            >
              Open in Maps <ExternalLink size={14} />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col md:flex-row items-center justify-between p-10 border border-white/10 gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-serif">Follow Us</h4>
              <p className="text-sm text-luxury-paper/40">Stay updated with our latest styles and offers.</p>
            </div>
            <div className="flex gap-6">
              {[
                { icon: Instagram, label: 'Instagram', link: SALON_DETAILS.instagram },
                { icon: Facebook, label: 'Facebook', link: '#' },
                { icon: Twitter, label: 'Twitter', link: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target={social.link.startsWith('http') ? '_blank' : undefined}
                  rel={social.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-all">
                    <social.icon size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-luxury-paper/40 group-hover:text-gold transition-colors">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
