import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboardStats, Product } from '../../types';
import { api } from '../../services/api';
import {
  Package,
  Star,
  Layers,
  Archive,
  Plus,
  ArrowUpLeft,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AdminProductModal } from './AdminProductModal';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, prodsData] = await Promise.all([
        api.getAdminStats(),
        api.getAdminProducts(),
      ]);
      setStats(statsData);
      setRecentProducts(prodsData.slice(0, 5));
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleArchive = async (id: string) => {
    try {
      await api.toggleArchiveProduct(id);
      setStatusMessage('تم تحديث حالة أرشفة المنتج');
      setTimeout(() => setStatusMessage(null), 3000);
      loadData();
    } catch (err) {
      setStatusMessage('فشل تغيير حالة الأرشفة');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await api.toggleFeaturedProduct(id);
      setStatusMessage('تم تحديث تمييز المنتج');
      setTimeout(() => setStatusMessage(null), 3000);
      loadData();
    } catch (err) {
      setStatusMessage('فشل تغيير تمييز المنتج');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xs font-semibold animate-in fade-in duration-200">
          {statusMessage}
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-[#E8E2D6] shadow-xs">
        <div>
          <h2 className="text-xl font-bold font-serif-luxury text-[#1A1A1A]">
            نظرة عامة على الكتالوج
          </h2>
          <p className="text-xs text-[#7D7365] mt-1">
            إدارة المعروضات الحية وأرشفة القطع المنتهية مع تحديث مباشر في المتجر
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#33302B] text-white text-xs font-bold rounded-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xs border border-[#E8E2D6] space-y-2">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-xs font-medium">إجمالي المنتجات</span>
            <Package className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">
            {loading ? '...' : stats?.totalProducts || 0}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium block">
            {stats?.activeProducts || 0} نشط في المتجر
          </span>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#E8E2D6] space-y-2">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-xs font-medium">المنتجات المميزة</span>
            <Star className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">
            {loading ? '...' : stats?.featuredProducts || 0}
          </div>
          <span className="text-[11px] text-[#8C8275] block">معروضة في الصفحة الرئيسية</span>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#E8E2D6] space-y-2">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-xs font-medium">أقسام المعرض</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">
            {loading ? '...' : stats?.totalCategories || 0}
          </div>
          <span className="text-[11px] text-[#8C8275] block">صالونات، غرف نوم...</span>
        </div>

        <div className="bg-white p-5 rounded-xs border border-[#E8E2D6] space-y-2">
          <div className="flex items-center justify-between text-[#8C8275]">
            <span className="text-xs font-medium">المنتجات المؤرشفة</span>
            <Archive className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] tabular-nums">
            {loading ? '...' : stats?.archivedProducts || 0}
          </div>
          <span className="text-[11px] text-[#8C8275] block">مخفية من المتجر العام</span>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-xs border border-[#E8E2D6] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E8E2D6] flex items-center justify-between">
          <h3 className="font-serif-luxury text-base font-bold text-[#1A1A1A]">
            أحدث المنتجات في قاعدة البيانات
          </h3>
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-[#8C7355] hover:underline flex items-center gap-1"
          >
            <span>عرض وإدارة كل المنتجات</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E2D6] text-[#7A7367]">
              <tr>
                <th className="p-4 font-semibold">الصورة</th>
                <th className="p-4 font-semibold">اسم المنتج</th>
                <th className="p-4 font-semibold">الفئة</th>
                <th className="p-4 font-semibold">السعر</th>
                <th className="p-4 font-semibold">الحالة</th>
                <th className="p-4 font-semibold text-center">إجراءات سريعة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE6DD]">
              {recentProducts.length > 0 ? (
                recentProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF9F5]/70 transition-colors">
                    <td className="p-4 w-16">
                      <img
                        src={p.mainImage || p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-xs border border-[#DDD6C8]"
                      />
                    </td>
                    <td className="p-4 font-bold text-[#1A1A1A]">
                      <div>{p.name}</div>
                      <span className="text-[10px] text-[#8C8275]" dir="ltr">
                        {p.slug}
                      </span>
                    </td>
                    <td className="p-4 text-[#595349]">{p.category}</td>
                    <td className="p-4 text-[#1A1A1A] tabular-nums" dir="ltr">
                      {p.price ? `${p.price.toLocaleString('fr-DZ')} DA` : 'استفسار'}
                    </td>
                    <td className="p-4">
                      {p.archived ? (
                        <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs text-[10px]">
                          مؤرشف
                        </span>
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs text-[10px]">
                          نشط
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-xs bg-[#EFECE4] hover:bg-[#E5DFD3] text-[#1A1A1A] rounded-xs"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(p.id)}
                          className={`px-2.5 py-1 text-xs rounded-xs border ${
                            p.featured
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-white text-[#5C564E] border-[#DDD6C8]'
                          }`}
                        >
                          {p.featured ? 'مميز ★' : 'تمييز'}
                        </button>
                        <button
                          onClick={() => handleToggleArchive(p.id)}
                          className="px-2.5 py-1 text-xs bg-white text-[#5C564E] hover:text-[#1A1A1A] border border-[#DDD6C8] rounded-xs"
                        >
                          {p.archived ? 'استعادة' : 'أرشفة'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#7D7365]">
                    لا توجد منتجات مسجلة حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <AdminProductModal
          isOpen={isModalOpen}
          initialData={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSuccess={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
            loadData();
          }}
        />
      )}
    </div>
  );
};
