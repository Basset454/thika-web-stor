import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Compass, ArrowUpLeft, ShieldCheck, MapPin, Facebook, ExternalLink } from 'lucide-react';
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
    <section ref={containerRef} className="py-28 px-6 max-w-7xl mx-auto space-y-24 font-cairo">
      {/* Editorial Philosophy Statement */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-bold text-[#FF551A] block">
          فلسفة متجرنا
        </span>
        <h2
          ref={quoteRef}
          className="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E] leading-[1.35] text-balance-ar will-change-transform"
        >
          "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
        </h2>
        <p className="text-sm md:text-base text-[#4E4E4E] max-w-2xl mx-auto leading-relaxed md:leading-[1.8] font-normal">
          أحد أكبر وأرقى متاجر الأثاث في ولاية جيجل بـ 3 فروع متكاملة في مناطق مختلفة، نجمع بين الجودة العالية في التصنيع، التصاميم المعمارية العصرية، والمصداقية التامة في مرافقتكم لتأثيث بيوتكم.
        </p>
      </div>

      {/* 3 Pillars of Confidence */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E] leading-[1.35]">3 فروع متكاملة بجيجل</h3>
          <p className="text-sm text-[#4E4E4E] leading-relaxed font-normal">
            صالات عرض رحبة تتوزع بين وسط مدينة جيجل، بورمل، وحي الفرسان، مع طوابق متعددة للمعاينة الحية والمباشرة.
          </p>
        </div>

        <a
          href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/40 transition-colors space-y-3 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
              <Facebook className="w-5 h-5" />
            </div>
            <ExternalLink className="w-4 h-4 text-[#999999] group-hover:text-[#FF551A] transition-colors" />
          </div>
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E] group-hover:text-[#FF551A] transition-colors leading-[1.35]">مجتمع من 73,000+</h3>
          <p className="text-sm text-[#4E4E4E] leading-relaxed font-normal">
            قاعدة متابعين حقيقية ووفية على صفحتنا الرسمية في فيسبوك يشاركوننا شغف الأثاث الفاخر والتصميم العصري.
          </p>
        </a>

        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E] leading-[1.35]">تواصل مباشر ومستمر</h3>
          <p className="text-sm text-[#4E4E4E] leading-relaxed font-normal">
            فريق متفانٍ في جميع الفروع للإجابة عن أسئلتكم حول المقاسات، الأسعار، وحجز التوصيل بأعلى درجات الاهتمام.
          </p>
        </div>
      </div>

      {/* Direct Contact Action Panel */}
      <div className="bg-[#1E1E1E] text-white p-10 md:p-16 rounded-xs flex flex-col md:flex-row items-center justify-between gap-8 border border-[#2E2E2E] shadow-xl">
        <div className="space-y-3 text-center md:text-right">
          <span className="text-xs text-[#FF551A] font-bold block">
            زيارة فروع المتجر أو الاستفسار
          </span>
          <h3 className="font-cairo text-2xl md:text-3xl font-bold text-white leading-[1.3] text-balance-ar">
            تفضلوا بزيارة أيٍّ من فروعنا الثلاثة في جيجل
          </h3>
          <p className="text-sm text-[#CCCCCC] max-w-xl leading-relaxed font-normal">
            يسعدنا استقبالكم في صالات العرض للتعرف على الموديلات الحقيقية، اختبار الراحة ولمس جودة الأقمشة والخامات.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
          <a
            href="tel:0560107745"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-sm font-bold rounded-xs transition-colors shadow-xs"
            dir="ltr"
          >
            <Phone className="w-4 h-4" />
            <span>0560 10 77 45</span>
          </a>

          <a
            href="#branches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xs border border-white/20 transition-colors"
          >
            <Compass className="w-4 h-4 text-[#FF551A]" />
            <span>استعراض الفروع الـ 3</span>
          </a>
        </div>
      </div>
    </section>
  );
};
