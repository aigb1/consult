
import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Zap, ShieldCheck, Cpu, Globe, Terminal, ChevronRight, Fingerprint, Command, Search } from 'lucide-react';
import { ViewState } from '../types';
import { SkeletonBase } from './Skeleton';

interface HeroProps {
  onFilterSelect: (filter: string, search?: string) => void;
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
}

const Hero: React.FC<HeroProps> = ({ onFilterSelect, onNavigate, isLoggedIn }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    onFilterSelect('All', searchValue);
  };

  const suggestions = [
    { title: "L3 Compliance Node", desc: "Audit fractional strategy", icon: <ShieldCheck size={14} /> },
    { title: "Neural Transformation", desc: "Deploy AI workflows", icon: <Cpu size={14} /> },
    { title: "City Growth Protocol", desc: "Scale fintech ops", icon: <Globe size={14} /> },
    { title: "Legal Adjudication", desc: "Verify UK contract logic", icon: <Fingerprint size={14} /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 max-w-5xl mx-auto w-full pt-12 pb-32">
        
        {/* Workspace Brand Header */}
        <div className="w-full mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-london-blue text-white flex items-center justify-center shadow-lg">
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-london-blue">Consultancy.london / Mainnet</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase hero-font leading-none text-slate-900 dark:text-white">
            Registry <br/> <span className="text-slate-300 dark:text-slate-800">Terminal.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 dark:text-slate-500 font-light italic max-w-lg">
            Deploy elite London intelligence via encrypted fractional nodes. Direct access, zero friction.
          </p>
        </div>

        {/* The "Command" Prompt Bar */}
        <div className="w-full space-y-8">
          <div className={`relative group transition-all duration-500 ${isFocused ? 'scale-[1.01]' : 'scale-100'}`}>
            <div className={`absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-london-blue/20 to-transparent blur-2xl transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
            
            <div className={`relative bg-white dark:bg-[#0D0D0D] border-2 rounded-[2rem] p-4 flex flex-col transition-all duration-500 ${isFocused ? 'border-london-blue shadow-premium' : 'border-slate-100 dark:border-white/5 shadow-sm'}`}>
              <textarea 
                value={searchValue} 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Initialise mission brief (e.g. Need an FCA compliance lead for Series B fintech audit...)" 
                className="w-full bg-transparent border-none p-6 text-xl md:text-2xl focus:ring-0 resize-none h-[120px] text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800 font-light italic" 
              />
              
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <Command size={10} /> + K
                  </div>
                  <button className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors" title="Attach Brief">
                    <Sparkles size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleSearch} 
                  disabled={!searchValue.trim()} 
                  className={`h-12 px-8 rounded-xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all ${
                    searchValue.trim() 
                    ? 'bg-london-blue text-white shadow-xl hover:scale-105 active:scale-95' 
                    : 'bg-slate-50 dark:bg-white/5 text-slate-200 dark:text-slate-800 cursor-not-allowed'
                  }`}
                >
                  Deploy Node <ArrowUp size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Suggested Nodes (ChatGPT Style) */}
          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 pl-2">Synchronise Vertical Node</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {loading ? (
                 [...Array(4)].map((_, i) => <SkeletonBase key={i} className="h-16 w-full rounded-2xl" />)
               ) : (
                 suggestions.map((s, i) => (
                   <button 
                     key={i} 
                     onClick={() => setSearchValue(s.title)} 
                     className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.01] hover:border-london-blue/30 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all text-left"
                   >
                     <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-london-blue group-hover:bg-london-blue/10 transition-all">
                       {s.icon}
                     </div>
                     <div>
                       <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{s.title}</p>
                       <p className="text-[9px] text-slate-500 italic mt-0.5">{s.desc}</p>
                     </div>
                   </button>
                 ))
               )}
             </div>
          </div>
        </div>

        {/* Global Registry State */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 border-t border-slate-100 dark:border-white/5 pt-12">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">542 Active Nodes</span>
           </div>
           <div className="flex items-center gap-3">
              <ShieldCheck size={14} className="text-london-blue" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">L3 Encrypted Sync</span>
           </div>
           <div className="flex items-center gap-3">
              <Terminal size={14} className="text-slate-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">London v4.2.1 Stable</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
