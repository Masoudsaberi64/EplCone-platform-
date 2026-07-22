import React, { useState } from 'react';
import { Bot, Send, BrainCircuit, Activity, BookOpen, AlertCircle, GraduationCap, CheckSquare, Search, Briefcase } from 'lucide-react';

export function AIMentorView() {
  const [activePersona, setActivePersona] = useState('tutor');

  const personas = [
    { id: 'tutor', name: 'معلم خصوصی (AI Tutor)', icon: GraduationCap, desc: 'پاسخ به سوالات، حل تمرین و رفع اشکال' },
    { id: 'examiner', name: 'ارزیاب هوشمند (AI Examiner)', icon: CheckSquare, desc: 'آزمون شفاهی و ارزیابی مهارت' },
    { id: 'reviewer', name: 'بازبین پروژه (AI Project Reviewer)', icon: Search, desc: 'تحلیل نقشه‌ها و کدهای PLC' },
    { id: 'career', name: 'مربی شغلی (AI Career Coach)', icon: Briefcase, desc: 'رزومه، مسیر شغلی و مصاحبه' }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'سلام! من منتور هوشمند EplCone هستم. من عملکرد شما را در پروژه "راه‌اندازی موتور" تحلیل کردم. یک اشتباه در مدار فرمان وجود داشت، می‌خواهید آن را با هم بررسی کنیم؟',
      tags: ['تحلیل پروژه', 'عیب‌یابی']
    }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: input,
      tags: []
    }]);
    
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: 'دقیقاً! مشکل از اتصال تیغه نگهدارنده (Self Holding) بود. شما کنتاکت را با شستی استپ موازی کرده بودید، در حالی که باید با شستی استارت موازی می‌شد. نمودار اصلاح شده را برایتان می‌فرستم.',
        tags: ['آموزش مفهومی', 'مدار فرمان']
      }]);
    }, 1500);
  };

  return (
    <div className="p-8 h-full flex flex-col rtl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">هسته هوش مصنوعی (EplCone AI Core)</h2>
        <p className="text-slate-500 mt-1">دستیار تخصصی شما بر پایه RAG و پایگاه دانش صنعتی</p>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 flex overflow-hidden">
        {/* Sidebar Info */}
        <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bot size={18} className="text-blue-600" />
              انتخاب دستیار
            </h3>
            <div className="space-y-2">
              {personas.map(p => {
                const Icon = p.icon;
                const isActive = activePersona === p.id;
                return (
                  <button 
                    key={p.id}
                    onClick={() => setActivePersona(p.id)}
                    className={`w-full text-right p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500' 
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>{p.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              وضعیت فعلی شما
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-sm">
                <span className="text-slate-500 block mb-1">تسلط روی PLC</span>
                <span className="font-bold text-slate-800">10% (مبتدی)</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm text-sm">
                <span className="text-slate-500 block mb-1">تسلط روی مدار فرمان</span>
                <span className="font-bold text-slate-800">85% (خوب)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.type === 'ai' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {msg.type === 'ai' ? <Bot size={20} /> : <span className="font-bold text-sm">شما</span>}
                </div>
                <div className={`max-w-2xl ${msg.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`p-4 rounded-2xl ${
                    msg.type === 'ai' 
                      ? 'bg-white border border-slate-200 shadow-sm text-slate-800' 
                      : 'bg-blue-600 text-white shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                  {msg.tags && msg.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {msg.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-white border-t border-slate-200">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="سوال خود را بپرسید یا کد/نقشه را برای بررسی ارسال کنید..."
                className="w-full bg-slate-100 border-none outline-none py-4 px-6 rounded-2xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSend}
                className="absolute left-2 top-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors"
              >
                <Send size={20} className="transform rotate-180" />
              </button>
            </div>
            <div className="flex gap-4 mt-3 text-xs text-slate-500 px-2">
              <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600"><AlertCircle size={14} /> ارسال لاگ خطا</span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600"><BookOpen size={14} /> درخواست تمرین جدید</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
