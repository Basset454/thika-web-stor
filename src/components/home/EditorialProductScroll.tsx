import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ArrowUpLeft, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface EditorialProductScrollProps {
  products: Product[];
}

export const EditorialProductScroll: React.FC<EditorialProductScrollProps> = ({ products }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): Vertical-driven horizontal scrubbed track with sticky viewport
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        // In RTL, we calculate exact translation distance
        const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
        const scrollDistance = Math.max(0, track.scrollWidth - containerWidth);

        gsap.to(track, {
          x: scrollDistance, // moving in RTL direction to reveal leftward items
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    // Refresh after DOM layout is calculated
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [products]);

  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto md:h-[220vh] bg-[#171614] text-[#FAF9F5] border-y border-[#2B2824]"
    >
      {/* Sticky Viewport Container on Desktop (Zero DOM mutation, pure hardware accelerated) */}
      <div className="md:sticky md:top-0 md:h-screen w-full overflow-hidden flex flex-col justify-center py-10 md:py-0">
        {/* Editorial Section Intro */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-4 md:pt-8 pb-3 md:pb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold text-[#C5A880]">
                الكتالوج التحريري الحصري
              </span>
            </div>
            <h2 className="font-serif-luxury text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.3] text-balance-ar">
              مختارات المعرض للمعاينة
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-[#C5A880] hover:text-[#E2DDCF] transition-colors"
          >
            <span>استعراض كافة المنتجات</span>
            <ArrowUpLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Moving Track */}
        <div className="w-full overflow-x-auto md:overflow-hidden no-scrollbar py-3 md:py-5">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 md:gap-12 px-6 md:px-14 w-max will-change-transform"
          >
            {displayProducts.map((product, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, '0');
              const imageSrc =
                product.mainImage ||
                product.images?.[0] ||
                '/src/assets/images/hero_luxury_furniture_1791306311706.jpg';

              return (
                <div
                  key={product.id}
                  className="w-[270px] sm:w-[320px] md:w-[360px] lg:w-[400px] shrink-0 group flex flex-col justify-between select-none"
                >
                  {/* Proportional Product Presentation Frame */}
                  <div className="relative h-[180px] sm:h-[210px] md:h-[230px] lg:h-[250px] w-full rounded-xs overflow-hidden bg-[#24211D] border border-[#38332C] group-hover:border-[#C5A880]/60 transition-all duration-500">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Editorial Index Badge */}
                    <div
                      className="absolute top-3 right-3 bg-[#141311]/85 backdrop-blur-md px-2.5 py-1 rounded-xs border border-white/10 font-serif-luxury text-xs font-bold text-[#C5A880] tabular-nums"
                      dir="ltr"
                    >
                      № {formattedIndex}
                    </div>

                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-[#C5A880] text-[#1A1A1A] text-[11px] font-bold px-2.5 py-1 uppercase rounded-xs">
                        مختار
                      </div>
                    )}
                  </div>

                  {/* Editorial Typographic Metadata (Zero-pill) */}
                  <div className="pt-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#B8B0A2]">
                      <span className="font-medium text-[#C5A880]">{product.category}</span>
                      <span
                        className={
                          product.availability === 'متوفر'
                            ? 'text-emerald-400 font-semibold'
                            : 'text-[#8C8476]'
                        }
                      >
                        {product.availability}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-xl md:text-2xl font-bold text-white group-hover:text-[#C5A880] transition-colors line-clamp-1 leading-[1.35]">
                      {product.name}
                    </h3>

                    <p className="text-xs md:text-sm text-[#C8C1B5] line-clamp-2 leading-relaxed font-normal">
                      {product.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-[#2C2924]">
                      <div>
                        {product.price ? (
                          <span className="text-sm md:text-base font-bold text-white tabular-nums" dir="ltr">
                            {product.price.toLocaleString('fr-DZ')} DA
                          </span>
                        ) : (
                          <span className="text-xs md:text-sm text-[#B8B0A2] font-medium">
                            للاستفسار عن السعر
                          </span>
                        )}
                      </div>

                      <Link
                        to={`/product/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-[#C5A880] group-hover:underline"
                      >
                        <span>معاينة التفاصيل</span>
                        <ArrowUpLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
