import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop (> 768px): Horizontal Gliding with Staggered Depth Parallax and Sticky Viewport
      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const containerWidth = track.parentElement?.clientWidth || window.innerWidth;
        const totalShift = Math.max(0, track.scrollWidth - containerWidth);

        // Master horizontal scrub
        gsap.to(track, {
          x: totalShift,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Subtle differential parallax (refined depth without overflowing viewport)
        gsap.to(card1Ref.current, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        });

        gsap.to(card3Ref.current, {
          y: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
          },
        });
      });

      return () => mm.revert();
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const galleryItems = [
    {
      ref: card1Ref,
      title: 'Salon Pilot Plus',
      subtitle: 'تفاصيل جلدية وحرفية راقية',
      aspect: 'aspect-3/4 max-h-[48vh] w-[260px] md:w-[320px]',
      image: '/src/assets/images/salon_pilot_plus_showcase_1791306337877.jpg',
    },
    {
      ref: card2Ref,
      title: 'Salon 6P Livinda',
      subtitle: 'القطعة المركزية في صالات العرض',
      aspect: 'aspect-16/10 max-h-[50vh] w-[320px] md:w-[480px]',
      image: '/src/assets/images/salon_livinda_showcase_1791306326700.jpg',
      dominant: true,
    },
    {
      ref: card3Ref,
      title: 'فضاءات المعرض ببورمل',
      subtitle: 'طوابق متعددة لاستكشاف مختلف التشكيلات',
      aspect: 'aspect-16/9 max-h-[48vh] w-[300px] md:w-[440px]',
      image: '/src/assets/images/showroom_gallery_jijel_1791306361669.jpg',
    },
    {
      ref: card4Ref,
      title: 'غرف نوم ماستر',
      subtitle: 'هدوء التصميم وتناغم المواد الطبيعية',
      aspect: 'aspect-4/3 max-h-[48vh] w-[270px] md:w-[340px]',
      image: '/src/assets/images/bedroom_luxury_suite_1791306350443.jpg',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto md:h-[220vh] bg-white text-[#1E1E1E] border-b border-[#EEEEEE] font-cairo"
    >
      {/* Sticky Viewport Container on Desktop (Zero DOM manipulation) */}
      <div className="md:sticky md:top-0 md:h-screen w-full overflow-hidden flex flex-col justify-center py-10 md:py-0">
        {/* Editorial Header */}
        <div className="max-w-7xl mx-auto px-6 w-full pt-4 md:pt-8 pb-3 md:pb-4">
          <span className="text-xs font-bold text-[#FF551A] block mb-1.5">
            معرض الصور البصري
          </span>
          <h2 className="font-cairo text-2xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
            مشاهد مختارة من قلب المعرض
          </h2>
        </div>

        {/* Varied Proportions Gallery Track */}
        <div className="w-full overflow-x-auto md:overflow-hidden no-scrollbar py-3 md:py-5">
          <div
            ref={trackRef}
            className="flex items-center gap-5 md:gap-10 px-6 md:px-16 w-max will-change-transform"
          >
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                ref={item.ref}
                className={`${item.aspect} shrink-0 group relative overflow-hidden rounded-xs border transition-all duration-500 ${
                  item.dominant
                    ? 'border-[#FF551A] shadow-2xl scale-100 md:scale-105'
                    : 'border-[#E5E5E5] shadow-md opacity-90 hover:opacity-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subdued Scrim & Minimal Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-xs text-[#FF551A] font-bold block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-cairo text-lg md:text-xl font-bold mt-1 line-clamp-1 leading-[1.35]">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
