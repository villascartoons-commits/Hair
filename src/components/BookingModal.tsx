import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Phone, FileText, CheckCircle2 } from 'lucide-react';
import { Service, Booking } from '../types';
import { SERVICES } from '../constants';
import { cn } from '../lib/utils';
import { format, addDays, isBefore, startOfDay } from 'date-fns';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service;
}

export default function BookingModal({ isOpen, onClose, selectedService }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00 AM',
    notes: ''
  });

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, serviceId: selectedService.id }));
    }
  }, [selectedService]);

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 10 + i;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${ampm}`;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (response.ok) {
        setStep('success');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('An error occurred. Please check your connection.');
    }
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-luxury-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-luxury-black border border-white/10 shadow-2xl my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-luxury-paper/50 hover:text-gold transition-colors z-10"
            >
              <X size={24} />
            </button>

            {step === 'form' ? (
              <div className="p-6 md:p-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif gold-gradient mb-2">Book Appointment</h2>
                  <p className="text-sm text-luxury-paper/50">Secure your spot for a premium grooming experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-paper/30" size={16} />
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-paper/30" size={16} />
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Select Service</label>
                      <select
                        required
                        value={formData.serviceId}
                        onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 py-3 px-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                      >
                        <option value="" disabled className="bg-luxury-black">Choose a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-luxury-black">{s.name} - {s.price}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-paper/30" size={16} />
                        <input
                          required
                          type="date"
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Time Slot</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-paper/30" size={16} />
                        <select
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                        >
                          {timeSlots.map((t) => (
                            <option key={t} value={t} className="bg-luxury-black">{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Special Notes (Optional)</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 text-luxury-paper/30" size={16} />
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors min-h-[100px]"
                        placeholder="Any specific requests?"
                      />
                    </div>
                  </div>

                  <button type="submit" className="gold-button w-full py-4 text-sm">
                    Confirm Booking
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 md:p-12 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                  className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="text-luxury-black w-10 h-10" />
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif gold-gradient">Booking Successful!</h2>
                  <p className="text-luxury-paper/60">
                    Thank you, {formData.name}. Your appointment for {SERVICES.find(s => s.id === formData.serviceId)?.name} is confirmed for {format(new Date(formData.date), 'MMMM do')} at {formData.time}.
                  </p>
                </div>
                <button onClick={handleClose} className="outline-button w-full">
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
