import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import { api } from '../../services/api';
import {
  X,
  Upload,
  Trash2,
  Star,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  initialData?: Product | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  initialData,
  onClose,
  onSuccess,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [availability, setAvailability] = useState<'متوفر' | 'غير متوفر'>('متوفر');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load categories
    api.getCategories().then((cats) => {
      setCategories(cats);
      if (!category && cats.length > 0) {
        setCategory(cats[0].name);
      }
    });

    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setDescription(initialData.description || '');
      setPrice(initialData.price ? String(initialData.price) : '');
      setAvailability(initialData.availability);
      setFeatured(initialData.featured);
      setImages(initialData.images || []);
      setMainImage(initialData.mainImage || initialData.images?.[0] || '');
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setAvailability('متوفر');
      setFeatured(false);
      // Default to one high quality stock asset if brand new
      setImages(['/src/assets/images/hero_luxury_furniture_1791306311706.jpg']);
      setMainImage('/src/assets/images/hero_luxury_furniture_1791306311706.jpg');
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    setError(null);
    try {
      const urls = await api.uploadImages(e.target.files);
      setImages((prev) => [...prev, ...urls]);
      if (!mainImage && urls.length > 0) {
        setMainImage(urls[0]);
      }
    } catch (err: any) {
      setError(err.message || 'فشل رفع الصور');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const targetUrl = images[indexToRemove];
    const newImages = images.filter((_, i) => i !== indexToRemove);
    setImages(newImages);

    if (mainImage === targetUrl) {
      setMainImage(newImages[0] || '');
    }

    // Call server to remove if uploaded
    if (targetUrl.startsWith('/uploads/')) {
      api.deleteImageFile(targetUrl).catch(console.error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى إدخال اسم المنتج');
      return;
    }
    if (!category.trim()) {
      setError('يرجى تحديد فئة المنتج');
      return;
    }
    if (images.length === 0) {
      setError('يرجى إضافة صورة واحدة على الأقل للمنتج');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price: price ? Number(price) : null,
      availability,
      featured,
      images,
      mainImage: mainImage || images[0],
    };

    try {
      if (initialData) {
        await api.updateProduct(initialData.id, payload);
      } else {
        await api.createProduct(payload);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'فشل حفظ بيانات المنتج');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xs max-w-2xl w-full border border-[#E8E2D6] shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E8E2D6] flex items-center justify-between bg-[#FAF9F5]">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1A1A1A]">
              {initialData ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمعرض'}
            </h3>
            <p className="text-xs text-[#7D7365] mt-0.5">
              سيتم حفظ البيانات مباشرة في قاعدة البيانات وعرضها في المتجر العام
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D7365] hover:text-[#1A1A1A] transition-colors rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                اسم الموديل / المنتج <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: Salon 6P Livinda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                الفئة <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                السعر بالدينار الجزائري (اختياري)
              </label>
              <input
                type="number"
                placeholder="اتركه فارغاً لعرض 'للاستفسار عن السعر'"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                حالة التوفر بالمعرض
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
              >
                <option value="متوفر">متوفر حالياً بالمعرض</option>
                <option value="غير متوفر">غير متوفر (نافد)</option>
              </select>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="p-3 bg-[#FAF8F3] border border-[#EAE4D7] rounded-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#1A1A1A] block">تمييز المنتج</span>
              <span className="text-[11px] text-[#7D7365]">
                عرض المنتج في قائمة المختارات المميزة على الصفحة الرئيسية
              </span>
            </div>
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#1A1A1A]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              وصف وتفاصيل القطعة
            </label>
            <textarea
              rows={3}
              placeholder="اكتب مواصفات الطقم، الأنسجة، عدد المقاعد، أو أي تفاصيل أخرى تخص الأثاث..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
            />
          </div>

          {/* Image Upload & Management */}
          <div className="space-y-3 pt-2 border-t border-[#E8E2D6]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1A1A1A] block">
                  صور المنتج والمعرض
                </span>
                <span className="text-[11px] text-[#7D7365]">
                  يمكنك رفع صور متعددة واختيار الصورة الرئيسية بالضغط عليها
                </span>
              </div>
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-xs font-semibold rounded-xs transition-colors">
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                <span>{uploading ? 'جاري الرفع...' : 'رفع صور جديدة'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
              {images.map((imgUrl, idx) => {
                const isMain = mainImage === imgUrl;
                return (
                  <div
                    key={idx}
                    className={`relative aspect-square rounded-xs overflow-hidden border-2 transition-all ${
                      isMain ? 'border-[#1A1A1A] shadow-md ring-2 ring-[#C5A880]' : 'border-[#DDD6C8]'
                    }`}
                  >
                    <img src={imgUrl} alt="صورة المنتج" className="w-full h-full object-cover" />

                    {/* Main Badge / Set as Main */}
                    <button
                      type="button"
                      onClick={() => setMainImage(imgUrl)}
                      className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded-xs ${
                        isMain ? 'bg-[#1A1A1A] text-white' : 'bg-white/80 hover:bg-white text-[#1A1A1A]'
                      }`}
                    >
                      {isMain ? 'الرئيسية ★' : 'تعيين'}
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute bottom-1.5 left-1.5 p-1 bg-rose-600/90 hover:bg-rose-600 text-white rounded-xs shadow-xs"
                      title="حذف الصورة"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#E8E2D6] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs text-[#595349] hover:text-[#1A1A1A] transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-xs font-bold rounded-xs transition-colors disabled:opacity-50"
            >
              {submitting ? 'جاري الحفظ...' : initialData ? 'تحديث المنتج' : 'حفظ ونشر المنتج'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
