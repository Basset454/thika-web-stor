import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer data-nav-theme="dark" className="bg-[#171614] text-[#D8D4CD] pt-20 pb-12 border-t border-[#2E2B27]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand & Editorial Kicker */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#2A2723]">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div>
              <span className="font-serif-luxury text-3xl font-bold tracking-tight text-[#FAF9F5]">
                أثاث الثقة
              </span>
              <p className="text-xs text-[#A89379] tracking-widest font-semibold mt-1">
                JIJEL 18 · MEUBLE DE CONFIANCE
              </p>
            </div>
            <p className="text-sm leading-relaxed text-[#A9A49B] pt-2">
              "أثاث الثقة… اختيارٌ يليق بمن يرى الفخامة أسلوب حياة."
            </p>
            <div className="pt-2 text-xs text-[#8F897F] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80"></span>
              <span>أكثر من 73,000 متابع يثقون في معروضاتنا</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-[#FAF9F5]">
              أقسام المعرض
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8C2B7] font-normal">
              <li>
                <Link to="/salons" className="hover:text-[#FAF9F5] transition-colors">
                  أطقم الصالونات الفاخرة
                </Link>
              </li>
              <li>
                <Link to="/bedrooms" className="hover:text-[#FAF9F5] transition-colors">
                  غرف النوم العصرية
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#FAF9F5] transition-colors">
                  الكتالوج الكامل للمنتجات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FAF9F5] transition-colors">
                  عن المعرض والطوابق
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FAF9F5] transition-colors">
                  موقعنا والتواصل المباشر
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-[#FAF9F5]">
              أرقام التواصل والاستفسار
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A89379] shrink-0" />
                <a
                  href="tel:0560107745"
                  className="font-medium hover:text-[#FAF9F5] transition-colors"
                  dir="ltr"
                >
                  0560 10 77 45 (الرئيسي)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A89379] shrink-0" />
                <a
                  href="tel:0664029968"
                  className="hover:text-[#FAF9F5] transition-colors text-xs text-[#A9A49B]"
                  dir="ltr"
                >
                  0664 02 99 68
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#A89379] shrink-0" />
                <a
                  href="tel:0659022199"
                  className="hover:text-[#FAF9F5] transition-colors text-xs text-[#A9A49B]"
                  dir="ltr"
                >
                  0659 02 21 99
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Mail className="w-4 h-4 text-[#A89379] shrink-0" />
                <a
                  href="mailto:meubleconfiancejijel18@gmail.com"
                  className="text-xs text-[#A9A49B] hover:text-[#FAF9F5] transition-colors break-all"
                >
                  meubleconfiancejijel18@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Showroom Location & Maps */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-sm font-bold text-[#FAF9F5]">
              عنوان المعرض
            </h4>
            <div className="space-y-3 text-sm text-[#C8C2B7] font-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A89379] shrink-0 mt-0.5" />
                <span>بورمل، جيجل، الجزائر</span>
              </div>
              <p className="text-xs text-[#8F897F] leading-relaxed">
                معرض داخلي فسيح يشمل طابقاً تحت الأرض مجهزاً بكافة التشكيلات المعروضة.
              </p>
              <a
                href="https://maps.app.goo.gl/XYLZfTao58Y5pydc6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1A1A1A] bg-[#C5A880] hover:bg-[#D4BC98] rounded-xs transition-colors mt-2"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>فتح في خرائط Google</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Discreet Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8F897F] gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} أثاث الثقة جيجل 18. جميع الحقوق محفوظة.</span>
            <span>·</span>
            <span>بورمل، جيجل</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-[#6E6860] hover:text-[#A89379] transition-colors flex items-center gap-1.5"
              title="دخول إدارة المعرض"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>إدارة المعرض</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
