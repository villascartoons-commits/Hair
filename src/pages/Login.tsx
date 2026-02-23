import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Scissors } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'yash@123') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-luxury-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-12 bg-white/5 border border-white/10 space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Scissors className="text-luxury-black w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif gold-gradient">Admin Login</h1>
          <p className="text-sm text-luxury-paper/40">Enter your credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gold font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-luxury-paper/30" size={16} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          <button type="submit" className="gold-button w-full py-4 text-sm">
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
