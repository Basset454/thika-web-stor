import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Compass, CheckCircle2, ShieldCheck, Layers, Facebook, Instagram, ExternalLink, Building2 } from 'lucide-react';
import { BranchesSection } from '../components/home/BranchesSection';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-24 font-cairo">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-5">
        <span className="text-xs font-bold text-[#FF551A] block">
          عن المتجر والهوية
        </span>
        <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E] leading-[1.25] text-balance-ar">
          متجر أثاث الثقة جيجل 18
        </h1>
        <p className="font-cairo text-lg md:text-2xl text-[#FF551A] font-bold leading-[1.4] text-balance-ar">
          "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
        </p>
        <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
          يُعد متجر <strong>أثاث الثقة</strong> أحد أكبر وأرقى صروح تجارة الأثاث الفاخر والعصري في ولاية جيجل بالجزائر، من خلال <strong>3 فروع متكاملة في مواقع استراتيجية مختلفة</strong> تلبي تطلعات العائلات الجزائرية الراغبة في الجمع بين أعلى معايير الجودة، الراحة، والجمالية المعمارية.
        </p>
      </div>

      {/* Showroom Architecture Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F8F8F8] p-8 md:p-14 rounded-xs border border-[#EEEEEE]">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF551A]">
            <Layers className="w-4 h-4" />
            <span>مساحات العرض الكبرى</span>
          </div>
          <h2 className="font-cairo text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
            صالات عرض متعددة المستويات تشمل طوابق تحت الأرض
          </h2>
          <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
            حرصنا على تجهيز فروعنا بمساحات شاسعة ومضيئة تتيح لزبائننا الكرام التجول براحة ومعاينة مئات الموديلات من الصالونات وغرف النوم. كما يضم فرعنا ببورمل <strong>طابقاً تحت الأرض مخصصاً لتشكيلات استثنائية</strong> من الصالونات وغرف النوم لتجربة بصرية شاملة.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm md:text-base text-[#1E1E1E] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#FF551A] shrink-0" />
              <span>معاينة حية للمقاسات، متانة الهياكل وجودة الأقمشة</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base text-[#1E1E1E] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#FF551A] shrink-0" />
              <span>3 فروع في مناطق مختلفة من جيجل لتسهيل الوصول</span>
            </div>
            <a
              href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm md:text-base text-[#FF551A] font-bold hover:underline"
            >
              <Facebook className="w-5 h-5 shrink-0" />
              <span>مجتمع يتجاوز 73 ألف متابع عبر صفحتنا الرسمية على فيسبوك</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-4/3 rounded-xs overflow-hidden shadow-lg border border-[#E5E5E5]">
            <img
              src="/src/assets/images/showroom_gallery_jijel_1791306361669.jpg"
              alt="صالات متجر أثاث الثقة في جيجل"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Key Real Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <Building2 className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">3 فروع في ولاية جيجل</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            تتوزع فروعنا بين وسط مدينة جيجل، بورمل، وحي الفرسان، بمساحات فسيحة تضمن لكم خيارات واسعة ومريحة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">الثقة والمصداقية</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            الاسم مستوحى من مبدأ الصدق في التعامل، ومرافقة العائلات الجزائرية بالنصيحة الصادقة لاختيار الأثاث الأنسب.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <Phone className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">فريق في خدمتكم</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            خطوط هاتفية مباشرة متاحة طيلة أيام الأسبوع للإجابة الفورية عن استفساراتكم حول الأسعار والتوفر ومواعيد التوصيل.
          </p>
        </div>
      </div>

      {/* DEDICATED 3 BRANCHES EMBEDDED */}
      <div className="border-t border-[#EEEEEE] pt-6">
        <BranchesSection />
      </div>

      {/* CTA Box */}
      <div className="text-center bg-[#1E1E1E] text-white p-12 md:p-16 rounded-xs space-y-6 border border-[#2E2E2E] shadow-xl">
        <h2 className="font-cairo text-3xl md:text-4xl font-bold text-white">
          تفضلوا بزيارة أيٍّ من فروعنا في جيجل
        </h2>
        <p className="text-sm text-[#CCCCCC] max-w-xl mx-auto">
          يسرنا استقبالكم في أي من فروعنا الثلاثة للتعرف على أحدث الموديلات والاستفادة من استشارات فريقنا المتخصص.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="px-7 py-3.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-xs font-bold rounded-xs transition-colors shadow-xs"
          >
            صفحة الاتصال والمواقع
          </Link>
          <a
            href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xs border border-white/20 transition-colors inline-flex items-center gap-2"
          >
            <Facebook className="w-4 h-4 text-[#FF551A]" />
            <span>صفحتنا على فيسبوك (73,000+ متابع)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xs border border-white/20 transition-colors inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-[#FF551A]" />
            <span>حسابنا على انستغرام</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
