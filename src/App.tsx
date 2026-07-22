import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { LearningPathView } from './views/LearningPathView';
import { DigitalFactoryView } from './views/DigitalFactoryView';
import { AIMentorView } from './views/AIMentorView';
import { PortfolioView } from './views/PortfolioView';
import { CommunityView } from './views/CommunityView';
import { ViewType, User } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const mockUser: User = {
    name: 'دانشجوی اتوماسیون',
    level: 'Level 1',
    levelTitle: 'Electrical Learner',
    progress: 15,
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView user={mockUser} onNavigate={(view) => setCurrentView(view as ViewType)} />;
      case 'learning_path':
        return <LearningPathView />;
      case 'digital_factory':
        return <DigitalFactoryView />;
      case 'ai_mentor':
        return <AIMentorView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'community':
        return <CommunityView />;
      default:
        return <DashboardView user={mockUser} onNavigate={(view) => setCurrentView(view as ViewType)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden" dir="rtl">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={mockUser} />
        
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
