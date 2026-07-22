import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Lock, PlayCircle, Eye, Cpu, Settings, ChevronDown, ChevronUp } from 'lucide-react';

export function LearningPathView() {
  const [expandedId, setExpandedId] = useState<number | null>(3);

  const academies = [
    { id: 1, title: 'مبانی برق (Electrical Foundation)', desc: 'ساخت ذهنیت مهندسی برق، ابزارها و ایمنی', status: 'completed' },
    { id: 2, title: 'تاسیسات الکتریکی (Installation)', desc: 'سیم‌کشی، نقشه‌خوانی، تابلو توزیع', status: 'completed' },
    { id: 3, title: 'برق صنعتی (Industrial Systems)', desc: 'مدار فرمان و قدرت، موتورها، راه‌اندازی', status: 'in_progress' },
    { id: 4, title: 'طراحی تابلو برق (Panel Engineering)', desc: 'طراحی در EPLAN، مونتاژ، تست', status: 'locked' },
    { id: 5, title: 'اتوماسیون صنعتی (PLC Engineering)', desc: 'فلسفه PLC، Ladder، مفاهیم پیشرفته', status: 'locked' },
    { id: 6, title: 'مانیتورینگ (HMI & SCADA)', desc: 'طراحی صفحات، Alarm، Trend', status: 'locked' },
    { id: 7, title: 'شبکه‌های صنعتی (Communication)', desc: 'Modbus, Profinet, Ethernet', status: 'locked' },
    { id: 8, title: 'مسیر شغلی (Career Academy)', desc: 'رزومه، پورتفولیو، آمادگی مصاحبه', status: 'locked' },
  ];

  const learningSteps = [
    { id: 'understand', name: 'درک مفهوم (Understand)', icon: BookOpen, desc: 'یادگیری تئوری و مفاهیم پایه', status: 'completed' },
    { id: 'observe', name: 'مشاهده عملکرد (Observe)', icon: Eye, desc: 'مشاهده یک سیستم صنعتی واقعی', status: 'completed' },
    { id: 'practice', name: 'تمرین کنترل‌شده (Practice)', icon: Cpu, desc: 'حل تمرین‌های کوتاه و هدایت شده', status: 'in_progress' },
    { id: 'build', name: 'ساخت پروژه (Build)', icon: Settings, desc: 'طراحی و اجرای یک پروژه کامل', status: 'locked' },
    { id: 'operate', name: 'اجرای صنعتی (Operate)', icon: PlayCircle, desc: 'عیب‌یابی در کارخانه مجازی', status: 'locked' },
  ];

  return (
    <div className="p-8 space-y-8 rtl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">مسیر یادگیری (Learning Journey)</h2>
        <p className="text-slate-500 mt-1">۸ آکادمی تخصصی تا تبدیل شدن به مهندس اتوماسیون صنعتی</p>
      </div>

      <div className="relative">
        <div className="absolute top-0 right-8 w-1 h-full bg-slate-200 rounded-full" />
        
        <div className="space-y-6 relative z-10">
          {academies.map((academy, idx) => {
            const isExpanded = expandedId === academy.id;
            return (
            <div key={academy.id} className="flex gap-6 items-start">
              <div className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center shadow-md bg-white border-4 transition-colors ${
                academy.status === 'completed' ? 'border-green-500 text-green-500' :
                academy.status === 'in_progress' ? 'border-blue-500 text-blue-500' :
                'border-slate-300 text-slate-400'
              }`}>
                {academy.status === 'completed' ? <CheckCircle2 size={24} /> :
                 academy.status === 'in_progress' ? <PlayCircle size={24} /> :
                 <Lock size={24} />}
              </div>
              
              <div className={`flex-1 bg-white rounded-2xl shadow-sm border transition-all overflow-hidden ${
                academy.status === 'in_progress' ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-200' : 'border-slate-200'
              }`}>
                <div 
                  className={`p-6 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors ${academy.status === 'locked' ? 'opacity-70' : ''}`}
                  onClick={() => academy.status !== 'locked' && setExpandedId(isExpanded ? null : academy.id)}
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-slate-400 font-normal">آکادمی {idx + 1}</span>
                      {academy.title}
                    </h3>
                    <p className="text-slate-600 mt-2">{academy.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {academy.status === 'in_progress' && !isExpanded && (
                      <span className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm">
                        ادامه یادگیری
                      </span>
                    )}
                    {academy.status !== 'locked' && (
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                      </div>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-100 p-6">
                    <h4 className="font-bold text-slate-700 mb-4 text-sm">مدل ۵ مرحله‌ای EplCone:</h4>
                    <div className="space-y-3">
                      {learningSteps.map((step, stepIdx) => {
                        const StepIcon = step.icon;
                        return (
                          <div key={step.id} className={`flex items-center gap-4 p-4 rounded-xl bg-white border ${
                            step.status === 'in_progress' ? 'border-blue-300 shadow-sm' : 'border-slate-200'
                          }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              step.status === 'completed' ? 'bg-green-100 text-green-600' :
                              step.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                              'bg-slate-100 text-slate-400'
                            }`}>
                              {step.status === 'completed' ? <CheckCircle2 size={16} /> : <span className="font-bold text-xs">{stepIdx + 1}</span>}
                            </div>
                            <div className="flex-1">
                              <h5 className={`font-bold text-sm ${step.status === 'locked' ? 'text-slate-500' : 'text-slate-800'}`}>
                                {step.name}
                              </h5>
                              <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                            </div>
                            <div>
                              {step.status === 'in_progress' && (
                                <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                  <StepIcon size={20} />
                                </button>
                              )}
                              {step.status === 'locked' && (
                                <Lock size={16} className="text-slate-300" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
