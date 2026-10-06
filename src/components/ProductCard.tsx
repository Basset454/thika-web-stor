import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowUpLeft, ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-white border border-[#EBE7DF] hover:border-[#C4B5A5] transition-all duration-300 rounded-xs overflow-hidden"
    >
      {/* Product Image Slot (65-75% height) */}
      <div className="relative aspect-4/3 w-full bg-[#F4F1EA] overflow-hidden">
        {!imageError ? (
          <img
            src={product.mainImage || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#8C8275] bg-[#EFECE4] p-4 text-center">
            <ImageOff className="w-8 h-8 stroke-1 mb-2 opacity-50" />
            <span className="text-xs font-medium">{product.name}</span>
          </div>
        )}

        {/* Minimal text indicator for featured (unboxed) */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-[#1A1A1A]/85 backdrop-blur-xs text-[#FAF9F5] text-xs font-semibold px-2.5 py-1 rounded-xs">
            تشكيلة مميزة
          </div>
        )}

        {/* Quick view indicator on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-8 h-8 rounded-xs bg-white/95 text-[#1A1A1A] flex items-center justify-center shadow-xs">
            <ArrowUpLeft className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-2.5">
        {/* Zero-Pill Metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#8A8175]">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span className={product.availability === 'متوفر' ? 'text-[#3E7B54]' : 'text-[#8A8175]'}>
            {product.availability}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif-luxury text-lg md:text-xl font-bold text-[#1A1A1A] group-hover:text-[#8C7355] transition-colors line-clamp-1 leading-[1.35]">
          {product.name}
        </h3>

        {/* Price / Inquiry */}
        <div className="pt-2 border-t border-[#F2EFE8] flex items-center justify-between">
          <div>
            {product.price ? (
              <span className="text-sm md:text-base font-bold text-[#1A1A1A] tabular-nums" dir="ltr">
                {product.price.toLocaleString('fr-DZ')} DA
              </span>
            ) : (
              <span className="text-xs md:text-sm font-medium text-[#7D7365]">
                للاستفسار عن السعر
              </span>
            )}
          </div>

          <span className="text-xs md:text-sm text-[#8C7355] font-semibold flex items-center gap-1 group-hover:underline">
            <span>التفاصيل</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
