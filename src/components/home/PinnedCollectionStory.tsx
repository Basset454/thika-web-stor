import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PinnedCollectionStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img1InnerRef = useRef<HTMLImageElement>(null);
  const img2InnerRef = useRef<HTMLImageElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const indexNumRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textBlock1Ref = useRef<HTMLDivElement>(null);
  const textBlock2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): Controlled Sticky Storytelling Transition
      mm.add('(min-width: 768px)', () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 1. Image 1 gentle drift
        scrollTl.to(img1InnerRef.current, { scale: 1.05, ease: 'none' }, 0);
        scrollTl.to(progressLineRef.current, { width: '50%', ease: 'none' }, 0);

        // 2. Text 01 exits smoothly and becomes non-clickable
        scrollTl.to(
          textBlock1Ref.current,
          {
            yPercent: -25,
            opacity: 0,
            pointerEvents: 'none',
            ease: 'power2.inOut',
          },
          0.35
        );

        // Badge 1 fades out
        scrollTl.to(badge1Ref.current, { opacity: 0, ease: 'power2.in' }, 0.38);

        // 3. Counter switches 01 -> 02
        scrollTl.to(
          indexNumRef.current,
          {
            opacity: 0,
            y: -8,
            duration: 0.15,
            onComplete: () => {
              if (indexNumRef.current) indexNumRef.current.textContent = '02';
            },
            onReverseComplete: () => {
              if (indexNumRef.current) indexNumRef.current.textContent = '01';
            },
          },
          0.4
        );
        scrollTl.to(indexNumRef.current, { opacity: 1, y: 0, duration: 0.15 }, 0.55);

        // 4. Image 2 clip reveals cleanly
        scrollTl.fromTo(
          img2Ref.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 1,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power2.inOut',
          },
          0.4
        );

        // 5. Image 2 scale settling
        scrollTl.fromTo(
          img2InnerRef.current,
          { scale: 1.12 },
          { scale: 1.04, ease: 'none' },
          0.4
        );

        // Badge 2 fades in
        scrollTl.fromTo(
          badge2Ref.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.58
        );

        // 6. Progress bar fills to 100%
        scrollTl.to(progressLineRef.current, { width: '100%', ease: 'none' }, 0.4);

        // 7. Text 02 enters from below and becomes clickable
        scrollTl.fromTo(
          textBlock2Ref.current,
          {
            yPercent: 25,
            opacity: 0,
            pointerEvents: 'none',
          },
          {
            yPercent: 0,
            opacity: 1,
            pointerEvents: 'auto',
            ease: 'power2.out',
          },
          0.55
        );

        // Resting finish
        scrollTl.to(img2InnerRef.current, { scale: 1.0, ease: 'none' }, 0.75);
      });

      return () => mm.revert();
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-[#1E1E1E] border-b border-[#EEEEEE] z-10 font-cairo"
    >
      {/* DESKTOP VIEWPORT: Sticky Scrollytelling Mode (md:block) */}
      <div className="hidden md:block relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-6 lg:py-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* Top Annotation Bar */}
            <div className="pb-3 md:pb-4 border-b border-[#EEEEEE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#FF551A]" />
                <span className="text-xs font-bold text-[#FF551A]">
                  المجموعات الأساسية المعروضة
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-3">
                <span className="font-cairo text-base font-bold text-[#1E1E1E] tabular-nums" dir="ltr">
                  <span ref={indexNumRef}>01</span> / 02
                </span>
                <div className="w-20 h-1 bg-[#EAEAEA] relative overflow-hidden rounded-full">
                  <div
                    ref={progressLineRef}
                    className="absolute top-0 right-0 h-full w-1/2 bg-[#FF551A] transition-all rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* 2-Column Stage */}
            <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center py-4 lg:py-8">
              {/* Text Narrative Stage (col-span-5) */}
              <div className="col-span-5 relative min-h-[320px] flex items-center">
                {/* Story 01: الصالونات */}
                <div
                  ref={textBlock1Ref}
                  className="space-y-4 w-full pointer-events-auto will-change-transform"
                >
                  <span className="text-xs font-bold text-[#FF551A] block">
                    01 · تشكيلة الصالونات
                  </span>
                  <h2 className="font-cairo text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
                    صالونات معاصرة بتشطيبات راقية
                  </h2>
                  <p className="text-sm lg:text-base text-[#4E4E4E] leading-relaxed font-normal">
                    تصاميم مصممة لتكون القلب النابض لغرفة المعيشة. تتميز بهياكل صلبة وأقمشة مريحة تم اختيارها بعناية لضمان ديمومة الاستخدام اليومي.
                  </p>
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-[#1E1E1E] bg-[#F5F5F5] px-3.5 py-1.5 rounded-xs inline-block border border-[#EAEAEA]">
                      الموديلات: Salon 6P Livinda · Salon Pilot Plus
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/salons"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1E1E] hover:bg-[#FF551A] text-white text-xs md:text-sm font-bold rounded-xs transition-colors group shadow-xs"
                    >
                      <span>استكشف قسم الصالونات</span>
                      <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Story 02: غرف النوم */}
                <div
                  ref={textBlock2Ref}
                  className="space-y-4 w-full absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none will-change-transform"
                >
                  <span className="text-xs font-bold text-[#FF551A] block">
                    02 · أجنحة غرف النوم
                  </span>
                  <h2 className="font-cairo text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
                    أجنحة النوم الهادئة والماستر
                  </h2>
                  <p className="text-sm lg:text-base text-[#4E4E4E] leading-relaxed font-normal">
                    مساحتكم الخاصة مصممة لتفيض بالسكينة والتناغم. أسِرّة مريحة مع تفاصيل خشبية متقونة وخزانات رحبة تواكب ذوق أصحاب البيوت الراقية.
                  </p>
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-[#1E1E1E] bg-[#F5F5F5] px-3.5 py-1.5 rounded-xs inline-block border border-[#EAEAEA]">
                      خامات طبيعية · تشطيبات متقنة · تصميم متناسق
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/bedrooms"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1E1E] hover:bg-[#FF551A] text-white text-xs md:text-sm font-bold rounded-xs transition-colors group shadow-xs"
                    >
                      <span>استكشف قسم غرف النوم</span>
                      <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Anchored Visual Stage (col-span-7) */}
              <div className="col-span-7">
                <div className="relative aspect-4/3 max-h-[58vh] w-full rounded-xs overflow-hidden shadow-lg border border-[#E5E5E5] bg-[#F5F5F5]">
                  {/* Layer 1: Salons Image */}
                  <div
                    ref={img1Ref}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                  >
                    <img
                      ref={img1InnerRef}
                      src="/src/assets/images/salon_livinda_showcase_1791306326700.jpg"
                      alt="تشكيلة الصالونات الفاخرة - أثاث الثقة"
                      className="w-full h-full object-cover object-center will-change-transform"
                    />
                    <div
                      ref={badge1Ref}
                      className="absolute bottom-4 right-4 bg-[#1E1E1E]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xs max-w-xs border border-white/10"
                    >
                      <span className="text-[10px] text-[#FF551A] font-bold tracking-wider uppercase block">
                        صالون معروض
                      </span>
                      <h4 className="font-cairo text-sm font-bold">Salon 6P Livinda</h4>
                    </div>
                  </div>

                  {/* Layer 2: Bedrooms Image with Clip-Path Wipe */}
                  <div
                    ref={img2Ref}
                    className="absolute inset-0 w-full h-full overflow-hidden will-change-transform [clip-path:polygon(0%_100%,100%_100%,100%_100%,0%_100%)]"
                  >
                    <img
                      ref={img2InnerRef}
                      src="/src/assets/images/bedroom_luxury_suite_1791306350443.jpg"
                      alt="تشكيلة غرف النوم الماستر - أثاث الثقة"
                      className="w-full h-full object-cover object-center will-change-transform"
                    />
                    <div
                      ref={badge2Ref}
                      className="absolute bottom-4 right-4 bg-[#1E1E1E]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xs max-w-xs border border-white/10 opacity-0"
                    >
                      <span className="text-[10px] text-[#FF551A] font-bold tracking-wider uppercase block">
                        غرفة نوم ماستر
                      </span>
                      <h4 className="font-cairo text-sm font-bold">غرفة نوم ماستر فاخرة</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET VIEW: Sequential Natural Flow (md:hidden) */}
      <div className="md:hidden px-6 py-14 space-y-16">
        {/* Story 01 Mobile Card */}
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
            <span className="text-xs font-bold text-[#FF551A]">
              01 · تشكيلة الصالونات
            </span>
            <span className="font-cairo text-sm font-bold text-[#1E1E1E]">01 / 02</span>
          </div>

          <div className="aspect-4/3 w-full rounded-xs overflow-hidden border border-[#E5E5E5] shadow-md relative">
            <img
              src="/src/assets/images/salon_livinda_showcase_1791306326700.jpg"
              alt="Salon Livinda"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-3 right-3 bg-[#1E1E1E]/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-bold">
              Salon 6P Livinda
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-cairo text-2xl font-bold text-[#1E1E1E] leading-[1.3]">
              صالونات معاصرة بتشطيبات راقية
            </h2>
            <p className="text-sm text-[#4E4E4E] leading-relaxed font-normal">
              تصاميم مصممة لتكون القلب النابض لغرفة المعيشة بأقمشة مريحة وهياكل متينة تدوم لأعوام.
            </p>
            <Link
              to="/salons"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1E1E] hover:bg-[#FF551A] text-white text-xs font-bold rounded-xs transition-colors"
            >
              <span>استكشف الصالونات</span>
              <ArrowUpLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Story 02 Mobile Card */}
        <div className="space-y-5 pt-6 border-t border-[#EEEEEE]">
          <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
            <span className="text-xs font-bold text-[#FF551A]">
              02 · أجنحة غرف النوم
            </span>
            <span className="font-cairo text-sm font-bold text-[#1E1E1E]">02 / 02</span>
          </div>

          <div className="aspect-4/3 w-full rounded-xs overflow-hidden border border-[#E5E5E5] shadow-md relative">
            <img
              src="/src/assets/images/bedroom_luxury_suite_1791306350443.jpg"
              alt="غرفة نوم ماستر"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-3 right-3 bg-[#1E1E1E]/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-bold">
              غرفة نوم ماستر فاخرة
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-cairo text-2xl font-bold text-[#1E1E1E] leading-[1.3]">
              أجنحة النوم الهادئة والماستر
            </h2>
            <p className="text-sm text-[#4E4E4E] leading-relaxed font-normal">
              مساحتكم الخاصة مصممة لتفيض بالسكينة والتناغم مع أسِرّة وخزانات متناسقة وألوان مهدئة.
            </p>
            <Link
              to="/bedrooms"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1E1E] hover:bg-[#FF551A] text-white text-xs font-bold rounded-xs transition-colors"
            >
              <span>استكشف غرف النوم</span>
              <ArrowUpLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
