import React, { useState } from 'react';
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { SidebarDrawer } from './components/SidebarDrawer';
import { HiAkhiCard } from './components/HiAkhiCard';
import { DashboardCards } from './components/DashboardCards';
import { QuickLogView } from './components/QuickLogView';
import { ExpenseList } from './components/ExpenseList';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { ExpenseFormModal } from './components/ExpenseFormModal';
import { BudgetModal } from './components/BudgetModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [activeView, setActiveView] = useState('overview'); // 'overview' | 'quick-log' | 'history' | 'breakdown'

  if (currentView === 'landing') {
    return <LandingPage onStartTracking={() => setCurrentView('tracker')} />;
  }

  return (
    <div className="min-h-screen bg-[#F9CDAD] flex flex-col font-sans selection:bg-[#91204D] selection:text-white">
      {/* Top Header with Hamburger Menu Button */}
      <Header onBackToLanding={() => setCurrentView('landing')} />

      {/* Slide-out Sidebar Drawer */}
      <SidebarDrawer 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onBackToLanding={() => setCurrentView('landing')} 
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        
        {/* VIEW 1: Overview (Dashboard Cards + Hi Akhi Greeting) */}
        {activeView === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {/* Hi Akhi Greeting Card (ONLY on Overview) */}
            <HiAkhiCard />

            {/* 4 Dashboard Metric Cards */}
            <DashboardCards />

            {/* Main Content 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <ExpenseList />
              </div>
              <div className="lg:col-span-4">
                <CategoryBreakdown />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Quick Log View */}
        {activeView === 'quick-log' && (
          <div className="py-2 animate-fade-in">
            <QuickLogView onDone={() => setActiveView('overview')} />
          </div>
        )}

        {/* VIEW 3: Expense List History Only */}
        {activeView === 'history' && (
          <div className="animate-fade-in">
            <ExpenseList />
          </div>
        )}

        {/* VIEW 4: Category Breakdown Only */}
        {activeView === 'breakdown' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <CategoryBreakdown />
          </div>
        )}

      </main>

      {/* Modals & Floating Components */}
      <ExpenseFormModal />
      <BudgetModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
