import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Award, Users, Heart, MapPin } from 'lucide-react';
import { SALON_DETAILS } from '../constants';

export default function About() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold uppercase tracking-[0.4em] text-xs font-bold"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif leading-tight"
            >
              The Art of <br />
              <span className="gold-gradient italic">Grooming</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-luxury-paper/60 text-lg font-light leading-relaxed"
            >
              Established in 2020, Sky Hairdressing was born out of a passion for excellence and a vision to bring premium grooming standards to Shrirampur.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-luxury-paper/60 text-lg font-light leading-relaxed"
            >
              Located conveniently near Swayamwar Mangal Karyalay on Canal Road, we have become the preferred destination for those who value quality, precision, and a touch of luxury in their daily grooming routine.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=800"
                alt="Salon Ambiance"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 -z-10 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white/5 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-serif">Our Core Values</h2>
            <p className="text-luxury-paper/40 uppercase tracking-widest text-xs">What makes us different</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Scissors, title: 'Precision', desc: 'Every cut is executed with meticulous attention to detail.' },
              { icon: Award, title: 'Quality', desc: 'We use only the finest premium products for your hair and skin.' },
              { icon: Users, title: 'Expertise', desc: 'Our stylists are trained in the latest global trends and techniques.' },
              { icon: Heart, title: 'Care', desc: 'Your comfort and satisfaction are our top priorities.' }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                  <v.icon size={28} />
                </div>
                <h4 className="text-xl font-serif">{v.title}</h4>
                <p className="text-sm text-luxury-paper/50 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Highlight */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif">Visit Our Sanctuary</h2>
            <p className="text-luxury-paper/60 font-light leading-relaxed">
              Our salon is designed to be a peaceful retreat from the bustle of the city. Every element, from the lighting to the seating, is chosen to enhance your comfort.
            </p>
            <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10">
              <MapPin className="text-gold shrink-0" size={24} />
              <div>
                <h5 className="font-bold uppercase tracking-widest text-xs mb-2">Location</h5>
                <p className="text-sm text-luxury-paper/60">{SALON_DETAILS.address}</p>
              </div>
            </div>
          </div>
          <div className="aspect-video overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=800"
              alt="Salon Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
