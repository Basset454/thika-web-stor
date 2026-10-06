import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F4EE] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-[#7D7365]">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { label: 'نظرة عامة', path: '/admin', icon: LayoutDashboard },
    { label: 'المنتجات', path: '/admin/products', icon: Package },
    { label: 'الفئات', path: '/admin/categories', icon: Layers },
    { label: 'الإعدادات', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#1A1A1A] flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#1C1A17] text-[#D8D4CD] border-l border-[#2E2B27] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#2C2925]">
          <div className="flex items-center gap-2 text-[#C5A880] mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase">لوحة التحكم</span>
          </div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#FAF9F5]">أثاث الثقة</h2>
          <p className="text-[11px] text-[#8C8275] truncate mt-0.5" dir="ltr">{user?.email}</p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xs text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#C5A880] text-[#1A1A1A] font-semibold'
                    : 'text-[#B8B2A7] hover:bg-[#282522] hover:text-[#FAF9F5]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* External Public Store Link & Logout */}
        <div className="p-4 border-t border-[#2C2925] space-y-1">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xs text-xs text-[#A89F91] hover:text-[#FAF9F5] hover:bg-[#282522] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>معاينة المتجر العام</span>
            </span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs text-rose-400 hover:bg-rose-950/30 transition-colors text-right"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-[#E8E2D6] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-serif-luxury text-[#1A1A1A]">
              نظام إدارة المعرض المتكامل
            </h1>
            <p className="text-xs text-[#7D7365]">
              البيانات متصلة مباشرة بقاعدة البيانات ويتم تحديثها فورياً في المتجر العام
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              قاعدة البيانات نشطة
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
