export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  category: 'hair' | 'grooming' | 'styling' | 'spa';
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}
