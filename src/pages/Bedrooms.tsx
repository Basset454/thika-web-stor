import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, Phone } from 'lucide-react';

export const Bedrooms: React.FC = () => {
  const [bedrooms, setBedrooms] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBedrooms = async () => {
      try {
        const data = await api.getProducts({ category: 'غرف نوم' });
        setBedrooms(data);
      } catch (err) {
        console.error('Error fetching bedrooms:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBedrooms();
  }, []);

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-16 font-cairo">
      {/* Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#EEEEEE] pb-12">
        <div className="lg:col-span-8 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF551A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>قسم غرف النوم الفاخرة</span>
          </div>
          <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E] leading-[1.25] text-balance-ar">
            غرف النوم والأجنحة الخاصة
          </h1>
          <p className="text-sm md:text-base text-[#4E4E4E] max-w-2xl leading-relaxed md:leading-[1.8] font-normal">
            مساحة للاسترخاء صُممت بدقة لتجمع بين دفء الخشب وتناسق الألوان. أسرة مريحة، طاولات متناسقة، وخزانات رحبة تناسب مختلف المساحات المعمارية.
          </p>
        </div>

        <div className="lg:col-span-4 lg:text-left">
          <div className="bg-[#F8F8F8] p-5 rounded-xs border border-[#E5E5E5] space-y-2">
            <span className="text-xs text-[#FF551A] font-bold block">للاستفسار عن المقاسات والتوافر</span>
            <a
              href="tel:0560107745"
              className="inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#1E1E1E] hover:text-[#FF551A] transition-colors"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-[#FF551A]" />
              <span>0560 10 77 45</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bedrooms Showcase Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-[#F5F5F5] rounded-xs animate-pulse" />
            ))}
          </div>
        ) : bedrooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bedrooms.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#EEEEEE] rounded-xs p-12">
            <p className="text-base text-[#1E1E1E]">لا توجد معروضات متاحة في قسم غرف النوم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};
