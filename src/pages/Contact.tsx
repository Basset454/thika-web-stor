import React, { useState } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Send, CheckCircle2, Compass, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { BranchesSection } from '../components/home/BranchesSection';

export const Contact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: 'أي فرع / استفسار عام',
    subject: 'استفسار عن تشكيلة الأثاث',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSent(true);
  };

  const whatsappDirectUrl = `https://wa.me/213560107745?text=${encodeURIComponent(
    `السلام عليكم، أنا ${formData.name || 'زبون'} (${formData.phone || ''}). بخصوص: ${formData.subject} - الفرع: ${formData.branch}. ${formData.message}`
  )}`;

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto space-y-20 font-cairo">
      {/* Header */}
      <div className="max-w-3xl space-y-3.5">
        <span className="text-xs font-bold text-[#FF551A] block">
          قنوات التواصل ومواقع الفروع
        </span>
        <h1 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
          تواصل مع متجر أثاث الثقة جيجل 18
        </h1>
        <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
          يسعدنا تواصلكم للإجابة عن استفساراتكم حول التشكيلات والأسعار، أو لمساعدتكم في الوصول إلى أيٍّ من فروع متجرنا الثلاثة الموزعة في مناطق مختلفة بمدينة جيجل (وسط المدينة، بورمل، وحي الفرسان).
        </p>
      </div>

      {/* Main Grid: Direct Contact Cards (Left) & Inquiry Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Facebook Channel Card */}
          <a
            href="https://web.facebook.com/profile.php?id=61563792971318&locale=ar_AR"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#1E1E1E] text-white p-6 rounded-xs border border-[#333333] hover:border-[#FF551A] transition-all space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xs bg-[#FF551A] flex items-center justify-center text-white">
                <Facebook className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-[#FF551A] font-bold group-hover:underline">
                <span>زيارة الصفحة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <h3 className="font-cairo text-lg font-bold text-white group-hover:text-[#FF551A] transition-colors">
                الصفحة الرسمية على فيسبوك
              </h3>
              <p className="text-xs text-[#CCCCCC] mt-1">
                انضم لأكثر من 73,000 متابع يشاركوننا أحدث كولكشنات الأثاث، العروض، والفيديوهات المصورة من داخل الفروع.
              </p>
            </div>
          </a>

          {/* Official Instagram Channel Card */}
          <a
            href="https://www.instagram.com/meuble_confiace_18/?hl=ar"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#1E1E1E] text-white p-6 rounded-xs border border-[#333333] hover:border-[#E1306C] transition-all space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xs bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-[#E1306C] font-bold group-hover:underline">
                <span>زيارة الحساب</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <h3 className="font-cairo text-lg font-bold text-white group-hover:text-[#E1306C] transition-colors">
                الحساب الرسمي على انستغرام
              </h3>
              <p className="text-xs text-[#CCCCCC] mt-1">
                تصفح ستوريات وصور وفيديوهات حصرية (Reels) لأحدث الموديلات والأطقم من معارضنا في جيجل.
              </p>
            </div>
          </a>

          {/* Phone Numbers Card */}
          <div className="bg-white p-6 rounded-xs border border-[#EEEEEE] space-y-4 shadow-xs">
            <div className="flex items-center gap-3 text-[#1E1E1E]">
              <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] border border-[#FFE4DC]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cairo text-lg font-bold">الاتصال الهاتفي المباشر</h3>
                <p className="text-xs text-[#757575]">أرقام خدمة الزبائن المعتمدة</p>
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
              املأ البيانات التالية للتواصل مباشرة مع إدارة المتجر وفروعه عبر واتساب أو الهاتف.
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
                  الفرع الأقرب إليك
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#E0E0E0] rounded-xs focus:outline-hidden focus:border-[#FF551A] text-[#1E1E1E]"
                >
                  <option value="أي فرع / استفسار عام">أي فرع / استفسار عام</option>
                  <option value="أثاث الثقة 1 (وسط مدينة جيجل)">أثاث الثقة 1 (وسط مدينة جيجل)</option>
                  <option value="أثاث الثقة 2 (منطقة بورمل)">أثاث الثقة 2 (منطقة بورمل)</option>
                  <option value="أثاث الثقة 3 (حي الفرسان)">أثاث الثقة 3 (حي الفرسان)</option>
                </select>
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
                  <option value="زيارة أحد فروعنا في جيجل">ترتيب زيارة لأحد فروعنا في جيجل</option>
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
                <span>إرسال الاستفسار ومحادثة المتجر عبر واتساب</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* DEDICATED 3 BRANCHES SECTION IN CONTACT PAGE */}
      <div className="pt-8 border-t border-[#EEEEEE]">
        <BranchesSection />
      </div>
    </div>
  );
};
