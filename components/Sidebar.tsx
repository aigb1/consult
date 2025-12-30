
import React from 'react';
import { ViewState, UserRole } from '../types';
import { INDUSTRIES, ICON_MAP } from '../constants';
import { 
  LogOut, 
  Zap, 
  Sun,
  Moon,
  Compass,
  Grid2X2,
  FolderOpen,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: ViewState) => void;
  onFilterSelect: (filter: string) => void;
  currentView: ViewState;
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRole;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  activeIndustry?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onNavigate, 
  onFilterSelect, 
  currentView, 
  isOpen, 
  onToggle, 
  userRole, 
  onLogout, 
  isDarkMode, 
  onToggleTheme,
  activeIndustry = 'All'
}) => {
  const navItems = [
    { 
      id: 'control-center',
      view: userRole === 'USER' ? ViewState.DASHBOARD_USER : ViewState.DASHBOARD_CONSULTANT, 
      label: 'Control Center', 
      icon: <Grid2X2 size={18} strokeWidth={1.5} />,
      show: !!userRole,
      active: currentView === ViewState.DASHBOARD_USER || currentView === ViewState.DASHBOARD_CONSULTANT
    },
    { 
      id: 'registry',
      view: ViewState.BROWSE, 
      label: 'Intel Registry', 
      icon: <Compass size={18} strokeWidth={1.5} />,
      show: true,
      active: currentView === ViewState.BROWSE || currentView === ViewState.EXPERT_PROFILE
    },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 z-[240] bg-black/80 lg:hidden transition-opacity duration-500 backdrop-blur-sm ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onToggle} 
      />
      
      <aside className={`fixed inset-y-0 left-0 z-[250] bg-white dark:bg-[#050505] border-r border-slate-200 dark:border-white/[0.03] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'w-[280px] translate-x-0' : 'w-[84px] lg:translate-x-0 -translate-x-full'}`}>
        {/* Floating Toggle Button - Centered Vertically */}
        <button 
          onClick={onToggle} 
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center text-london-blue hover:scale-110 active:scale-95 transition-all z-[300]"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <ChevronLeft size={16} strokeWidth={3} /> : <ChevronRight size={16} strokeWidth={3} />}
        </button>

        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Top Brand */}
          <div className="h-20 flex items-center px-6 shrink-0 relative">
            <div className={`flex items-center w-full transition-all duration-300 ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <div className={`flex items-center gap-3 cursor-pointer group ${!isOpen && 'scale-110'}`} onClick={() => onNavigate(ViewState.BROWSE)}>
                 <div className="w-10 h-10 rounded-[14px] bg-london-blue text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,82,255,0.3)] group-hover:scale-105 transition-transform duration-500">
                    <Zap size={20} fill="currentColor" />
                 </div>
                 {isOpen && (
                   <div className="flex flex-col -space-y-1 animate-in fade-in slide-in-from-left-2 duration-500">
                      <span className="text-lg font-black tracking-tighter uppercase italic hero-font dark:text-white leading-none">Registry</span>
                      <span className="text-[7px] font-black uppercase tracking-[0.4em] text-london-blue">Mainnet</span>
                   </div>
                 )}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 space-y-8">
            <div className="space-y-1.5">
              {navItems.filter(item => item.show).map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => onNavigate(item.view)} 
                  className={`w-full flex items-center gap-4 py-2 rounded-2xl transition-all duration-300 group relative ${item.active ? 'bg-slate-100 dark:bg-white/[0.05] text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.02]'} ${isOpen ? 'px-2' : 'justify-center'}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${item.active ? 'bg-london-blue text-white shadow-lg shadow-blue-500/20 scale-105' : 'bg-slate-100 dark:bg-white/[0.03] group-hover:bg-london-blue/10 group-hover:text-london-blue'}`}>
                    {item.icon}
                  </div>
                  {isOpen && <span className="truncate font-bold text-[11px] uppercase tracking-widest">{item.label}</span>}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-4">
              {isOpen && (
                <div className="px-4 mb-4 flex items-center justify-between">
                  <p className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] flex items-center gap-2">
                    <FolderOpen size={10} className="text-london-blue" /> Strategic Index
                  </p>
                  <div className="h-px flex-1 bg-slate-100 dark:bg-white/[0.03] ml-4" />
                </div>
              )}
              
              <div className="space-y-0.5">
                {INDUSTRIES.map((ind) => {
                  const isActive = activeIndustry === ind.title;
                  return (
                    <button 
                      key={ind.id} 
                      onClick={() => onFilterSelect(ind.title)} 
                      className={`w-full flex items-center gap-4 py-2 rounded-xl transition-all duration-300 group relative ${isOpen ? 'px-2' : 'justify-center'} ${isActive ? 'bg-london-blue/5 dark:bg-london-blue/10' : ''}`}
                    >
                      <div className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-london-blue text-white border-london-blue shadow-lg' : isOpen ? 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/[0.03] group-hover:border-london-blue/30 group-hover:scale-105' : 'bg-transparent border-transparent text-slate-500 group-hover:text-london-blue'}`}>
                        <div className={`scale-[0.75] transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                          {ICON_MAP[ind.icon] || <Zap size={16} />}
                        </div>
                      </div>
                      {isOpen && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className={`truncate text-[11px] font-bold italic transition-colors ${isActive ? 'text-london-blue' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                            {ind.title}
                          </span>
                          <ArrowUpRight size={10} className={`transition-all ${isActive ? 'opacity-100 text-london-blue' : 'opacity-0 group-hover:opacity-30 text-london-blue'}`} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 shrink-0 border-t border-slate-100 dark:border-white/[0.03] space-y-3">
            <button 
              onClick={onToggleTheme}
              className={`w-full flex items-center gap-4 py-2 rounded-2xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.03] transition-all group ${isOpen ? 'px-2' : 'justify-center'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.03] flex items-center justify-center shrink-0 transition-all duration-700 group-hover:rotate-[360deg] group-hover:text-london-blue">
                {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </div>
              {isOpen && <span className="text-[10px] font-black uppercase tracking-widest">Interface</span>}
            </button>

            {userRole && (
              <button 
                onClick={onLogout}
                className={`w-full flex items-center gap-4 py-2 rounded-2xl text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-all group ${isOpen ? 'px-2' : 'justify-center'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/5 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <LogOut size={18} strokeWidth={1.5} />
                </div>
                {isOpen && <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
