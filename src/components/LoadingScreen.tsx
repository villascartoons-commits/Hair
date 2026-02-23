import React from 'react';
import { motion } from 'motion/react';
import { Scissors } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-luxury-black flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center">
          <Scissors className="text-luxury-black w-10 h-10" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-4 border-2 border-dashed border-gold/30 rounded-full"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl font-serif gold-gradient tracking-widest uppercase">Sky</h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-luxury-paper/40 mt-2">Hairdressing</p>
      </motion.div>
    </motion.div>
  );
}
