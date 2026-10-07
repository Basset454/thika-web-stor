import React, { useRef, useEffect } from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ShowroomCameraScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const titleBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): Camera Dolly Push-in with Sticky Viewport
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1 (0 -> 0.45): Push into image focal point (Camera Dolly)
        tl.to(
          imageRef.current,
          {
            scale: 1.28,
            xPercent: -3,
            yPercent: -4,
            ease: 'power1.inOut',
          },
          0
        );

        // Intro title fades up and slightly floats out
        tl.to(
          titleBoxRef.current,
          {
            opacity: 0.2,
            y: -35,
            ease: 'none',
          },
          0.2
        );

        // First architectural annotation card floats in
        tl.fromTo(
          card1Ref.current,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', ease: 'power2.out' },
          0.22
        );

        // Stage 2 (0.45 -> 0.75): Camera shifts to second focal point
        tl.to(
          imageRef.current,
          {
            scale: 1.22,
            xPercent: 2,
            yPercent: -2,
            ease: 'power1.inOut',
          },
          0.48
        );

        // Card 1 cross-fades into Card 2 in the same anchored spot
        tl.to(
          card1Ref.current,
          { opacity: 0, y: -20, pointerEvents: 'none', ease: 'power2.in' },
          0.48
        );

        tl.fromTo(
          card2Ref.current,
          { opacity: 0, y: 25, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto', ease: 'power2.out' },
          0.58
        );

        // Stage 3 (0.75 -> 1.0): Camera zooms out slightly to rest position
        tl.to(
          imageRef.current,
          {
            scale: 1.08,
            xPercent: 0,
            yPercent: 0,
            ease: 'power1.out',
          },
          0.8
        );
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

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto md:h-[220vh] bg-[#1E1E1E] text-white font-cairo"
    >
      {/* DESKTOP / TABLET VIEW: Sticky Viewport with Camera Dolly (md:block) */}
      <div className="hidden md:block sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Immersive Viewport Image (Camera canvas) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imageRef}
            src="/src/assets/images/showroom_gallery_jijel_1791306361669.jpg"
            alt="معرض أثاث الثقة في بورمل جيجل"
            className="w-full h-full object-cover object-center will-change-transform scale-100"
            loading="lazy"
          />
          {/* Measured cinematic vignette scrim */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#1E1E1E]/40 to-[#1E1E1E]/85 pointer-events-none" />
        </div>

        {/* Floating Top Title Box */}
        <div
          ref={titleBoxRef}
          className="absolute top-8 md:top-14 inset-x-0 z-10 text-center max-w-2xl mx-auto px-6 pointer-events-none will-change-transform"
        >
          <span className="text-xs font-bold text-[#FF551A] block mb-1.5">
            جولة معمارية في المعرض
          </span>
          <h2 className="font-cairo text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md leading-[1.3] text-balance-ar">
            معرض فسيح يتنفس الأناقة
          </h2>
        </div>

        {/* Anchored Architectural HUD Container (Bottom Right in RTL - Zero collision) */}
        <div className="absolute bottom-8 md:bottom-14 right-6 md:right-16 z-20 w-full max-w-sm sm:max-w-md">
          <div className="relative min-h-[170px] w-full">
            {/* Annotation Card 1: Showroom Floors & Basement */}
            <div
              ref={card1Ref}
              className="bg-[#242424]/90 backdrop-blur-md p-6 rounded-xs border border-[#3E3E3E] shadow-2xl opacity-0 pointer-events-none will-change-transform w-full"
            >
              <div className="flex items-center gap-2 text-[#FF551A] mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold text-[#FF551A]">
                  بورمل · جيجل
                </span>
              </div>
              <h3 className="font-cairo text-xl font-bold text-white mb-2 leading-[1.35]">
                معرض داخلي مع طابق تحت الأرض
              </h3>
              <p className="text-sm text-[#CCCCCC] leading-relaxed font-normal">
                مساحة عرض شاسعة صممت لتتيح لكم التجول بين الأطقم المعروضة وتفقد راحة المقاعد وجودة الخشب والأقمشة عن قرب.
              </p>
            </div>

            {/* Annotation Card 2: Craftsmanship & Community */}
            <div
              ref={card2Ref}
              className="bg-[#242424]/90 backdrop-blur-md p-6 rounded-xs border border-[#3E3E3E] shadow-2xl opacity-0 pointer-events-none will-change-transform w-full absolute inset-0"
            >
              <div className="flex items-center gap-2 text-[#FF551A] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-[#FF551A]">
                  مجتمع الثقة
                </span>
              </div>
              <h3 className="font-cairo text-xl font-bold text-white mb-2 leading-[1.35]">
                أكثر من 73,000 متابع يثقون في معروضاتنا
              </h3>
              <p className="text-sm text-[#CCCCCC] leading-relaxed font-normal">
                "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة." نضع معايير الحرفية والصدق في مقدمة كل تعامل.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Natural Sequential Layout with 100% Visibility (md:hidden) */}
      <div className="md:hidden py-12 px-6 space-y-6">
        <div className="space-y-2 text-center pb-2">
          <span className="text-xs font-bold text-[#FF551A] block">
            جولة معمارية في المعرض
          </span>
          <h2 className="font-cairo text-2xl font-bold text-white leading-[1.3]">
            معرض فسيح يتنفس الأناقة
          </h2>
        </div>

        <div className="relative aspect-16/10 w-full rounded-xs overflow-hidden border border-[#3E3E3E] shadow-lg">
          <img
            src="/src/assets/images/showroom_gallery_jijel_1791306361669.jpg"
            alt="معرض أثاث الثقة في بورمل جيجل"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
        </div>

        {/* Feature Card 1 on Mobile */}
        <div className="bg-[#242424] p-5 rounded-xs border border-[#3E3E3E] space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#FF551A]">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold text-[#FF551A]">
              بورمل · جيجل
            </span>
          </div>
          <h3 className="font-cairo text-lg font-bold text-white leading-[1.35]">
            معرض داخلي مع طابق تحت الأرض
          </h3>
          <p className="text-sm text-[#CCCCCC] leading-relaxed font-normal">
            مساحة عرض شاسعة صممت لتتيح لكم التجول بين الأطقم المعروضة وتفقد راحة المقاعد وجودة الخشب والأقمشة عن قرب.
          </p>
        </div>

        {/* Feature Card 2 on Mobile */}
        <div className="bg-[#242424] p-5 rounded-xs border border-[#3E3E3E] space-y-2 shadow-md">
          <div className="flex items-center gap-2 text-[#FF551A]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold text-[#FF551A]">
              مجتمع الثقة
            </span>
          </div>
          <h3 className="font-cairo text-lg font-bold text-white leading-[1.35]">
            أكثر من 73,000 متابع يثقون في معروضاتنا
          </h3>
          <p className="text-sm text-[#CCCCCC] leading-relaxed font-normal">
            "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة." نضع معايير الحرفية والصدق في مقدمة كل تعامل.
          </p>
        </div>
      </div>
    </section>
  );
};
