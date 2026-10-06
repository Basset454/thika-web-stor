import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Compass, ArrowUpLeft, ShieldCheck, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialClosing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal quote with masked slide & tracking settling
      gsap.fromTo(
        quoteRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
          },
        }
      );

      // Reveal trust cards
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-28 px-6 max-w-7xl mx-auto space-y-24">
      {/* Editorial Philosophy Statement */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-semibold text-[#8C7355] block">
          فلسفة المعرض
        </span>
        <h2
          ref={quoteRef}
          className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-[1.35] text-balance-ar will-change-transform"
        >
          "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
        </h2>
        <p className="text-sm md:text-base text-[#595349] max-w-2xl mx-auto leading-relaxed md:leading-[1.8] font-normal">
          معرض متكامل في بورمل بولاية جيجل، يجمع بين الجودة العالية في التصنيع وحسن الاستقبال لمرافقتكم في تأثيث منازلكم بأرقى التشكيلات.
        </p>
      </div>

      {/* 3 Pillars of Confidence */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xs border border-[#E8E2D6] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF8F3] flex items-center justify-center text-[#8C7355] border border-[#EFECE4]">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A] leading-[1.35]">معرض بورمل جيجل</h3>
          <p className="text-sm text-[#595349] leading-relaxed font-normal">
            مساحات عرض متعددة تشمل طابقاً تحت الأرض مجهزاً بكافة موديلات الصالونات وغرف النوم المعروضة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#E8E2D6] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF8F3] flex items-center justify-center text-[#8C7355] border border-[#EFECE4]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A] leading-[1.35]">مجتمع من 73,000+</h3>
          <p className="text-sm text-[#595349] leading-relaxed font-normal">
            قاعدة متابعين حقيقية يثقون في جودة منتجاتنا وأسعارنا وخدماتنا الموجهة للعائلات الجزائرية.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#E8E2D6] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FAF8F3] flex items-center justify-center text-[#8C7355] border border-[#EFECE4]">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A] leading-[1.35]">تواصل مباشر ومستمر</h3>
          <p className="text-sm text-[#595349] leading-relaxed font-normal">
            أرقام هاتفية معتمدة للإجابة الفورية عن استفساراتكم حول المقاسات والأسعار ومواعيد الزيارة.
          </p>
        </div>
      </div>

      {/* Direct Contact Action Panel */}
      <div className="bg-[#1C1A17] text-white p-10 md:p-16 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2F2B26] shadow-xl">
        <div className="space-y-3 text-center md:text-right">
          <span className="text-xs text-[#C5A880] font-semibold block">
            زيارة المعرض أو الاستفسار
          </span>
          <h3 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#FAF9F5] leading-[1.3] text-balance-ar">
            تفضلوا بزيارة معرضنا في بورمل، جيجل
          </h3>
          <p className="text-sm text-[#C8C2B7] max-w-xl leading-relaxed font-normal">
            يسعدنا استقبالكم في صالات العرض للتعرف على الموديلات الحقيقية ولمس جودة الأقمشة والخامات.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
          <a
            href="tel:0560107745"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#C5A880] hover:bg-[#D4BC98] text-[#1A1A1A] text-sm font-semibold rounded-xs transition-colors"
            dir="ltr"
          >
            <Phone className="w-4 h-4" />
            <span>0560 10 77 45</span>
          </a>

          <a
            href="https://maps.app.goo.gl/XYLZfTao58Y5pydc6"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-xs border border-white/20 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#C5A880]" />
            <span>خرائط Google</span>
          </a>
        </div>
      </div>
    </section>
  );
};
