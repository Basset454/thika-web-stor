import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category } from '../types';
import { api } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'الكل';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'متوفر' | 'غير متوفر'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync category param with URL
  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    if (catName === 'الكل') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catName);
    }
    setSearchParams(searchParams);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'الكل' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailability =
      availabilityFilter === 'all' || p.availability === availabilityFilter;

    return matchesCategory && matchesSearch && matchesAvailability;
  });

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-12 font-cairo">
      {/* Editorial Header */}
      <div className="space-y-3.5 max-w-3xl">
        <span className="text-xs font-bold text-[#FF551A] block">
          الكتالوج الكامل
        </span>
        <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
          تشكيلات الأثاث المعروضة
        </h1>
        <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
          تصفح أرقى أطقم الصالونات وغرف النوم المتوفرة في فروع متجر أثاث الثقة بجيجل (3 فروع في مناطق مختلفة). جميع القطع متاحة للمعاينة الحية والمباشرة.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="space-y-6 pt-4 border-t border-[#EEEEEE]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategorySelect('الكل')}
              className={`px-4 py-2 text-xs font-bold rounded-xs transition-colors whitespace-nowrap ${
                selectedCategory === 'الكل'
                  ? 'bg-[#FF551A] text-white shadow-xs'
                  : 'bg-[#F5F5F5] text-[#1E1E1E] hover:bg-[#EAEAEA]'
              }`}
            >
              جميع المنتجات ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.name)}
                className={`px-4 py-2 text-xs font-bold rounded-xs transition-colors whitespace-nowrap ${
                  selectedCategory === c.name
                    ? 'bg-[#FF551A] text-white shadow-xs'
                    : 'bg-[#F5F5F5] text-[#1E1E1E] hover:bg-[#EAEAEA]'
                }`}
              >
                {c.name} {c.productCount !== undefined && `(${c.productCount})`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#888888] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن اسم الموديل أو الصالون..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
            />
          </div>
        </div>

        {/* Secondary Filter: Availability */}
        <div className="flex items-center gap-4 text-xs text-[#757575] pt-2">
          <span className="font-medium">حالة التوفر:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAvailabilityFilter('all')}
              className={`hover:text-[#1E1E1E] transition-colors ${
                availabilityFilter === 'all' ? 'font-bold text-[#FF551A] underline underline-offset-4 decoration-[#FF551A]' : ''
              }`}
            >
              الكل
            </button>
            <span>/</span>
            <button
              onClick={() => setAvailabilityFilter('متوفر')}
              className={`hover:text-[#1E1E1E] transition-colors ${
                availabilityFilter === 'متوفر' ? 'font-bold text-[#FF551A] underline underline-offset-4 decoration-[#FF551A]' : ''
              }`}
            >
              متوفر حالياً
            </button>
            <span>/</span>
            <button
              onClick={() => setAvailabilityFilter('غير متوفر')}
              className={`hover:text-[#1E1E1E] transition-colors ${
                availabilityFilter === 'غير متوفر' ? 'font-bold text-[#FF551A] underline underline-offset-4 decoration-[#FF551A]' : ''
              }`}
            >
              غير متوفر
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 bg-[#F5F5F5] rounded-xs animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#EEEEEE] rounded-xs p-12 space-y-4">
            <p className="text-base font-bold text-[#1E1E1E]">لا توجد نتائج مطابقة لبحثك</p>
            <p className="text-xs text-[#757575]">
              جرب تغيير كلمات البحث أو اختيار فئة أخرى من القائمة أعلاه.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('الكل');
                setSearchQuery('');
                setAvailabilityFilter('all');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] text-xs font-bold text-[#1E1E1E] rounded-xs hover:bg-[#EAEAEA] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة ضبط التصفية</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
