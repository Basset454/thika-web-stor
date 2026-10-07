import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrustLogo } from '../components/TrustLogo';
import { AdminLogin } from '../pages/admin/AdminLogin';
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
      <div className="min-h-screen bg-white flex items-center justify-center font-cairo">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#FF551A] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-[#757575]">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // Route Protection: unauthenticated users see the login page at /admin,
  // or are redirected to /admin if trying to access protected sub-routes (/admin/products, etc.)
  if (!isAuthenticated) {
    if (location.pathname !== '/admin') {
      return <Navigate to="/admin" replace />;
    }
    return <AdminLogin />;
  }

  const navItems = [
    { label: 'نظرة عامة', path: '/admin', icon: LayoutDashboard },
    { label: 'المنتجات', path: '/admin/products', icon: Package },
    { label: 'الفئات', path: '/admin/categories', icon: Layers },
    { label: 'الإعدادات', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] text-[#1E1E1E] flex flex-col md:flex-row font-cairo">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#1E1E1E] text-[#D4D4D4] border-l border-[#2E2E2E] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#2C2C2C]">
          <div className="flex items-center gap-2 text-[#FF551A] mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold tracking-wider uppercase">لوحة التحكم</span>
          </div>
          <TrustLogo variant="dark" size="sm" />
          <p className="text-[11px] text-[#888888] truncate mt-2 font-mono" dir="ltr">{user?.email}</p>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xs text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FF551A] text-white shadow-xs'
                    : 'text-[#AAAAAA] hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* External Public Store Link & Logout */}
        <div className="p-4 border-t border-[#2C2C2C] space-y-1">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xs text-xs text-[#999999] hover:text-white hover:bg-white/10 transition-colors"
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
            <h1 className="text-xl font-bold font-cairo text-[#1E1E1E]">
              نظام إدارة متجر أثاث الثقة
            </h1>
            <p className="text-xs text-[#757575]">
              البيانات متصلة مباشرة بقاعدة البيانات ويتم تحديثها فورياً في المتجر والفروع
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
