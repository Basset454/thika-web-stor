import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { api } from '../services/api';
import { CinematicHero } from '../components/home/CinematicHero';
import { PinnedCollectionStory } from '../components/home/PinnedCollectionStory';
import { EditorialProductScroll } from '../components/home/EditorialProductScroll';
import { ShowroomCameraScene } from '../components/home/ShowroomCameraScene';
import { EditorialGallery } from '../components/home/EditorialGallery';
import { EditorialClosing } from '../components/home/EditorialClosing';

const INITIAL_FEATURED_PRODUCTS: Product[] = [
  {
    id: 'prod-livinda',
    name: 'Salon 6P Livinda',
    slug: 'salon-6p-livinda',
    category: 'صالونات',
    description: 'صالون فاخر مكون من 6 مقاعد بتصميم عصري وأنسجة راقية تمنح منزلك فخامة استثنائية وراحة متناهية. متوفر حصرياً لدى معرض أثاث الثقة جيجل 18.',
    images: ['/src/assets/images/salon_livinda_showcase_1791306326700.jpg'],
    mainImage: '/src/assets/images/salon_livinda_showcase_1791306326700.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-pilot',
    name: 'Salon Pilot Plus',
    slug: 'salon-pilot-plus',
    category: 'صالونات',
    description: 'صالون أنيق وعصري بلمسات فخمة وتصميم مريح يناسب مختلف المساحات العائلية الراقية بتشطيبات مميزة.',
    images: ['/src/assets/images/salon_pilot_plus_showcase_1791306337877.jpg'],
    mainImage: '/src/assets/images/salon_pilot_plus_showcase_1791306337877.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-bedroom-suite',
    name: 'غرفة نوم ماستر فاخرة',
    slug: 'chambre-coucher-master-luxe',
    category: 'غرف نوم',
    description: 'غرفة نوم متكاملة بتصميم عصري يجمع بين الخشب الطبيعي الراقي، خزانة رحبة، وسرير مريح يفيض بالسكينة.',
    images: ['/src/assets/images/bedroom_luxury_suite_1791306350443.jpg'],
    mainImage: '/src/assets/images/bedroom_luxury_suite_1791306350443.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-gallery-suite',
    name: 'طقم معيشة أفق الراحة',
    slug: 'salon-horizon-moderne',
    category: 'صالونات',
    description: 'طقم جلوس رحب ومصمم بعناية فائقة ليوفر راحة الجلوس اليومية وتناسقاً بصرياً باهراً في صالونكم.',
    images: ['/src/assets/images/showroom_gallery_jijel_1791306361669.jpg'],
    mainImage: '/src/assets/images/showroom_gallery_jijel_1791306361669.jpg',
    price: null,
    availability: 'متوفر',
    featured: true,
    archived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(INITIAL_FEATURED_PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    const loadHomeData = async () => {
      try {
        const products = await api.getProducts({ featured: true });
        if (isMounted && products && products.length > 0) {
          setFeaturedProducts(products);
        }
      } catch (err) {
        console.error('Failed to load home products:', err);
      }
    };

    loadHomeData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full bg-white text-[#1E1E1E]">
      {/* 1. HERO — CINEMATIC OPENING (Dark theme) */}
      <div data-nav-theme="dark">
        <CinematicHero />
      </div>

      {/* 2. PINNED COLLECTION STORY (Light theme) */}
      <div data-nav-theme="light">
        <PinnedCollectionStory />
      </div>

      {/* 3 & 4. PRODUCT SHOWCASE — EDITORIAL HORIZONTAL PINNED CATALOGUE (Dark theme) */}
      <div data-nav-theme="dark">
        <EditorialProductScroll products={featuredProducts} />
      </div>

      {/* 5. ROOM / SHOWROOM SCENE — CAMERA DOLLY PUSH-IN (Dark theme) */}
      <div data-nav-theme="dark">
        <ShowroomCameraScene />
      </div>

      {/* 6. HORIZONTAL GLIDING GALLERY (Light theme) */}
      <div data-nav-theme="light">
        <EditorialGallery />
      </div>

      {/* 7. EDITORIAL PHILOSOPHY & DIRECT CONNECT (Light theme) */}
      <div data-nav-theme="light">
        <EditorialClosing />
      </div>
    </div>
  );
};
