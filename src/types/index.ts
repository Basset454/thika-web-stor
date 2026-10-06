export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  mainImage: string;
  price?: number | null;
  availability: 'متوفر' | 'غير متوفر';
  featured: boolean;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  primaryPhone: string;
  additionalPhones: string[];
  email: string;
  googleMapsUrl: string;
  facebookFollowers: string;
  showroomDetails: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  archivedProducts: number;
  featuredProducts: number;
  totalCategories: number;
}
