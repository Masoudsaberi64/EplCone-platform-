import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between rtl">
      <div className="flex items-center gap-4 bg-slate-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="جستجو در دوره‌ها، تجهیزات و..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-r border-slate-200">
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">{user.levelTitle} ({user.level})</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border border-blue-200">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
