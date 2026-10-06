import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Phone } from 'lucide-react';

export const Salons: React.FC = () => {
  const [salons, setSalons] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const data = await api.getProducts({ category: 'صالونات' });
        setSalons(data);
      } catch (err) {
        console.error('Error fetching salons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#EAE6DD] pb-12">
        <div className="lg:col-span-8 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C7355]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>قسم الصالونات الفاخرة</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.25] text-balance-ar">
            الصالونات المعاصرة وأطقم الجلوس
          </h1>
          <p className="text-sm md:text-base text-[#595349] max-w-2xl leading-relaxed md:leading-[1.8] font-normal">
            تشكيلة صالونات مصممة بأعلى معايير الراحة والأناقة. تتميز بهياكل صلبة، حشوات عالية المرونة، وأقمشة مقاومة للاستخدام اليومي تمنح مجلسكم فخامة دائمة.
          </p>
        </div>

        <div className="lg:col-span-4 lg:text-left">
          <div className="bg-[#F5F2EA] p-5 rounded-xs border border-[#E5DFD3] space-y-2">
            <span className="text-xs text-[#8C7355] font-semibold block">للاستفسار عن المقاسات والألوان</span>
            <a
              href="tel:0560107745"
              className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#1A1A1A] hover:text-[#8C7355] transition-colors"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-[#8C7355]" />
              <span>0560 10 77 45</span>
            </a>
          </div>
        </div>
      </div>

      {/* Salons Showcase Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-[#F0ECE4] rounded-xs animate-pulse" />
            ))}
          </div>
        ) : salons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {salons.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#EAE6DD] rounded-xs p-12">
            <p className="text-base text-[#1A1A1A]">لا توجد معروضات متاحة في قسم الصالونات حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};
