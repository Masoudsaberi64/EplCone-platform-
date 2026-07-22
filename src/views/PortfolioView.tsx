import React, { useState, useEffect } from 'react';
import { Award, Briefcase, FileText, CheckCircle, BarChart3, Download, FilePlus2, Loader2 } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken } from '../lib/auth';
import { createGoogleDoc } from '../lib/docs';

export function PortfolioView() {
  const [isExporting, setIsExporting] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [exportedUrl, setExportedUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setNeedsAuth(false),
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const skills = [
    { name: 'مفاهیم پایه برق', level: 5, max: 5 },
    { name: 'مدار فرمان و قدرت', level: 4, max: 5 },
    { name: 'PLC (Siemens/Delta)', level: 1, max: 5 },
    { name: 'HMI', level: 0, max: 5 },
    { name: 'طراحی تابلو (EPLAN)', level: 2, max: 5 },
  ];

  const handleExportDocs = async () => {
    try {
      if (needsAuth || !(await getAccessToken())) {
        const result = await googleSignIn();
        if (result) {
          setNeedsAuth(false);
        } else {
          return;
        }
      }

      setIsExporting(true);
      setExportedUrl(null);
      
      const docTitle = 'EplCone - Portfolio / Resume';
      let docContent = 'رزومه و پورتفولیو مهارت‌ها - EplCone\n\n';
      docContent += 'مهارت‌های تخصصی:\n';
      skills.forEach(s => {
        docContent += `- ${s.name}: ${s.level} / ${s.max}\n`;
      });
      docContent += '\nنشان‌های دریافت شده:\n- Electrical Beginner\n- Panel Builder (Level 1)\n\n';
      docContent += 'پروژه‌های عملی تایید شده:\n- راه‌اندازی موتور پمپ با مدار فرمان\n- طراحی تابلو برق روشنایی\n';

      const docId = await createGoogleDoc(docTitle, docContent);
      setExportedUrl(`https://docs.google.com/document/d/${docId}/edit`);
    } catch (err) {
      console.error(err);
      alert('خطا در ارتباط با Google Docs');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 space-y-8 rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">پورتفولیو و مهارت‌ها (Skill Matrix)</h2>
          <p className="text-slate-500 mt-1">رزومه دیجیتال شما، تولید شده به صورت خودکار</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExportDocs}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FilePlus2 size={16} />}
            {needsAuth ? 'اتصال به Google Docs' : 'خروجی Google Docs'}
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
            <Download size={16} />
            دانلود رزومه استاندارد (PDF)
          </button>
        </div>
      </div>
      
      {exportedUrl && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center justify-between">
          <span className="text-sm font-medium">پورتفولیو با موفقیت به Google Docs منتقل شد.</span>
          <a href={exportedUrl} target="_blank" rel="noreferrer" className="text-sm font-bold underline hover:text-green-800">باز کردن سند</a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              ماتریس مهارت (Skill Level)
            </h3>
            
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <span className="text-slate-500">سطح {skill.level} از {skill.max}</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    {[...Array(skill.max)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-full ${i < skill.level ? 'bg-blue-600' : 'bg-slate-100'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Award size={20} className="text-orange-500" />
              نشان‌های دیجیتال (Badges)
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
                <Award size={16} />
                Electrical Beginner
              </div>
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-xl flex items-center gap-2 text-sm font-bold">
                <CheckCircle size={16} />
                Panel Builder (Level 1)
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              پروژه‌های عملی تایید شده
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Card 1 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center border border-slate-200">
                  <FileText className="text-slate-400" size={32} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">راه‌اندازی موتور پمپ با مدار فرمان</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  طراحی و شبیه‌سازی مدار فرمان و قدرت برای پمپ آب صنعتی به همراه حفاظت کامل بی‌متال.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">تایید شده توسط AI</span>
                  <button className="text-blue-600 font-medium">مشاهده مستندات</button>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="w-full h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center border border-slate-200">
                  <FileText className="text-slate-400" size={32} />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">طراحی تابلو برق روشنایی</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  طراحی نقشه‌های تک‌خطی و جانمایی تابلو توزیع در نرم‌افزار EPLAN.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md">تایید شده توسط استاد</span>
                  <button className="text-blue-600 font-medium">دانلود نقشه</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
