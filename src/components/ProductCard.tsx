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
      className="group block bg-white border border-[#EEEEEE] hover:border-[#FF551A]/40 transition-all duration-300 rounded-xs overflow-hidden shadow-xs hover:shadow-md font-cairo"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-[#F5F5F5] overflow-hidden">
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
          <div className="w-full h-full flex flex-col items-center justify-center text-[#757575] bg-[#F5F5F5] p-4 text-center">
            <ImageOff className="w-8 h-8 stroke-1 mb-2 opacity-50" />
            <span className="text-xs font-medium">{product.name}</span>
          </div>
        )}

        {/* Minimal text indicator for featured */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-[#1E1E1E]/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF551A]"></span>
            <span>تشكيلة مميزة</span>
          </div>
        )}

        {/* Quick view indicator on hover */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-8 h-8 rounded-xs bg-[#FF551A] text-white flex items-center justify-center shadow-sm">
            <ArrowUpLeft className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-2.5">
        {/* Zero-Pill Metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#757575]">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span className={product.availability === 'متوفر' ? 'text-[#2E7D32]' : 'text-[#757575]'}>
            {product.availability}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-cairo text-lg md:text-xl font-bold text-[#1E1E1E] group-hover:text-[#FF551A] transition-colors line-clamp-1 leading-[1.35]">
          {product.name}
        </h3>

        {/* Price / Inquiry */}
        <div className="pt-2 border-t border-[#F0F0F0] flex items-center justify-between">
          <div>
            {product.price ? (
              <span className="text-sm md:text-base font-bold text-[#1E1E1E] tabular-nums" dir="ltr">
                {product.price.toLocaleString('fr-DZ')} DA
              </span>
            ) : (
              <span className="text-xs md:text-sm font-medium text-[#757575]">
                للاستفسار عن السعر
              </span>
            )}
          </div>

          <span className="text-xs md:text-sm text-[#FF551A] font-bold flex items-center gap-1 group-hover:underline">
            <span>التفاصيل</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
