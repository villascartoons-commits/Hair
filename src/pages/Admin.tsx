import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, Clock3, MessageSquare, Trash2 } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES } from '../constants';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    // Optimistic update: remove from UI immediately
    const originalBookings = [...bookings];
    setBookings(prev => prev.filter(b => b.id !== id));
    
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        // Rollback if server fails
        setBookings(originalBookings);
        alert('Failed to delete on server. Restoring booking.');
      }
    } catch (error) {
      // Rollback on network error
      setBookings(originalBookings);
      console.error('Error deleting booking:', error);
      alert('Network error. Could not delete booking.');
    }
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        const booking = bookings.find(b => b.id === id);
        if (booking) {
          const serviceName = SERVICES.find(s => s.id === booking.serviceId)?.name || 'Service';
          const dateStr = format(new Date(booking.date), 'MMM do');
          
          let message = '';
          if (status === 'confirmed') {
            message = `Hi ${booking.name}, your appointment at Sky Hairdressing for ${serviceName} on ${dateStr} at ${booking.time} has been CONFIRMED. See you soon!`;
          } else if (status === 'cancelled') {
            message = `Hi ${booking.name}, we're sorry but your appointment at Sky Hairdressing for ${serviceName} on ${dateStr} has been CANCELLED. Please contact us to reschedule.`;
          }

          if (message) {
            // Encode message for SMS intent
            const encodedMessage = encodeURIComponent(message);
            // Use SMS intent - works on mobile and some desktop OS
            window.open(`sms:${booking.phone}?body=${encodedMessage}`, '_blank');
          }
        }
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif mb-4">Appointment <span className="gold-gradient italic">Dashboard</span></h1>
          <p className="text-luxury-paper/60">Manage your salon's bookings and customer requests.</p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('admin_auth');
            navigate('/login');
          }}
          className="text-[10px] uppercase tracking-widest font-bold text-luxury-paper/40 hover:text-red-500 transition-colors border border-white/10 px-4 py-2"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10">
            <Calendar className="mx-auto text-luxury-paper/20 mb-4" size={48} />
            <p className="text-luxury-paper/40">No bookings found yet.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gold/30 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                {/* Customer Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold">
                    <User size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Customer</span>
                  </div>
                  <h3 className="text-xl font-serif">{booking.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-luxury-paper/60">
                    <Phone size={14} />
                    {booking.phone}
                  </div>
                </div>

                {/* Appointment Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold">
                    <Calendar size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Appointment</span>
                  </div>
                  <h4 className="text-lg font-serif">
                    {SERVICES.find(s => s.id === booking.serviceId)?.name || 'Unknown Service'}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-luxury-paper/60">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {format(new Date(booking.date), 'MMM do, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {booking.time}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock3 size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                      booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                      'bg-gold/10 text-gold'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  {booking.notes && (
                    <p className="text-xs text-luxury-paper/40 italic mt-2">"{booking.notes}"</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-2 mr-4 border-r border-white/10 pr-4">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hi ${booking.name}, this is Sky Hairdressing regarding your appointment...`);
                      window.open(`https://wa.me/${booking.phone}?text=${msg}`, '_blank');
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold text-luxury-paper/40 hover:text-emerald-500 flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare size={12} /> WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Hi ${booking.name}, this is Sky Hairdressing...`);
                      window.open(`sms:${booking.phone}?body=${msg}`, '_blank');
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold text-luxury-paper/40 hover:text-gold flex items-center gap-2 transition-colors"
                  >
                    <Phone size={12} /> Send SMS
                  </button>
                </div>

                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      className="p-3 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all rounded-full"
                      title="Confirm Booking"
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-full"
                      title="Cancel Booking"
                    >
                      <XCircle size={20} />
                    </button>
                  </>
                )}
                {booking.status !== 'pending' && (
                  <button
                    onClick={() => updateStatus(booking.id, 'pending')}
                    className="text-[10px] uppercase tracking-widest font-bold text-luxury-paper/30 hover:text-gold transition-colors"
                  >
                    Reset to Pending
                  </button>
                )}
                
                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-full ml-4"
                  title="Delete Booking"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
