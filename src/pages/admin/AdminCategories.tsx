import React, { useState, useEffect } from 'react';
import { Category } from '../../types';
import { api } from '../../services/api';
import { Layers, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await api.createCategory({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
      setSuccess('تمت إضافة الفئة بنجاح');
      loadCategories();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || 'فشل إضافة الفئة');
    } finally {
      setSubmitting(false);
    }
  };

  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await api.deleteCategory(categoryToDelete.id);
      setSuccess(`تم حذف فئة "${categoryToDelete.name}" بنجاح`);
      setTimeout(() => setSuccess(null), 3000);
      setCategoryToDelete(null);
      loadCategories();
    } catch (err: any) {
      setError('فشل حذف الفئة');
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-xs border border-[#E8E2D6] shadow-xs">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
          إدارة فئات وأقسام الأثاث
        </h2>
        <p className="text-xs text-[#7D7365] mt-1">
          إضافة أقسام جديدة مثل (صالونات، غرف نوم، طاولات طعام، مكاتب) لتصنيف المنتجات بسهولة
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Categories List (Right side) */}
        <div className="md:col-span-7 bg-white rounded-xs border border-[#E8E2D6] overflow-hidden shadow-xs">
          <div className="p-5 border-b border-[#E8E2D6] flex items-center justify-between">
            <h3 className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
              الفئات الحالية ({categories.length})
            </h3>
            <span className="text-[11px] text-[#8C8275]">تحديث حي مع قاعدة البيانات</span>
          </div>

          <div className="divide-y divide-[#EAE6DD]">
            {loading ? (
              <div className="p-8 text-center text-[#7D7365] text-xs">جاري تحميل الفئات...</div>
            ) : categories.length > 0 ? (
              categories.map((c) => (
                <div key={c.id} className="p-4 flex items-center justify-between hover:bg-[#FAF9F5] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1A1A1A]">{c.name}</span>
                      <span className="text-xs text-[#8C7355] bg-[#F5F2EA] px-2 py-0.5 rounded-xs">
                        {c.productCount || 0} منتج
                      </span>
                    </div>
                    {c.description && (
                      <p className="text-xs text-[#7D7365]">{c.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => setCategoryToDelete({ id: c.id, name: c.name })}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xs transition-colors"
                    title="حذف الفئة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#7D7365] text-xs">لا توجد فئات مسجلة</div>
            )}
          </div>
        </div>

        {/* Add Category Form (Left side) */}
        <div className="md:col-span-5 bg-white p-6 rounded-xs border border-[#E8E2D6] shadow-xs space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A] border-b border-[#E8E2D6] pb-3">
            إضافة فئة جديدة
          </h3>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                اسم الفئة <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: طاولات طعام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                وصف الفئة (اختياري)
              </label>
              <textarea
                rows={3}
                placeholder="وصف موجز لطبيعة القطع في هذه الفئة..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-xs font-bold rounded-xs transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{submitting ? 'جاري الإضافة...' : 'إضافة الفئة لقاعدة البيانات'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* In-app Category Deletion Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xs max-w-md w-full p-6 border border-[#E8E2D6] space-y-4 shadow-xl">
            <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
              تأكيد حذف الفئة
            </h3>
            <p className="text-xs text-[#6B6458] leading-relaxed">
              هل أنت متأكد من رغبتك في حذف فئة <strong>"{categoryToDelete.name}"</strong> من قاعدة البيانات؟
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2 text-xs text-[#595349] hover:text-[#1A1A1A]"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={confirmDeleteCategory}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xs transition-colors"
              >
                تأكيد حذف الفئة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
