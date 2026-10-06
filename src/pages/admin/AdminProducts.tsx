import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import { api } from '../../services/api';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Archive,
  RefreshCw,
  Star,
  ExternalLink,
} from 'lucide-react';
import { AdminProductModal } from './AdminProductModal';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'archived' | 'featured'>('all');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        api.getAdminProducts(),
        api.getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error('Error loading admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleToggleArchive = async (id: string) => {
    try {
      await api.toggleArchiveProduct(id);
      setToastMessage('تم تحديث حالة أرشفة المنتج بنجاح');
      setTimeout(() => setToastMessage(null), 3000);
      loadProducts();
    } catch (err) {
      setToastMessage('فشل تغيير حالة الأرشفة');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await api.toggleFeaturedProduct(id);
      setToastMessage('تم تحديث تمييز المنتج بنجاح');
      setTimeout(() => setToastMessage(null), 3000);
      loadProducts();
    } catch (err) {
      setToastMessage('فشل تغيير تمييز المنتج');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await api.deleteProduct(productToDelete.id);
      setToastMessage(`تم حذف المنتج "${productToDelete.name}" نهائياً`);
      setTimeout(() => setToastMessage(null), 3000);
      setProductToDelete(null);
      loadProducts();
    } catch (err) {
      setToastMessage('فشل حذف المنتج');
      setTimeout(() => setToastMessage(null), 3000);
      setProductToDelete(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();

    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = !p.archived;
    if (statusFilter === 'archived') matchesStatus = !!p.archived;
    if (statusFilter === 'featured') matchesStatus = p.featured && !p.archived;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs font-semibold animate-in fade-in duration-200">
          {toastMessage}
        </div>
      )}

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-[#E8E2D6] shadow-xs">
        <div>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
            إدارة كتالوج المنتجات
          </h2>
          <p className="text-xs text-[#7D7365] mt-1">
            إضافة، تعديل، أرشفة، ورفع صور المعروضات المحدثة في المعرض العام
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-xs font-bold rounded-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xs border border-[#E8E2D6] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-[#F5F2EA] p-1 rounded-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
                statusFilter === 'all' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#7D7365]'
              }`}
            >
              الكل ({products.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
                statusFilter === 'active' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#7D7365]'
              }`}
            >
              النشطة ({products.filter((p) => !p.archived).length})
            </button>
            <button
              onClick={() => setStatusFilter('featured')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
                statusFilter === 'featured' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#7D7365]'
              }`}
            >
              المميزة ({products.filter((p) => p.featured && !p.archived).length})
            </button>
            <button
              onClick={() => setStatusFilter('archived')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors ${
                statusFilter === 'archived' ? 'bg-white text-[#1A1A1A] shadow-xs' : 'text-[#7D7365]'
              }`}
            >
              المؤرشفة ({products.filter((p) => p.archived).length})
            </button>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs text-[#1A1A1A]"
          >
            <option value="all">كل الفئات</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-[#8C8275] absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الوصف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-3 py-2 text-xs bg-[#FAF9F5] border border-[#DDD6C8] rounded-xs focus:outline-hidden focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xs border border-[#E8E2D6] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E2D6] text-[#7A7367]">
              <tr>
                <th className="p-4 font-semibold">الصورة</th>
                <th className="p-4 font-semibold">المنتج</th>
                <th className="p-4 font-semibold">الفئة</th>
                <th className="p-4 font-semibold">السعر</th>
                <th className="p-4 font-semibold">التوفر</th>
                <th className="p-4 font-semibold">الحالة</th>
                <th className="p-4 font-semibold text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DD]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#7D7365]">
                    جاري تحميل المنتجات من قاعدة البيانات...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                    <td className="p-4 w-16">
                      <div className="relative w-12 h-12 rounded-xs overflow-hidden border border-[#DDD6C8]">
                        <img
                          src={p.mainImage || p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        {p.images.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] px-1">
                            +{p.images.length - 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#1A1A1A]">{p.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[#8C8275]" dir="ltr">
                          /{p.slug}
                        </span>
                        <a
                          href={`/product/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8C7355] hover:text-[#1A1A1A]"
                          title="معاينة في المتجر"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>
                    <td className="p-4 text-[#595349]">{p.category}</td>
                    <td className="p-4 text-[#1A1A1A] tabular-nums" dir="ltr">
                      {p.price ? `${p.price.toLocaleString('fr-DZ')} DA` : 'استفسار'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[11px] font-medium ${
                          p.availability === 'متوفر' ? 'text-emerald-700' : 'text-slate-500'
                        }`}
                      >
                        {p.availability}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {p.archived ? (
                          <span className="px-2 py-0.5 text-[10px] bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
                            مؤرشف
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                            منشور
                          </span>
                        )}
                        {p.featured && !p.archived && (
                          <span className="px-2 py-0.5 text-[10px] bg-[#C5A880]/20 text-[#8C7355] border border-[#C5A880]/40 rounded-xs">
                            مميز
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setModalOpen(true);
                          }}
                          className="p-1.5 text-[#5C564E] hover:text-[#1A1A1A] hover:bg-[#EFECE4] rounded-xs"
                          title="تعديل المنتج"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleFeatured(p.id)}
                          className={`p-1.5 rounded-xs ${
                            p.featured
                              ? 'text-amber-600 bg-amber-50'
                              : 'text-[#8C8275] hover:text-[#1A1A1A] hover:bg-[#EFECE4]'
                          }`}
                          title={p.featured ? 'إلغاء التمييز' : 'تمييز في الرئيسية'}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleArchive(p.id)}
                          className={`p-1.5 rounded-xs ${
                            p.archived
                              ? 'text-amber-700 bg-amber-50'
                              : 'text-[#8C8275] hover:text-[#1A1A1A] hover:bg-[#EFECE4]'
                          }`}
                          title={p.archived ? 'استعادة ونشر' : 'أرشفة وإخفاء'}
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setProductToDelete({ id: p.id, name: p.name })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xs"
                          title="حذف نهائي"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#7D7365]">
                    لا توجد منتجات مطابقة لخيارات التصفية
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation In-App Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xs max-w-md w-full p-6 border border-[#E8E2D6] space-y-4 shadow-xl">
            <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A]">
              تأكيد حذف المنتج
            </h3>
            <p className="text-xs text-[#6B6458] leading-relaxed">
              هل أنت متأكد من رغبتك في حذف المنتج <strong>"{productToDelete.name}"</strong> بشكل نهائي من قاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs text-[#595349] hover:text-[#1A1A1A]"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xs transition-colors"
              >
                تأكيد الحذف النهائي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <AdminProductModal
          isOpen={modalOpen}
          initialData={editingProduct}
          onClose={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setModalOpen(false);
            setEditingProduct(null);
            loadProducts();
          }}
        />
      )}
    </div>
  );
};
