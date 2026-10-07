import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpLeft, Facebook, Instagram } from 'lucide-react';
import { TrustLogo } from './TrustLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      if (!isHomePage) {
        setCurrentTheme('light');
        return;
      }

      // Detect which section is under the navbar (approx 80px from top)
      const themeSections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let foundTheme: 'dark' | 'light' = 'dark';

      for (let i = 0; i < themeSections.length; i++) {
        const rect = themeSections[i].getBoundingClientRect();
        // Check if top of section is at or above the navbar, and bottom is below navbar
        if (rect.top <= 80 && rect.bottom > 80) {
          foundTheme = (themeSections[i].getAttribute('data-nav-theme') as 'dark' | 'light') || 'dark';
          break;
        }
      }
      setCurrentTheme(foundTheme);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Handle hash scrolling if navigating with #branches
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  }, [location]);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'الصالونات', path: '/salons' },
    { label: 'غرف النوم', path: '/bedrooms' },
    { label: 'كل المنتجات', path: '/products' },
    { label: 'فروعنا (3)', path: '/#branches' },
    { label: 'عن المتجر', path: '/about' },
    { label: 'تواصل معنا', path: '/contact' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const hashId = path.split('#')[1];
      if (isHomePage) {
        e.preventDefault();
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Visual styling calculation
  const isDark = isHomePage ? currentTheme === 'dark' : false;
  const isTransparent = isHomePage && !isScrolled && currentTheme === 'dark';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isTransparent
          ? 'bg-transparent text-white'
          : isDark
          ? 'bg-[#1E1E1E]/95 backdrop-blur-md shadow-md border-b border-white/10 text-white'
          : 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#EAEAEA] text-[#1E1E1E]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Distinctive Square-Kufi Logo Mark & Wordmark */}
        <Link
          to="/"
          className="group focus-visible:outline-hidden"
          aria-label="أثاث الثقة جيجل 18 - متجر الأثاث الفاخر"
        >
          <TrustLogo variant={isDark ? 'dark' : 'light'} size="md" />
        </Link>

        {/* Zone 2: Clean Cairo navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[15px] font-medium font-cairo">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path && !link.path.includes('#');
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`relative py-1.5 transition-colors ${
                  isDark
                    ? isActive
                      ? 'text-white font-bold'
                      : 'text-white/80 hover:text-white'
                    : isActive
                    ? 'text-[#FF551A] font-bold'
                    : 'text-[#4A4A4A] hover:text-[#1E1E1E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-[#FF551A]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Official Facebook Icon Button */}
          <a
            href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-xs transition-colors ${
              isDark
                ? 'bg-white/10 hover:bg-[#FF551A] text-white border border-white/20'
                : 'bg-[#F8F8F8] hover:bg-[#FF551A] hover:text-white text-[#1E1E1E] border border-[#E5E5E5]'
            }`}
            title="صفحة أثاث الثقة الرسمية على فيسبوك (73K+ متابع)"
            aria-label="صفحة فيسبوك"
          >
            <Facebook className="w-4 h-4" />
          </a>

          {/* Official Instagram Icon Button */}
          <a
            href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-xs transition-colors ${
              isDark
                ? 'bg-white/10 hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white border border-white/20'
                : 'bg-[#F8F8F8] hover:bg-gradient-to-tr hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-white text-[#1E1E1E] border border-[#E5E5E5]'
            }`}
            title="حساب أثاث الثقة الرسمي على انستغرام"
            aria-label="حساب انستغرام"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href="tel:0560107745"
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap font-cairo ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-[#F8F8F8] hover:bg-[#EFEFEF] text-[#1E1E1E] border border-[#E5E5E5]'
            }`}
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF551A]" />
            <span className="tracking-wide">0560 10 77 45</span>
          </a>
          <Link
            to="/products"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xs transition-all whitespace-nowrap bg-[#FF551A] hover:bg-[#E04812] text-white shadow-xs"
          >
            <span>التشكيلة</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-1.5">
          <a
            href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-xs ${
              isDark ? 'bg-white/10 text-white' : 'bg-[#F8F8F8] text-[#1E1E1E]'
            }`}
            aria-label="فيسبوك"
          >
            <Facebook className="w-4 h-4 text-[#FF551A]" />
          </a>
          <a
            href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-xs ${
              isDark ? 'bg-white/10 text-white' : 'bg-[#F8F8F8] text-[#1E1E1E]'
            }`}
            aria-label="انستغرام"
          >
            <Instagram className="w-4 h-4 text-[#FF551A]" />
          </a>
          <a
            href="tel:0560107745"
            className={`p-2 rounded-xs ${
              isDark ? 'bg-white/10 text-white' : 'bg-[#F8F8F8] text-[#1E1E1E]'
            }`}
            aria-label="الاتصال بالمتجر"
          >
            <Phone className="w-4 h-4 text-[#FF551A]" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              isDark ? 'text-white hover:text-[#FF551A]' : 'text-[#1E1E1E] hover:text-[#FF551A]'
            }`}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-[#EAEAEA] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-[#1E1E1E]">
          <nav className="flex flex-col gap-3 font-cairo text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleLinkClick(link.path, e)}
                className={`py-2.5 border-b border-[#F0F0F0] flex items-center justify-between ${
                  location.pathname === link.path && !link.path.includes('#')
                    ? 'text-[#FF551A] font-bold'
                    : 'text-[#2B2B2B]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpLeft className="w-4 h-4 opacity-40" />
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#1E1E1E] text-white text-sm font-semibold rounded-xs"
              >
                <Facebook className="w-4 h-4 text-[#FF551A]" />
                <span>صفحتنا على فيسبوك (73,000+ متابع)</span>
              </a>
              <a
                href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 hover:from-[#833ab4]/30 text-[#1E1E1E] border border-[#E0E0E0] text-sm font-semibold rounded-xs transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>تابعنا على انستغرام</span>
              </a>
              <a
                href="tel:0560107745"
                className="flex items-center justify-center gap-2 py-3 bg-[#F8F8F8] text-[#1E1E1E] text-sm font-semibold rounded-xs border border-[#E5E5E5]"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#FF551A]" />
                <span>0560 10 77 45</span>
              </a>
              <Link
                to="/products"
                className="flex items-center justify-center py-3 bg-[#FF551A] hover:bg-[#E04812] text-white text-sm font-bold rounded-xs transition-colors"
              >
                تصفح تشكيلة الأثاث
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
