import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowUpLeft } from 'lucide-react';

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

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'الصالونات', path: '/salons' },
    { label: 'غرف النوم', path: '/bedrooms' },
    { label: 'كل المنتجات', path: '/products' },
    { label: 'عن المعرض', path: '/about' },
    { label: 'تواصل معنا', path: '/contact' },
  ];

  // Visual styling calculation
  const isDark = isHomePage ? currentTheme === 'dark' : false;
  const isTransparent = isHomePage && !isScrolled && currentTheme === 'dark';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isTransparent
          ? 'bg-transparent text-white'
          : isDark
          ? 'bg-[#12110F]/90 backdrop-blur-md shadow-md border-b border-white/10 text-white'
          : 'bg-[#FAF9F5]/90 backdrop-blur-md shadow-xs border-b border-[#E8E2D6] text-[#1A1A1A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="group flex flex-col focus-visible:outline-hidden"
          aria-label="أثاث الثقة جيجل 18 - الصفحة الرئيسية"
        >
          <span
            className={`font-serif-luxury text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
              isDark
                ? 'text-white group-hover:text-[#C5A880]'
                : 'text-[#1A1A1A] group-hover:text-[#8C7355]'
            }`}
          >
            أثاث الثقة
          </span>
          <span
            className={`text-[11px] tracking-widest font-semibold transition-colors ${
              isDark ? 'text-[#C5A880]' : 'text-[#8C7355]'
            }`}
          >
            JIJEL 18
          </span>
        </Link>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 transition-colors ${
                  isDark
                    ? isActive
                      ? 'text-white font-bold'
                      : 'text-[#D8D4CD] hover:text-white'
                    : isActive
                    ? 'text-[#1A1A1A] font-bold'
                    : 'text-[#5C564E] hover:text-[#1A1A1A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full ${
                      isDark ? 'bg-[#C5A880]' : 'bg-[#8C7355]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:0560107745"
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-[#EFECE4] hover:bg-[#E5E0D5] text-[#1A1A1A] border border-[#DDD6C8]'
            }`}
            dir="ltr"
          >
            <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-[#C5A880]' : 'text-[#8C7355]'}`} />
            <span className="tracking-wide">0560 10 77 45</span>
          </a>
          <Link
            to="/products"
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
              isDark
                ? 'bg-[#C5A880] hover:bg-[#D4BC98] text-[#1A1A1A]'
                : 'bg-[#1A1A1A] hover:bg-[#33302B] text-white'
            }`}
          >
            <span>التشكيلة</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="tel:0560107745"
            className={`p-2 rounded-xs ${
              isDark ? 'bg-white/10 text-white' : 'bg-[#EFECE4] text-[#1A1A1A]'
            }`}
            aria-label="الاتصال بالمعرض"
          >
            <Phone className={`w-4 h-4 ${isDark ? 'text-[#C5A880]' : 'text-[#8C7355]'}`} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${
              isDark ? 'text-white hover:text-[#C5A880]' : 'text-[#1A1A1A] hover:text-[#8C7355]'
            }`}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF9F5] border-b border-[#E8E2D6] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-[#1A1A1A]">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 border-b border-[#EAE6DD] flex items-center justify-between ${
                  location.pathname === link.path ? 'text-[#8C7355] font-bold' : 'text-[#2D2A26]'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpLeft className="w-4 h-4 opacity-40" />
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:0560107745"
                className="flex items-center justify-center gap-2 py-3 bg-[#EFECE4] text-[#1A1A1A] text-sm font-semibold rounded-xs border border-[#DDD6C8]"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#8C7355]" />
                <span>0560 10 77 45</span>
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center py-3 bg-[#1A1A1A] text-white text-sm font-semibold rounded-xs"
              >
                تواصل مع إدارة المعرض
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
