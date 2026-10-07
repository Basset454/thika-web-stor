import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Compass, Facebook, Instagram } from 'lucide-react';
import { TrustLogo } from './TrustLogo';

export const Footer: React.FC = () => {
  return (
    <footer data-nav-theme="dark" className="bg-[#1E1E1E] text-[#D4D4D4] pt-20 pb-12 border-t border-[#2E2E2E] font-cairo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand & Editorial Kicker */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#2C2C2C]">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <TrustLogo variant="dark" size="lg" />
            <p className="text-sm leading-relaxed text-[#B0B0B0] pt-2">
              "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
            </p>
            <p className="text-xs text-[#999999] leading-relaxed">
              أحد أكبر وأرقى متاجر الأثاث الفاخر في ولاية جيجل مع 3 فروع متكاملة في مناطق مختلفة.
            </p>
            <div className="pt-1 text-xs text-[#CCCCCC] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF551A]"></span>
              <span>أكثر من 73,000 متابع على منصة فيسبوك</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-cairo text-sm font-bold text-white tracking-wide">
              أقسام المتجر
            </h4>
            <ul className="space-y-2.5 text-sm text-[#CCCCCC] font-normal">
              <li>
                <Link to="/salons" className="hover:text-[#FF551A] transition-colors">
                  أطقم الصالونات الفاخرة
                </Link>
              </li>
              <li>
                <Link to="/bedrooms" className="hover:text-[#FF551A] transition-colors">
                  غرف النوم العصرية
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#FF551A] transition-colors">
                  الكتالوج الكامل للمنتجات
                </Link>
              </li>
              <li>
                <a href="/#branches" className="hover:text-[#FF551A] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF551A]"></span>
                  <span>فروعنا الـ 3 بجيجل</span>
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF551A] transition-colors">
                  عن المتجر والهوية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF551A] transition-colors">
                  مواقع الفروع والتواصل المباشر
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Facebook */}
          <div className="space-y-4">
            <h4 className="font-cairo text-sm font-bold text-white tracking-wide">
              التواصل والصفحة الرسمية
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF551A] shrink-0" />
                <a
                  href="tel:0560107745"
                  className="font-medium hover:text-[#FF551A] transition-colors"
                  dir="ltr"
                >
                  0560 10 77 45 (الرئيسي)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF551A]/80 shrink-0" />
                <a
                  href="tel:0664029968"
                  className="hover:text-[#FF551A] transition-colors text-xs text-[#B0B0B0]"
                  dir="ltr"
                >
                  0664 02 99 68
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF551A]/80 shrink-0" />
                <a
                  href="tel:0659022199"
                  className="hover:text-[#FF551A] transition-colors text-xs text-[#B0B0B0]"
                  dir="ltr"
                >
                  0659 02 21 99
                </a>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Mail className="w-4 h-4 text-[#FF551A] shrink-0" />
                <a
                  href="mailto:meubleconfiancejijel18@gmail.com"
                  className="text-xs text-[#B0B0B0] hover:text-[#FF551A] transition-colors break-all"
                >
                  meubleconfiancejijel18@gmail.com
                </a>
              </div>

              {/* Official Social Links */}
              <div className="pt-2 space-y-2">
                <a
                  href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-[#252525] hover:bg-[#FF551A] hover:text-white border border-[#3A3A3A] hover:border-[#FF551A] rounded-xs text-xs font-bold text-white transition-all duration-200 w-full"
                >
                  <Facebook className="w-4 h-4 text-[#FF551A] group-hover:text-white shrink-0" />
                  <span>صفحتنا على فيسبوك (73K+)</span>
                  <ExternalLink className="w-3 h-3 ms-auto opacity-70" />
                </a>

                <a
                  href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-3.5 py-2.5 bg-[#252525] hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white border border-[#3A3A3A] hover:border-[#E1306C] rounded-xs text-xs font-bold text-white transition-all duration-200 w-full"
                >
                  <Instagram className="w-4 h-4 text-[#FF551A] group-hover:text-white shrink-0" />
                  <span>حسابنا على انستغرام</span>
                  <ExternalLink className="w-3 h-3 ms-auto opacity-70" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: 3 Branches in Jijel with Google Maps */}
          <div className="space-y-4">
            <h4 className="font-cairo text-sm font-bold text-white tracking-wide">
              فروعنا في ولاية جيجل
            </h4>
            <div className="space-y-2.5 text-xs text-[#CCCCCC]">
              <p className="text-[11px] text-[#999999]">
                3 فروع بمناطق مختلفة لخدمتكم:
              </p>

              {/* Branch 1 */}
              <a
                href="https://www.google.com/maps/place/%D8%A3%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A91+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8200257,5.7294576,4607m/data=!3m1!1e3!4m10!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m6!1s0x12f261002b2eb5d3:0x7b2d2be90dbcde30!8m2!3d36.8206112!4d5.7504023"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2.5 bg-[#252525] hover:bg-[#2C2C2C] border border-[#333333] hover:border-[#FF551A]/50 rounded-xs transition-colors"
              >
                <div className="flex items-center justify-between font-bold text-white group-hover:text-[#FF551A]">
                  <span>أثاث الثقة 1 (وسط جيجل)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </div>
                <span className="text-[11px] text-[#888888] block mt-0.5">حي المقاصب · وسط المدينة</span>
              </a>

              {/* Branch 2 */}
              <a
                href="https://www.google.com/maps/place/%D8%A7%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A92+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8117114,5.7185571,4608m/data=!3m1!1e3!4m9!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m5!1s0x12f25f006eb10d9b:0xb12ebce067b7f061!8m2!3d36.8110757!4d5.7516807"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2.5 bg-[#252525] hover:bg-[#2C2C2C] border border-[#333333] hover:border-[#FF551A]/50 rounded-xs transition-colors"
              >
                <div className="flex items-center justify-between font-bold text-white group-hover:text-[#FF551A]">
                  <span>أثاث الثقة 2 (بورمل)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </div>
                <span className="text-[11px] text-[#888888] block mt-0.5">المدخل الشرقي · طابق تحت الأرض</span>
              </a>

              {/* Branch 3 */}
              <a
                href="https://www.google.com/maps/place/%D8%A3%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A9+3+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8118488,5.6986443,4607m/data=!3m1!1e3!4m10!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m6!1s0x12f25f00341319c7:0x15cac686cc514ab!8m2!3d36.8141843!4d5.740565"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2.5 bg-[#252525] hover:bg-[#2C2C2C] border border-[#333333] hover:border-[#FF551A]/50 rounded-xs transition-colors"
              >
                <div className="flex items-center justify-between font-bold text-white group-hover:text-[#FF551A]">
                  <span>أثاث الثقة 3 (حي الفرسان)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </div>
                <span className="text-[11px] text-[#888888] block mt-0.5">المدخل الغربي لجيجل</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} متجر أثاث الثقة جيجل 18. جميع الحقوق محفوظة.</span>
            <span>·</span>
            <span>3 فروع في ولاية جيجل</span>
          </div>

          <p className="text-xs text-[#777777]">
            أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة.
          </p>
        </div>
      </div>
    </footer>
  );
};
