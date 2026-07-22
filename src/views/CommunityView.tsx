import React from 'react';
import { Users, MessageSquare, Star, ArrowLeft } from 'lucide-react';

export function CommunityView() {
  const topics = [
    { id: 1, title: 'مشکل در شبیه‌ساز راه‌اندازی ستاره-مثلث', author: 'علی احمدی', replies: 12, category: 'PLC Engineering', isResolved: true },
    { id: 2, title: 'تفاوت‌های کارت‌های آنالوگ سری 300 و 400', author: 'رضا کریمی', replies: 5, category: 'Industrial Systems', isResolved: false },
    { id: 3, title: 'بهترین روش برای مستندسازی در EPLAN', author: 'سارا محمدی', replies: 8, category: 'Panel Engineering', isResolved: true },
  ];

  const experts = [
    { id: 1, name: 'مهندس حسینی', role: 'متخصص مانیتورینگ', points: 4500 },
    { id: 2, name: 'مهندس رستمی', role: 'متخصص تابلو برق', points: 3200 },
  ];

  return (
    <div className="p-8 h-full rtl overflow-auto custom-scrollbar">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">شبکه متخصصان (Professional Network)</h2>
          <p className="text-slate-500 mt-1">ارتباط با صنعت، حل گروهی پروژه‌ها و تبادل تجربه</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors">
          ایجاد بحث جدید
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={20} className="text-blue-600" />
                بحث‌های اخیر
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors">جدیدترین</button>
                <button className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-medium transition-colors">حل نشده</button>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {topics.map(topic => (
                <div key={topic.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800 text-lg">{topic.title}</h4>
                    {topic.isResolved && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">حل شده</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>توسط: <span className="text-slate-700 font-medium">{topic.author}</span></span>
                    <span>•</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{topic.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MessageSquare size={14} /> {topic.replies} پاسخ</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50 text-center">
              <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center justify-center w-full gap-2">
                مشاهده انجمن کامل <ArrowLeft size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Star size={20} className="text-amber-500" />
              متخصصان برتر هفته
            </h3>
            <div className="space-y-4">
              {experts.map((expert, idx) => (
                <div key={expert.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-amber-100 flex items-center justify-center font-bold text-amber-600">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-slate-800">{expert.name}</h4>
                    <p className="text-xs text-slate-500">{expert.role}</p>
                  </div>
                  <div className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                    {expert.points} XP
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-md text-white">
            <Users size={32} className="text-blue-400 mb-4" />
            <h3 className="text-lg font-bold mb-2">استخدام و ارتباط با صنعت</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              با تکمیل پروفایل و به اشتراک‌گذاری پروژه‌های خود، کارفرمایان می‌توانند شما را برای موقعیت‌های شغلی پیدا کنند.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-xl transition-colors">
              مشاهده موقعیت‌های شغلی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
