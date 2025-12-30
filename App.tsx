
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ExpertBrowser from './components/ExpertBrowser';
import ExpertProfileView from './components/ExpertProfileView';
import AiMatchService from './components/AiMatchService';
import DashboardUser from './components/DashboardUser';
import DashboardConsultant from './components/DashboardConsultant';
import VideoCallView from './components/VideoCallView';
import SecurityStackPage from './components/SecurityStackPage';
import ForClientsPage from './components/ForClientsPage';
import ForConsultantsPage from './components/ForConsultantsPage';
import LegalPage from './components/LegalPage';
import PricingIndexPage from './components/PricingIndexPage';
import FaqPage from './components/FaqPage';
import NodeMonitorPage from './components/NodeMonitorPage';
import ComplianceIndexPage from './components/ComplianceIndexPage';
import AuditLogPage from './components/AuditLogPage';
import Footer from './components/Footer';
import SplitAuthView from './components/SplitAuthView';
import { ViewState, Expert, UserRole, NodeTier } from './types';
import { Lock, Fingerprint, Loader2, Target, ChevronRight, ShieldCheck, Zap, Mail, Smartphone } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter State (Consolidated)
  const [activeIndustry, setActiveIndustry] = useState<string>('All');
  const [initialSearch, setInitialSearch] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [selectedTiers, setSelectedTiers] = useState<NodeTier[]>([1, 2, 3]);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [modalityFilter, setModalityFilter] = useState<'all' | 'video' | 'in-person'>('all');
  const [selectedHubs, setSelectedHubs] = useState<string[]>([]);
  const [fastTrack, setFastTrack] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 50);
  };

  const navigateTo = (newView: ViewState, resetFilters: boolean = false) => {
    if (!userRole && [ViewState.DASHBOARD_USER, ViewState.DASHBOARD_CONSULTANT, ViewState.VIDEO_CALL].includes(newView)) {
      setView(ViewState.LANDING);
      return;
    }

    const targetView = (newView === ViewState.HOME || newView === ViewState.LOGIN) 
      ? (userRole ? ViewState.BROWSE : ViewState.LANDING) 
      : newView;
    
    setView(targetView);
    
    if (resetFilters || (targetView !== ViewState.BROWSE && targetView !== ViewState.EXPERT_PROFILE)) {
      setActiveIndustry('All');
      setInitialSearch('');
      setPriceRange(2000);
      setSelectedTiers([1, 2, 3]);
      setOnlyOnline(false);
      setModalityFilter('all');
      setSelectedHubs([]);
      setFastTrack(false);
    }

    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setView(ViewState.BROWSE);
  };

  const handleLogout = () => {
    setUserRole(null);
    setSelectedExpert(null);
    setView(ViewState.LANDING);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  };

  const handleSidebarIndustryFilter = (industry: string, search: string = '') => {
    setActiveIndustry(industry);
    if (search) setInitialSearch(search);
    setView(ViewState.BROWSE);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleViewExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setView(ViewState.EXPERT_PROFILE);
  };

  const renderContent = () => {
    if (!userRole && view === ViewState.LANDING) {
      return <SplitAuthView onLogin={handleLogin} />;
    }

    switch (view) {
      case ViewState.LANDING:
        return <SplitAuthView onLogin={handleLogin} />;
      case ViewState.BROWSE:
        return (
          <ExpertBrowser 
            activeIndustry={activeIndustry}
            onIndustryChange={handleSidebarIndustryFilter}
            initialSearch={initialSearch}
            onViewExpert={handleViewExpert}
            onStartCall={(e) => { setSelectedExpert(e); navigateTo(ViewState.VIDEO_CALL); }} 
            onNavigate={navigateTo} 
            isLoggedIn={!!userRole} 
            isSidebarOpen={isSidebarOpen}
            priceRange={priceRange}
            selectedTiers={selectedTiers}
            onlyOnline={onlyOnline}
            modalityFilter={modalityFilter}
            selectedHubs={selectedHubs}
            fastTrack={fastTrack}
            onPriceChange={setPriceRange}
            onTiersChange={setSelectedTiers}
            onOnlineToggle={() => setOnlyOnline(!onlyOnline)}
            onModalityChange={setModalityFilter}
            onHubsChange={setSelectedHubs}
            onFastTrackToggle={() => setFastTrack(!fastTrack)}
          />
        );
      case ViewState.EXPERT_PROFILE:
        return selectedExpert ? (
          <ExpertProfileView 
            expert={selectedExpert} 
            onBack={() => navigateTo(ViewState.BROWSE)} 
            onBook={handleViewExpert}
            onStartCall={(e) => { setSelectedExpert(e); navigateTo(ViewState.VIDEO_CALL); }}
            isLoggedIn={!!userRole}
          />
        ) : <div className="p-20 text-center text-slate-500 italic">Node selection lost. <button onClick={() => navigateTo(ViewState.BROWSE)} className="text-london-blue underline">Return to Registry</button></div>;
      case ViewState.AI_MATCH:
        return (
          <AiMatchService 
            onNavigate={navigateTo} 
            onViewExpert={handleViewExpert}
            onBookExpert={handleViewExpert} 
            isLoggedIn={!!userRole} 
          />
        );
      case ViewState.DASHBOARD_USER:
        return <DashboardUser onLogout={handleLogout} onBrowse={() => navigateTo(ViewState.BROWSE)} onStartCall={() => navigateTo(ViewState.VIDEO_CALL)} />;
      case ViewState.DASHBOARD_CONSULTANT:
        return (
          <DashboardConsultant 
            onLogout={handleLogout} 
            onViewRegistry={() => navigateTo(ViewState.BROWSE)} 
            onJoinCall={(expert) => { 
              setSelectedExpert(expert); 
              navigateTo(ViewState.VIDEO_CALL); 
            }} 
          />
        );
      case ViewState.VIDEO_CALL:
        return selectedExpert ? <VideoCallView expert={selectedExpert} onEndCall={() => navigateTo(userRole === 'USER' ? ViewState.DASHBOARD_USER : ViewState.DASHBOARD_CONSULTANT)} /> : null;
      case ViewState.SECURITY:
        return <SecurityStackPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.FOR_CLIENTS:
        return <ForClientsPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.FOR_CONSULTANTS:
        return <ForConsultantsPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.PRICING:
        return <PricingIndexPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.FAQ:
        return <FaqPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.PRIVACY:
        return <LegalPage type="PRIVACY" onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.TERMS:
        return <LegalPage type="TERMS" onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.ARBITRATION:
        return <LegalPage type="ARBITRATION" onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.HMRC:
        return <LegalPage type="HMRC" onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.NODE_MONITOR:
        return <NodeMonitorPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.COMPLIANCE_INDEX:
        return <ComplianceIndexPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      case ViewState.AUDIT_LOG:
        return <AuditLogPage onBack={() => navigateTo(ViewState.BROWSE)} />;
      default:
        return <SplitAuthView onLogin={handleLogin} />;
    }
  };

  const isFullFrame = [ViewState.VIDEO_CALL, ViewState.NODE_MONITOR, ViewState.EXPERT_PROFILE, ViewState.LANDING].includes(view);
  const showFooter = [ViewState.BROWSE, ViewState.AI_MATCH, ViewState.SECURITY, ViewState.PRICING, ViewState.FAQ, ViewState.FOR_CLIENTS, ViewState.FOR_CONSULTANTS, ViewState.COMPLIANCE_INDEX].includes(view);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 font-sans selection:bg-london-blue selection:text-white transition-colors duration-500 overflow-hidden">
      
      {!isFullFrame && (
        <Sidebar 
          onNavigate={navigateTo}
          onFilterSelect={handleSidebarIndustryFilter}
          currentView={view}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          userRole={userRole}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          activeIndustry={activeIndustry}
        />
      )}

      <main 
        className={`flex-1 relative flex flex-col min-w-0 h-full transition-all duration-300 ${
          !isFullFrame ? (isSidebarOpen ? 'lg:pl-[280px]' : 'lg:pl-[84px]') : ''
        }`}
      >
        <div className="flex-1 h-full overflow-hidden relative">
          <div 
            ref={scrollContainerRef} 
            className={`h-full scrollbar-gpt overflow-y-auto`}
            onScroll={handleScroll}
          >
            <div className="transition-all duration-700">
              {renderContent()}
            </div>
            {showFooter && (
              <div>
                <Footer onNavigate={navigateTo} onFilterNavigate={(f) => handleSidebarIndustryFilter(f)} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
