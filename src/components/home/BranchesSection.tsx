import React from 'react';
import { MapPin, ExternalLink, Navigation, Phone, CheckCircle2, Building2 } from 'lucide-react';

export interface Branch {
  id: string;
  number: number;
  name: string;
  areaTitle: string;
  areaDetail: string;
  description: string;
  features: string[];
  mapsUrl: string;
  isMain?: boolean;
}

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'branch-1',
    number: 1,
    name: 'أثاث الثقة 1',
    areaTitle: 'وسط مدينة جيجل',
    areaDetail: 'حي المقاصب · شارع جيجل الحيوي',
    description:
      'الفرع الأول لمتجر أثاث الثقة في قلب مدينة جيجل، يتميز بصالات عرض رئيسية فسيحة تضم أحدث موديلات الصالونات العصرية وتشكيلات غرف النوم الفاخرة مع سهولة الوصول.',
    features: [
      'صالات عرض رئيسية واسعة',
      'أحدث كولكشن من الصالونات العصرية',
      'موقع حيوي يسهل الوصول إليه',
    ],
    mapsUrl:
      'https://www.google.com/maps/place/%D8%A3%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A91+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8200257,5.7294576,4607m/data=!3m1!1e3!4m10!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m6!1s0x12f261002b2eb5d3:0x7b2d2be90dbcde30!8m2!3d36.8206112!4d5.7504023',
    isMain: true,
  },
  {
    id: 'branch-2',
    number: 2,
    name: 'أثاث الثقة 2',
    areaTitle: 'منطقة بورمل',
    areaDetail: 'المدخل الشرقي لجيجل · طريق رئيسي',
    description:
      'متجر فسيح بمساحات ضخمة متعددة المستويات تشمل طابقاً تحت الأرض مجهزاً بكافة موديلات الأطقم والصالونات الفاخرة وغرف النوم، مع سهولة تامة لركن السيارات.',
    features: [
      'طابق تحت الأرض مخصص للتشكيلات الحصرية',
      'مساحات شاسعة متعددة الطوابق',
      'سهولة الوصول ومواقف سيارات متوفرة',
    ],
    mapsUrl:
      'https://www.google.com/maps/place/%D8%A7%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A92+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8117114,5.7185571,4608m/data=!3m1!1e3!4m9!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m5!1s0x12f25f006eb10d9b:0xb12ebce067b7f061!8m2!3d36.8110757!4d5.7516807',
  },
  {
    id: 'branch-3',
    number: 3,
    name: 'أثاث الثقة 3',
    areaTitle: 'حي الفرسان',
    areaDetail: 'المدخل الغربي لجيجل · موقع متميز',
    description:
      'فضاء تسوق راقٍ للأثاث المعاصر يخدم الجهة الغربية لمدينة جيجل، يقدم تشكيلات راقية من أثاث المعيشة وغرف النوم المصممة بأعلى معايير الجودة والراحة.',
    features: [
      'أحدث صيحات الأثاث العصري والفاخر',
      'تغطية مخصصة للمنطقة الغربية لجيجل',
      'استشارات تصميم وتأثيث من فريق مختص',
    ],
    mapsUrl:
      'https://www.google.com/maps/place/%D8%A3%D8%AB%D8%A7%D8%AB+%D8%A7%D9%84%D8%AB%D9%82%D8%A9+3+%D8%AC%D9%8A%D8%AC%D9%84%E2%80%AD/@36.8118488,5.6986443,4607m/data=!3m1!1e3!4m10!1m2!2m1!1z2KPYq9in2Ksg2KfZhNir2YLYqQ!3m6!1s0x12f25f00341319c7:0x15cac686cc514ab!8m2!3d36.8141843!4d5.740565',
  },
];

interface BranchesSectionProps {
  className?: string;
  showIntro?: boolean;
}

export const BranchesSection: React.FC<BranchesSectionProps> = ({
  className = '',
  showIntro = true,
}) => {
  return (
    <section
      id="branches"
      className={`py-24 px-6 max-w-7xl mx-auto font-cairo scroll-mt-24 ${className}`}
    >
      {showIntro && (
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-[#FFF5F2] border border-[#FFE4DC] text-[#FF551A] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>شبكة فروعنا في ولاية جيجل</span>
          </div>

          <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1E1E] leading-[1.3] text-balance-ar">
            3 فروع في مناطق مختلفة من جيجل
          </h2>

          <p className="text-sm md:text-base text-[#4E4E4E] leading-relaxed md:leading-[1.8] font-normal">
            لأن متجر <strong className="text-[#1E1E1E] font-semibold">أثاث الثقة</strong> صرحٌ تجاري كبير ومرموق لخدمة العائلات الجزائرية، تتوزع فروعنا الثلاثة عبر مناطق وأحياء مختلفة في ولاية جيجل (وسط المدينة، بورمل، وحي الفرسان) وليست محصورة في مكان واحد، لتكون قريبة منكم أينما كنتم.
          </p>
        </div>
      )}

      {/* 3 Branches Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {BRANCHES_DATA.map((branch) => (
          <div
            key={branch.id}
            className="group relative bg-white rounded-xs border border-[#EEEEEE] hover:border-[#FF551A]/40 transition-all duration-300 p-8 flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            {/* Top Badge & Branch Number */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xs bg-[#1E1E1E] text-white flex items-center justify-center font-bold text-lg">
                    {branch.number}
                  </span>
                  <div>
                    <h3 className="font-cairo text-2xl font-bold text-[#1E1E1E] group-hover:text-[#FF551A] transition-colors">
                      {branch.name}
                    </h3>
                    <p className="text-xs font-bold text-[#FF551A] mt-0.5">
                      {branch.areaTitle}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 bg-[#F5F5F5] text-[#666666] rounded-xs shrink-0">
                  فرع {branch.number}
                </span>
              </div>

              {/* Location Badge */}
              <div className="flex items-start gap-2 text-xs text-[#555555] mb-4 bg-[#FAFAFA] p-3 rounded-xs border border-[#F0F0F0]">
                <MapPin className="w-4 h-4 text-[#FF551A] shrink-0 mt-0.5" />
                <span className="font-medium">{branch.areaDetail}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4E4E4E] leading-relaxed mb-6 font-normal">
                {branch.description}
              </p>

              {/* Feature bullets */}
              <ul className="space-y-2 mb-8">
                {branch.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#333333]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF551A] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions: Prominent Google Maps button */}
            <div className="pt-4 border-t border-[#F0F0F0]">
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#FF551A] hover:bg-[#E04812] active:bg-[#CC3E0B] text-white text-xs font-bold rounded-xs transition-colors shadow-xs group-hover:shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>فتح في Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Reassurance Note */}
      <div className="mt-12 p-6 bg-[#FAFAFA] rounded-xs border border-[#EEEEEE] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xs bg-[#FFF5F2] flex items-center justify-center text-[#FF551A] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E1E1E]">
              فروع في مناطق مختلفة لخدمتكم بشكل أفضل
            </h4>
            <p className="text-xs text-[#666666] mt-0.5">
              كل فرع يضم فريقاً محترفاً لاستقبالكم وإرشادكم لاختيار الأثاث الأنسب لمنزلكم.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:0560107745"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E1E1E] hover:bg-[#333333] text-white text-xs font-bold rounded-xs transition-colors"
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF551A]" />
            <span>0560 10 77 45</span>
          </a>
        </div>
      </div>
    </section>
  );
};
