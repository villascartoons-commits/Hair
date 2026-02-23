import { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'haircut-premium',
    name: 'Haircut',
    description: 'Precision cutting tailored to your face shape and style preferences. Includes hair wash and styling.',
    price: '₹160',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    category: 'hair'
  },
  {
    id: 'beard-sculpting',
    name: 'Beard Grooming',
    description: 'Expert beard shaping with hot towel treatment and premium oils for a sharp, clean look.',
    price: '₹70',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1590540179852-2110a54f813a?auto=format&fit=crop&q=80&w=800',
    category: 'grooming'
  },
  {
    id: 'hair-coloring',
    name: 'Hair Coloring',
    description: 'Professional hair coloring using premium, ammonia-free products for vibrant and lasting results.',
    price: '₹1500+',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800',
    category: 'hair'
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    description: 'Deep conditioning treatment to revitalize your hair, reduce frizz, and promote scalp health.',
    price: '₹800',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    category: 'spa'
  },
  {
    id: 'facial-grooming',
    name: 'Facial Treatment',
    description: 'Rejuvenating skin treatment designed specifically for men to cleanse, exfoliate, and hydrate.',
    price: '₹500+',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800',
    category: 'grooming'
  },
  {
    id: 'groom-styling',
    name: 'Groom Styling',
    description: 'Complete makeover for your special day. Includes hair, makeup, and grooming services.',
    price: '₹1000+',
    duration: '180 min',
    image: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?auto=format&fit=crop&q=80&w=800',
    category: 'styling'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rating: 5,
    text: 'Best salon in Shrirampur! The attention to detail is amazing. Highly recommended for premium haircuts.',
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Anita Deshmukh',
    rating: 5,
    text: 'Lovely experience. The staff is professional and the ambiance is very luxury. My hair spa was perfect.',
    date: '1 month ago'
  }
];

export const SALON_DETAILS = {
  name: 'Sky Hairdressing',
  address: 'Ward No 7, Canal Road, Near Swayamwar Mangal Karyalay, Shrirampur, Maharashtra 413709',
  phone: '+91 77438 69553',
  whatsapp: '917743869553',
  hours: '10 AM – 10 PM',
  instagram: 'https://www.instagram.com/sky_hairdressing/',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.123456789!2d74.654321!3d19.621234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDM3JzE2LjQiTiA3NMKwMzknMTUuNSJF!5e0!3m2!1sen!2sin!4v1234567890',
  googleMapsLink: 'https://maps.app.goo.gl/JM86+4F'
};
