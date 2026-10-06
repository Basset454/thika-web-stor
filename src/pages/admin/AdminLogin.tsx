import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول. تحقق من صحة البيانات.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUseDefault = () => {
    setEmail('admin@confiance18.dz');
    setPassword('JijelConfiance18!');
  };

  return (
    <div className="min-h-screen bg-[#141311] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-[#1E1C18] border border-[#2E2B25] p-8 md:p-10 rounded-xs space-y-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#2C2822] text-[#C5A880] rounded-xs flex items-center justify-center mx-auto border border-[#3E382F]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif-luxury text-2xl font-bold text-[#FAF9F5]">
            لوحة تحكم أثاث الثقة
          </h1>
          <p className="text-xs text-[#8C8476]">
            بوابة الإدارة المركزية لمعرض بورمل، جيجل 18
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xs flex items-center gap-2 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#B8B2A7] mb-1.5">البريد الإلكتروني للإدارة</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7A7265] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="admin@confiance18.dz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-[#141311] border border-[#332F28] rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#B8B2A7] mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7A7265] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 bg-[#141311] border border-[#332F28] rounded-xs text-xs text-white focus:outline-hidden focus:border-[#C5A880]"
                dir="ltr"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#C5A880] hover:bg-[#D4BC98] text-[#1A1A1A] text-xs font-bold rounded-xs transition-colors disabled:opacity-50 mt-2"
          >
            {submitting ? 'جاري التحقق...' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Quick test credentials assistance */}
        <div className="pt-4 border-t border-[#2C2923] text-center space-y-2">
          <p className="text-[11px] text-[#7A7265]">بيانات الدخول الافتراضية للنظام:</p>
          <button
            type="button"
            onClick={handleUseDefault}
            className="text-xs text-[#C5A880] hover:underline"
          >
            تعبئة بيانات المسؤول تلقائياً
          </button>
        </div>

        <div className="text-center pt-2">
          <a
            href="/"
            className="text-xs text-[#8C8476] hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>العودة للمتجر العام</span>
          </a>
        </div>
      </div>
    </div>
  );
};
