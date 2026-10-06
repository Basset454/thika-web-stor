import React, { useState, useEffect } from 'react';
import { StoreInfo } from '../../types';
import { api } from '../../services/api';
import { ShieldCheck, Phone, Mail, MapPin, Database, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStoreInfo()
      .then(setStoreInfo)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-xs border border-[#E8E2D6] shadow-xs">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#1A1A1A]">
          بيانات وإعدادات النظام
        </h2>
        <p className="text-xs text-[#7D7365] mt-1">
          معلومات المتجر المعتمدة وحالة اتصال قاعدة البيانات والمخزن السحابي للصور
        </p>
      </div>

      {/* System Status Banner */}
      <div className="bg-[#FAF8F3] border border-[#EAE4D7] p-5 rounded-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-emerald-600" />
          <div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">حالة قاعدة البيانات ومجلد التخزين</h4>
            <p className="text-xs text-[#7D7365]">قاعدة البيانات ومجلد /uploads متصلان ومستقران بالكامل</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          متصل ومحفوظ
        </span>
      </div>

      {/* Store Official Info */}
      <div className="bg-white p-6 rounded-xs border border-[#E8E2D6] space-y-6 shadow-xs">
        <h3 className="font-serif-luxury text-lg font-bold text-[#1A1A1A] border-b border-[#E8E2D6] pb-3">
          المعلومات الرسمية لمعرض أثاث الثقة
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">اسم المعرض:</span>
            <span className="font-bold text-sm text-[#1A1A1A]">{storeInfo?.name}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">الشعار والعبارة المعتمدة:</span>
            <span className="font-serif-luxury italic text-sm text-[#8C7355]">{storeInfo?.tagline}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">الموقع والعنوان:</span>
            <span className="font-medium text-[#1A1A1A]">{storeInfo?.address}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">الهاتف الأساسي:</span>
            <span className="font-bold text-sm text-[#1A1A1A]" dir="ltr">{storeInfo?.primaryPhone}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">الأرقام الإضافية:</span>
            <div className="flex gap-4 font-semibold text-[#1A1A1A]" dir="ltr">
              {storeInfo?.additionalPhones.map((ph, idx) => (
                <span key={idx}>{ph}</span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">البريد الإلكتروني:</span>
            <span className="text-[#1A1A1A] font-medium">{storeInfo?.email}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">متابعو فيسبوك:</span>
            <span className="text-[#1A1A1A] font-medium">{storeInfo?.facebookFollowers} متابع</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#8C8275] font-medium block">مواصفات المعرض:</span>
            <span className="text-[#1A1A1A]">{storeInfo?.showroomDetails}</span>
          </div>
        </div>
      </div>

      {/* Admin Security Card */}
      <div className="bg-white p-6 rounded-xs border border-[#E8E2D6] space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-[#8C7355]">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="font-serif-luxury text-base font-bold text-[#1A1A1A]">أمان وحماية الحساب</h3>
        </div>
        <p className="text-xs text-[#7D7365] leading-relaxed">
          حساب الإدارة محمي برمز جلسة سري (Session Token) مشفر ينتهي تلقائياً بعد 24 ساعة. لتغيير بيانات الدخول في بيئة الإنتاج، يتم ضبط المتغيرات البيئية <code className="bg-[#FAF8F3] px-1.5 py-0.5 rounded-xs border border-[#DDD6C8]">ADMIN_EMAIL</code> و <code className="bg-[#FAF8F3] px-1.5 py-0.5 rounded-xs border border-[#DDD6C8]">ADMIN_PASSWORD</code>.
        </p>
      </div>
    </div>
  );
};
