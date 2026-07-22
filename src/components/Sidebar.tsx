import React from 'react';
import { LayoutDashboard, GraduationCap, Factory, Bot, Award, Users } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onChangeView: (view: ViewType) => void;
}

export function Sidebar({ currentView, onChangeView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'learning_path', label: 'مسیر یادگیری', icon: GraduationCap },
    { id: 'digital_factory', label: 'کارخانه دیجیتال', icon: Factory },
    { id: 'ai_mentor', label: 'هسته AI', icon: Bot },
    { id: 'portfolio', label: 'پورتفولیو و مهارت‌ها', icon: Award },
    { id: 'community', label: 'شبکه متخصصان', icon: Users },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-100 flex flex-col h-full rtl">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
            EC
          </div>
          <h1 className="text-xl font-bold tracking-tight">EplCone</h1>
        </div>
        <p className="text-slate-400 text-xs mt-2">آکادمی هوشمند اتوماسیون</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">نسخه پلتفرم</p>
          <p className="text-sm font-semibold text-slate-200">EIEMB v1.0</p>
        </div>
      </div>
    </div>
  );
}
