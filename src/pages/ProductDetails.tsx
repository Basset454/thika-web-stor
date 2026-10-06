import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Check,
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!slug) return;

    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProduct(slug);
        setProduct(data.product);
        setRelatedProducts(data.related || []);
        setActiveImageIndex(0);
      } catch (err: any) {
        setError(err.message || 'فشل تحميل بيانات المنتج');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-7 aspect-4/3 bg-[#EAE6DD] rounded-xs" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-6 w-24 bg-[#EAE6DD] rounded-xs" />
            <div className="h-10 w-3/4 bg-[#EAE6DD] rounded-xs" />
            <div className="h-24 w-full bg-[#EAE6DD] rounded-xs" />
            <div className="h-14 w-full bg-[#EAE6DD] rounded-xs" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-36 pb-24 max-w-2xl mx-auto px-6 text-center space-y-6">
        <h2 className="font-serif-luxury text-3xl font-bold text-[#1A1A1A]">عذراً، المنتج غير متوفر</h2>
        <p className="text-sm text-[#7D7365]">
          المنتج الذي تبحث عنه قد تم نقله أو لا يتوفر في الكتالوج الحالي.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold rounded-xs"
        >
          <span>تصفح جميع المنتجات</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.mainImage];
  const activeImage = images[activeImageIndex] || product.mainImage;

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أستفسر بخصوص المنتج: ${product.name} المعروض في أثاث الثقة جيجل 18.`
  );

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-20">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs md:text-sm text-[#7A7265] border-b border-[#EAE6DD] pb-4 font-normal">
        <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#1A1A1A] transition-colors">
          المنتجات
        </Link>
        <span>/</span>
        <Link
          to={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#1A1A1A] transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#1A1A1A] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Sticky Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 bg-[#F4F1EA] rounded-xs overflow-hidden border border-[#EBE7DF] group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Lightbox button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 left-4 p-2.5 bg-white/90 hover:bg-white text-[#1A1A1A] rounded-xs shadow-xs transition-colors"
              title="تكبير الصورة"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Slider arrows if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1A1A1A] rounded-xs transition-colors shadow-xs"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1A1A1A] rounded-xs transition-colors shadow-xs"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}

            {product.featured && (
              <span className="absolute top-4 right-4 bg-[#1A1A1A]/85 backdrop-blur-xs text-[#FAF9F5] text-xs font-semibold px-3 py-1 rounded-xs">
                تشكيلة مميزة
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 shrink-0 rounded-xs overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1A1A1A] shadow-xs'
                      : 'border-[#E2DDCF] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Contiguous Purchase & Inquiry Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {/* Metadata & Title */}
          <div className="space-y-2.5 border-b border-[#EAE6DD] pb-6">
            <div className="flex items-center justify-between text-xs md:text-sm text-[#7A7265]">
              <span className="font-semibold text-[#8C7355]">{product.category}</span>
              <span
                className={`font-semibold ${
                  product.availability === 'متوفر' ? 'text-[#3E7B54]' : 'text-[#8A8175]'
                }`}
              >
                حالة التوفر: {product.availability}
              </span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-[1.3] text-balance-ar">
              {product.name}
            </h1>

            {/* Price or Call to action */}
            <div className="pt-2">
              {product.price ? (
                <div className="space-y-0.5">
                  <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A] tabular-nums" dir="ltr">
                    {product.price.toLocaleString('fr-DZ')} DA
                  </span>
                  <p className="text-xs text-[#8C8275] font-normal">السعر شامل المعاينة بالمعرض</p>
                </div>
              ) : (
                <div className="inline-block py-2 px-3.5 bg-[#F0ECE4] text-[#1A1A1A] text-xs md:text-sm font-semibold rounded-xs">
                  للاستفسار عن السعر والمقاسات
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <h3 className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
              تفاصيل القطعة
            </h3>
            <p className="text-sm md:text-base text-[#4A463F] leading-relaxed md:leading-[1.8] font-normal whitespace-pre-line">
              {product.description ||
                'صالون وتشكيلة فاخرة مجهزة بأعلى معايير الحرفية والمتانة لتناسب أرقى فضاءات المعيشة.'}
            </p>
          </div>

          {/* Direct Actions: Call & WhatsApp */}
          <div className="pt-4 space-y-3">
            <a
              href="tel:0560107745"
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-sm font-bold rounded-xs transition-colors shadow-xs"
              dir="ltr"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>اتصال مباشر: 0560 10 77 45</span>
            </a>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/213560107745?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#147A3B] text-xs font-semibold rounded-xs border border-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب المعرض</span>
              </a>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 bg-[#EFECE4] hover:bg-[#E5DFD3] text-[#1A1A1A] text-xs font-semibold rounded-xs border border-[#DDD6C8] transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'تم نسخ الرابط' : 'مشاركة القطعة'}</span>
              </button>
            </div>
          </div>

          {/* Showroom Trust Callout */}
          <div className="bg-[#FAF7F0] border border-[#E8E1D3] p-4 rounded-xs space-y-2 text-xs text-[#6B6458]">
            <div className="flex items-center gap-2 text-[#1A1A1A] font-semibold">
              <MapPin className="w-4 h-4 text-[#8C7355]" />
              <span>معاينة حية في بورمل، جيجل</span>
            </div>
            <p className="leading-relaxed">
              المعروضات متوفرة في صالات عرض المعرض الداخلي مع طابق تحت الأرض للاطلاع على كافة التفاصيل.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://maps.app.goo.gl/XYLZfTao58Y5pydc6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C7355] hover:underline font-semibold"
              >
                عرض الموقع على خرائط Google ←
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 left-6 p-3 text-white/80 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xs"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-[#EAE6DD] space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              قطع أخرى من تشكيلة {product.category}
            </h2>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-[#8C7355] hover:underline"
            >
              عرض الكل ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
