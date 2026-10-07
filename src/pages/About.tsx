import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Compass, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-24 font-cairo">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-5">
        <span className="text-xs font-bold text-[#FF551A] block">
          عن المعرض والهوية
        </span>
        <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E] leading-[1.25] text-balance-ar">
          أثاث الثقة جيجل 18
        </h1>
        <p className="font-cairo text-lg md:text-2xl text-[#FF551A] font-bold leading-[1.4] text-balance-ar">
          "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
        </p>
        <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
          يقع معرضنا في <strong>بورمل، بمدينة جيجل</strong> في الجزائر. تأسست سمعتنا على الالتزام بتقديم قطع أثاث عالية الجودة تلبي تطلعات العائلات الجزائرية الراغبة في الجمع بين راحة الاستخدام وجمالية التصميم المعاصر.
        </p>
      </div>

      {/* Showroom Architecture Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F8F8F8] p-8 md:p-14 rounded-xs border border-[#EEEEEE]">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF551A]">
            <Layers className="w-4 h-4" />
            <span>صالات العرض الداخلية</span>
          </div>
          <h2 className="font-cairo text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
            مساحات عرض متعددة تشمل طابقاً تحت الأرض
          </h2>
          <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
            حرصنا على تجهيز صالات عرض واسعة ومضيئة تتيح لزوارنا الكرام التجول براحة ومعاينة مختلف الأطقم والموديلات. كما يضم المعرض <strong>طابقاً تحت الأرض مخصصاً لتشكيلات مميزة</strong> من الصالونات وغرف النوم لتجربة بصرية شاملة.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm md:text-base text-[#1E1E1E] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#FF551A] shrink-0" />
              <span>معاينة حية للمقاسات والأقمشة والخامات</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base text-[#1E1E1E] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#FF551A] shrink-0" />
              <span>موقع استراتيجي سهل الوصول في بورمل، جيجل</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base text-[#1E1E1E] font-medium">
              <CheckCircle2 className="w-5 h-5 text-[#FF551A] shrink-0" />
              <span>مجتمع يتجاوز 73 ألف متابع عبر منصة فيسبوك</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-4/3 rounded-xs overflow-hidden shadow-lg border border-[#E5E5E5]">
            <img
              src="/src/assets/images/showroom_gallery_jijel_1791306361669.jpg"
              alt="معرض أثاث الثقة في بورمل جيجل"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Key Real Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <MapPin className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">الموقع الجغرافي</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            بورمل، ولاية جيجل (18)، الجزائر. بالقرب من المحاور الرئيسية وسهل الوصول لركن السيارات.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">الثقة والمصداقية</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            الاسم مستوحى من مبدأ الصدق في التعامل، ومرافقة الزبائن بالنصيحة الصادقة لاختيار الأنسب.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/30 transition-colors space-y-3 shadow-xs">
          <Phone className="w-6 h-6 text-[#FF551A]" />
          <h3 className="font-cairo text-xl font-bold text-[#1E1E1E]">فريق في خدمتكم</h3>
          <p className="text-xs text-[#757575] leading-relaxed">
            خطوط هاتفية مباشرة متاحة طيلة أيام الأسبوع للإجابة عن استفساراتكم حول الأسعار والتوفر.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center bg-[#1E1E1E] text-white p-12 md:p-16 rounded-xs space-y-6 border border-[#2E2E2E] shadow-xl">
        <h2 className="font-cairo text-3xl md:text-4xl font-bold text-white">
          تفضلوا بزيارة معرضنا في بورمل
        </h2>
        <p className="text-sm text-[#CCCCCC] max-w-xl mx-auto">
          يسرنا استقبالكم في المعرض للتعرف على أحدث الموديلات والاستفادة من استشارات فريقنا.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="px-7 py-3.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-xs font-bold rounded-xs transition-colors shadow-xs"
          >
            صفحة الاتصال والموقع
          </Link>
          <a
            href="https://maps.app.goo.gl/XYLZfTao58Y5pydc6"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xs border border-white/20 transition-colors inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#FF551A]" />
            <span>عرض الموقع في خرائط Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};
