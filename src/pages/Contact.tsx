import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Send, CheckCircle2, Compass, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'استفسار عن تشكيلة الأثاث',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSent(true);
  };

  const whatsappDirectUrl = `https://wa.me/213560107745?text=${encodeURIComponent(
    `السلام عليكم، أنا ${formData.name || 'زبون'} (${formData.phone || ''}). بخصوص: ${formData.subject}. ${formData.message}`
  )}`;

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-16 font-cairo">
      {/* Header */}
      <div className="max-w-2xl space-y-3.5">
        <span className="text-xs font-bold text-[#FF551A] block">
          قنوات التواصل الرسمية
        </span>
        <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
          تواصل مع معرض أثاث الثقة
        </h1>
        <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
          يسعدنا تواصلكم للإجابة عن استفساراتكم حول المعروضات، الأسعار، أو لمساعدتكم في الوصول إلى مقر المعرض في بورمل بجيجل.
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards (Left) & Inquiry Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Location Card */}
          <div className="bg-white p-6 rounded-xs border border-[#EEEEEE] space-y-4 shadow-xs">
            <div className="flex items-center gap-3 text-[#1E1E1E]">
              <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cairo text-lg font-bold">موقع المعرض</h3>
                <p className="text-xs text-[#757575]">بورمل، جيجل، الجزائر</p>
              </div>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              معرض داخلي متعدد الطوابق بما في ذلك طابق تحت الأرض لعرض تشكيلات الصالونات وغرف النوم.
            </p>
            <a
              href="https://maps.app.goo.gl/XYLZfTao58Y5pydc6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-xs font-bold rounded-xs transition-colors shadow-xs"
            >
              <Compass className="w-4 h-4" />
              <span>فتح في خرائط Google (GPS)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Phone Numbers Card */}
          <div className="bg-white p-6 rounded-xs border border-[#EEEEEE] space-y-4 shadow-xs">
            <div className="flex items-center gap-3 text-[#1E1E1E]">
              <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cairo text-lg font-bold">الاتصال الهاتفي المباشر</h3>
                <p className="text-xs text-[#757575]">أرقام المعرض المعتمدة</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="tel:0560107745"
                className="flex items-center justify-between p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] rounded-xs border border-[#E5E5E5] transition-colors text-xs font-bold text-[#1E1E1E]"
              >
                <span>الهاتف الأساسي</span>
                <span dir="ltr" className="text-sm text-[#FF551A]">0560 10 77 45</span>
              </a>

              <a
                href="tel:0664029968"
                className="flex items-center justify-between p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] rounded-xs border border-[#E5E5E5] transition-colors text-xs font-semibold text-[#1E1E1E]"
              >
                <span>رقم إضافي 1</span>
                <span dir="ltr" className="text-xs">0664 02 99 68</span>
              </a>

              <a
                href="tel:0659022199"
                className="flex items-center justify-between p-3 bg-[#F8F8F8] hover:bg-[#F0F0F0] rounded-xs border border-[#E5E5E5] transition-colors text-xs font-semibold text-[#1E1E1E]"
              >
                <span>رقم إضافي 2</span>
                <span dir="ltr" className="text-xs">0659 02 21 99</span>
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white p-6 rounded-xs border border-[#EEEEEE] space-y-3 shadow-xs">
            <div className="flex items-center gap-3 text-[#1E1E1E]">
              <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cairo text-lg font-bold">البريد الإلكتروني</h3>
                <a
                  href="mailto:meubleconfiancejijel18@gmail.com"
                  className="text-xs text-[#FF551A] hover:underline break-all block"
                >
                  meubleconfiancejijel18@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xs border border-[#EEEEEE] shadow-xs space-y-6">
          <div className="space-y-2 border-b border-[#EEEEEE] pb-4">
            <h2 className="font-cairo text-2xl font-bold text-[#1E1E1E]">
              إرسال استفسار مباشر
            </h2>
            <p className="text-xs text-[#757575]">
              املأ البيانات التالية للتواصل مباشرة مع إدارة المعرض عبر واتساب أو الاتصال.
            </p>
          </div>

          {formSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-sm font-bold text-emerald-900">تم تجهيز استفساركم بنجاح</h3>
              <p className="text-xs text-emerald-700">
                يمكنكم الآن إرسال الرسالة مباشرة عبر تطبيق واتساب أو الانتظار لمكالمة من فريقنا.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold rounded-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>فتح محادثة واتساب الآن</span>
                </a>
                <button
                  type="button"
                  onClick={() => setFormSent(false)}
                  className="text-xs font-semibold text-[#555555] hover:text-[#1E1E1E] underline"
                >
                  تعديل الاستفسار
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] mb-1.5">
                  الاسم الكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محمد بلقاسم"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] mb-1.5">
                  رقم الهاتف للتواصل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="مثال: 0560 10 77 45"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] mb-1.5">
                  موضوع الاستفسار
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
                >
                  <option value="استفسار عن تشكيلة الصالونات">استفسار عن تشكيلة الصالونات (Livinda, Pilot Plus...)</option>
                  <option value="استفسار عن غرف النوم">استفسار عن غرف النوم</option>
                  <option value="الاستفسار عن السعر والمقاسات">الاستفسار عن السعر والمقاسات</option>
                  <option value="زيارة المعرض ببورمل">ترتيب زيارة للمعرض في بورمل</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] mb-1.5">
                  نص الاستفسار
                </label>
                <textarea
                  rows={4}
                  placeholder="اكتب استفسارك هنا، مثل تفاصيل الموديل المرغوب أو أي استفسار آخر..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF551A] hover:bg-[#E04812] text-white text-xs font-bold rounded-xs transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>إرسال الاستفسار ومحادثة المعرض عبر واتساب</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
