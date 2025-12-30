
import React, { useState } from 'react';
import { ViewState, UserRole } from '../types';
import { Menu, User, Zap, UserPlus, LogIn, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: ViewState, reset?: boolean) => void;
  currentView: ViewState;
  userRole: UserRole;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  userRole, 
  onLogout,
  isScrolled 
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNav = (v: ViewState, reset: boolean = false) => {
    onNavigate(v, reset);
    setUserMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[400] transition-all duration-700 pointer-events-none ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pointer-events-auto">
        <div className={`flex items-center justify-between rounded-full px-6 py-2.5 transition-all duration-500 border ${
          isScrolled 
            ? 'bg-white/90 dark:bg-black/80 backdrop-blur-2xl border-slate-200 dark:border-white/10 shadow-2xl' 
            : 'bg-white/5 backdrop-blur-md border-white/10'
        }`}>
          {/* Logo Section Removed per request */}
          <div className="flex-1 lg:flex-none" />

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center space-x-10 text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${
            isScrolled ? 'text-slate-500' : 'text-slate-600 dark:text-slate-400'
          }`}>
            <button onClick={() => handleNav(ViewState.BROWSE, true)} className="hover:text-london-blue transition-all">Registry</button>
            <button onClick={() => handleNav(ViewState.HOW_IT_WORKS)} className="hover:text-london-blue transition-all">Protocol</button>
            <button onClick={() => handleNav(ViewState.FOR_CONSULTANTS)} className="hover:text-london-blue transition-all">Deploy Mind</button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full border transition-all hover:shadow-lg active:scale-95 ${
                  isScrolled 
                    ? 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm' 
                    : 'border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/40 text-slate-900 dark:text-white'
                }`}
              >
                <Menu size={18} className={isScrolled ? 'text-slate-600 dark:text-slate-400' : 'text-slate-600 dark:text-slate-400'} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner transition-transform group-hover:scale-105 ${userRole ? 'bg-london-blue' : 'bg-slate-400 dark:bg-slate-700'}`}>
                  {userRole ? <span className="text-[10px] font-black uppercase">{userRole[0]}</span> : <User size={16} />}
                </div>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#0D1117] backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.25)] py-4 animate-in zoom-in-95 duration-200 overflow-hidden ring-1 ring-black/5">
                    {!userRole ? (
                      <div className="px-2 space-y-1">
                        <button onClick={() => handleNav(ViewState.LOGIN)} className="w-full flex items-center justify-between px-6 py-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                          <span className="flex items-center gap-4"><UserPlus size={18} className="text-london-blue" /> Sign Up</span>
                          <ChevronRight size={14} className="opacity-30" />
                        </button>
                        <button onClick={() => handleNav(ViewState.LOGIN)} className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                          <span className="flex items-center gap-4"><LogIn size={18} /> Log In</span>
                          <ChevronRight size={14} className="opacity-30" />
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-white/5 my-2 mx-4" />
                        <button onClick={() => handleNav(ViewState.FOR_CONSULTANTS)} className="w-full flex items-center px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                          Consult with Registry
                        </button>
                        <button onClick={() => handleNav(ViewState.HOW_IT_WORKS)} className="w-full flex items-center px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">
                          How it works
                        </button>
                      </div>
                    ) : (
                      <div className="px-2 space-y-1">
                        <button onClick={() => handleNav(userRole === 'USER' ? ViewState.DASHBOARD_USER : ViewState.DASHBOARD_CONSULTANT)} className="w-full text-left px-6 py-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all">Terminal Home</button>
                        <button onClick={onLogout} className="w-full text-left px-6 py-4 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all">End Session</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
