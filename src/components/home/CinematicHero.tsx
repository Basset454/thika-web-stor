import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpLeft, Phone, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (> 768px): Camera zoom-out and differential text floating
      mm.add('(min-width: 768px)', () => {
        // Initial entrance
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          imageRef.current,
          { scale: 1.25, opacity: 0.9 },
          { scale: 1.15, opacity: 1, duration: 1.6 }
        )
          .fromTo(
            badgeRef.current,
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 },
            '-=1.1'
          )
          .fromTo(
            titleRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            '-=0.7'
          )
          .fromTo(
            subtitleRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            '-=0.7'
          )
          .fromTo(
            actionsRef.current,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            '-=0.6'
          );

        // Scroll scrubbed timeline
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Zoom image back to 1.0 gently
        scrollTl.to(
          imageRef.current,
          {
            scale: 1.0,
            yPercent: 10,
            ease: 'none',
          },
          0
        );

        // Deepen scrim slightly
        scrollTl.to(
          scrimRef.current,
          {
            opacity: 0.85,
            ease: 'none',
          },
          0
        );

        // Headline floats upward at differential speed
        scrollTl.to(
          titleRef.current,
          {
            y: -60,
            opacity: 0.3,
            ease: 'none',
          },
          0
        );

        // Subtitle & actions fade out upward
        scrollTl.to(
          [subtitleRef.current, actionsRef.current, badgeRef.current],
          {
            y: -80,
            opacity: 0,
            ease: 'none',
          },
          0
        );

        // Bottom transition curtain activates only at end of hero scroll
        scrollTl.to(
          curtainRef.current,
          {
            opacity: 1,
            ease: 'power2.in',
          },
          0.75
        );
      });

      // Mobile (< 768px): Light gentle scroll without heavy transform
      mm.add('(max-width: 767px)', () => {
        gsap.to(imageRef.current, {
          scale: 1.02,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100svh] md:h-[150vh] min-h-[580px] bg-[#1E1E1E] text-white overflow-hidden font-cairo"
    >
      {/* Sticky/Pinned Visual Viewport Container */}
      <div className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden flex items-center justify-center pt-20 md:pt-16 pb-8 md:pb-0">
        {/* Background Image Container with Overflow Hidden */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={imageRef}
            src="/src/assets/images/hero_luxury_furniture_1791306311706.jpg"
            alt="معرض أثاث الثقة جيجل 18"
            className="w-full h-full object-cover object-center will-change-transform scale-105"
            loading="eager"
          />
          {/* Measured Multi-Layered Scrim */}
          <div
            ref={scrimRef}
            className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/60 to-[#1E1E1E]/30 transition-opacity"
          />
        </div>

        {/* Editorial Floating Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5 md:space-y-7 select-none">
          {/* Top Location Kicker */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm text-white/90 font-medium font-cairo"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF551A]" />
            <span>3 فروع متكاملة في ولاية جيجل 18</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-[#FF551A] font-bold">متجر الأثاث الفاخر</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1
            ref={titleRef}
            className="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold leading-[1.3] md:leading-[1.22] text-white drop-shadow-md text-balance-ar will-change-transform"
          >
            أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة
          </h1>

          {/* Supporting Prose */}
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed md:leading-[1.8] font-normal will-change-transform font-cairo"
          >
            أحد أكبر وأرقى متاجر الأثاث في ولاية جيجل عبر 3 فروع متكاملة في مناطق مختلفة. تشكيلات حصرية من الصالونات العصرية وغرف النوم لتمنح منازلكم راحة استثنائية وفخامة تدوم.
          </p>

          {/* Action CTAs */}
          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 will-change-transform font-medium font-cairo"
          >
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-sm font-bold rounded-xs transition-colors shadow-lg group"
            >
              <span>اكتشف التشكيلة</span>
              <ArrowUpLeft className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href="#branches"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xs backdrop-blur-md border border-white/25 transition-colors"
            >
              <span>فروعنا الـ 3 بجيجل</span>
              <Phone className="w-4 h-4 text-[#FF551A]" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator Prompt (shown only on tall desktop viewports) */}
        <div className="hidden lg:flex absolute bottom-6 inset-x-0 flex-col items-center justify-center gap-1.5 pointer-events-none opacity-80">
          <span className="text-[10px] tracking-widest text-white/70 uppercase font-bold font-cairo">
            مرر للاستكشاف
          </span>
          <div className="w-3.5 h-6 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-1.5 bg-[#FF551A] rounded-full animate-bounce" />
          </div>
        </div>

        {/* Masked Transition Bottom Layer to next cream section */}
        <div
          ref={curtainRef}
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF9F5] via-[#FAF9F5]/70 to-transparent pointer-events-none opacity-0 will-change-transform"
        />
      </div>
    </div>
  );
};
