import React from 'react';
import { Target, Zap, Clock, ShieldCheck, ArrowLeft } from 'lucide-react';
import { User, AcademyModule } from '../types';

interface DashboardViewProps {
  user: User;
  onNavigate: (view: string) => void;
}

export function DashboardView({ user, onNavigate }: DashboardViewProps) {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 rtl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">خوش آمدید، {user.name}</h2>
          <p className="text-slate-500 mt-1">آماده‌اید تا امروز مهارت‌های جدیدی در اتوماسیون صنعتی یاد بگیرید؟</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Target} label="سطح فعلی" value={user.levelTitle} subValue={user.level} color="blue" />
        <StatCard icon={Zap} label="پروژه‌های انجام شده" value="۳ پروژه" subValue="۲ پروژه در حال انجام" color="orange" />
        <StatCard icon={Clock} label="ساعت یادگیری" value="۱۲ ساعت" subValue="در این هفته" color="green" />
        <StatCard icon={ShieldCheck} label="امتیاز مهارت" value="۴۵۰ XP" subValue="رتبه ۱۲ در بین هم‌دوره‌ای‌ها" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">مسیر یادگیری شما (Learning Path)</h3>
              <button 
                onClick={() => onNavigate('learning_path')}
                className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700"
              >
                مشاهده همه
                <ArrowLeft size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <PathItem 
                title="مفاهیم پایه برق (Electrical Foundation)" 
                progress={100} 
                status="completed" 
              />
              <PathItem 
                title="طراحی تابلو برق (Panel Engineering)" 
                progress={65} 
                status="in_progress" 
              />
              <PathItem 
                title="اتوماسیون صنعتی (PLC Engineering)" 
                progress={0} 
                status="locked" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Target className="text-blue-400" />
              </div>
              <h3 className="text-lg font-bold">پروژه پیشنهادی</h3>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              با توجه به تکمیل دوره مفاهیم پایه، اکنون می‌توانید پروژه "راه‌اندازی موتور سه‌فاز" را در کارخانه دیجیتال انجام دهید.
            </p>
            <button 
              onClick={() => onNavigate('digital_factory')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              شروع پروژه در کارخانه
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subValue, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl ${colors[color as keyof typeof colors]}`}>
          <Icon size={24} />
        </div>
        <span className="text-slate-500 font-medium">{label}</span>
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        <p className="text-sm text-slate-500 mt-1">{subValue}</p>
      </div>
    </div>
  );
}

function PathItem({ title, progress, status }: { title: string, progress: number, status: 'locked' | 'in_progress' | 'completed' }) {
  return (
    <div className={`p-4 rounded-xl border ${status === 'locked' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200'} flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
        status === 'completed' ? 'border-green-500 text-green-500' :
        status === 'in_progress' ? 'border-blue-500 text-blue-500' :
        'border-slate-300 text-slate-300'
      }`}>
        {progress}%
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full rounded-full ${status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
