
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Clock, 
  Activity, 
  Star, 
  ChevronRight, 
  Zap, 
  Target, 
  History as HistoryIcon, 
  RefreshCw, 
  PoundSterling, 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  Search, 
  Terminal, 
  Database, 
  MoreHorizontal,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  AlertCircle,
  MoreVertical,
  ExternalLink,
  Edit,
  Plus,
  Settings,
  CircleCheck,
  CheckCircle2,
  CalendarDays,
  Lock,
  Sun,
  Moon,
  X,
  UserCircle,
  // Added missing icon imports
  ArrowRight,
  Globe
} from 'lucide-react';
import MissionArchitect from './MissionArchitect';
import ConsultantProfileEdit from './ConsultantProfileEdit';
import { Expert } from '../types';
import { EXPERTS } from '../constants';
import { StatCardSkeleton, TableRowSkeleton, BentoBlockSkeleton } from './Skeleton';

interface DashboardConsultantProps {
  onLogout: () => void;
  onViewRegistry: () => void;
  onJoinCall: (expert: Expert) => void;
}

interface AvailSlot {
  day: string;
  date: string;
  slots: string[];
  status: 'Synced' | 'Blocked';
}

const DashboardConsultant: React.FC<DashboardConsultantProps> = ({ onLogout, onJoinCall }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'feed' | 'schedule' | 'architect' | 'ledger' | 'profile'>('feed');
  const [isLive, setIsLive] = useState(false);
  const [consultantData, setConsultantData] = useState<Expert>(EXPERTS[0]);
  
  const [availGrid, setAvailGrid] = useState<AvailSlot[]>([
    { day: "MON", date: "22 MAY", slots: ["09:00", "14:30", "16:00"], status: "Synced" },
    { day: "TUE", date: "23 MAY", slots: ["10:30", "11:30"], status: "Synced" },
    { day: "WED", date: "24 MAY", slots: [], status: "Blocked" },
    { day: "THU", date: "25 MAY", slots: ["09:00", "16:00"], status: "Synced" }
  ]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const priorityClients = [
    { name: "NeoFin Global", tier: "L1", status: "High Yield", id: "C-01" },
    { name: "Sovereign AI Labs", tier: "L1", status: "Recurring", id: "C-02" },
    { name: "Venture Cap LDN", tier: "L2", status: "Active", id: "C-03" }
  ];

  const removeSlot = (dayIdx: number, slotTime: string) => {
    setAvailGrid(prev => prev.map((day, i) => i === dayIdx ? { ...day, slots: day.slots.filter(s => s !== slotTime) } : day));
  };

  const addSlot = (dayIdx: number) => {
    const hours = Math.floor(Math.random() * 8) + 9;
    const mins = Math.random() > 0.5 ? "00" : "30";
    const newSlot = `${hours.toString().padStart(2, '0')}:${mins}`;
    setAvailGrid(prev => prev.map((day, i) => {
      if (i === dayIdx) {
        if (day.slots.includes(newSlot)) return day;
        return { ...day, slots: [...day.slots, newSlot].sort(), status: 'Synced' };
      }
      return day;
    }));
  };

  const toggleStatus = (dayIdx: number) => {
    setAvailGrid(prev => prev.map((day, i) => i === dayIdx ? { ...day, status: day.status === 'Synced' ? 'Blocked' : 'Synced' } : day));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-700 font-sans pb-32">
      
      {activeTab !== 'profile' && (
        <div className="max-w-[1600px] mx-auto p-8 md:p-12 space-y-12 animate-in fade-in duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className={`px-3 py-1 rounded-full border text-[8px] font-black tracking-widest flex items-center gap-2 transition-all ${isLive ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-600'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400 dark:bg-slate-700'}`} />
                    {isLive ? 'TERMINAL_LIVE' : 'SYSTEM_IDLE'}
                 </div>
                 <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 italic">ID_NODE: {consultantData.id.toUpperCase()}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase hero-font text-slate-900 dark:text-white leading-none">Consultant <span className="text-slate-300 dark:text-slate-800">Control.</span></h1>
              <p className="text-lg text-slate-500 dark:text-slate-500 font-light italic">Manage fractional yield nodes and synchronize high-fidelity engagements.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsLive(!isLive)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${isLive ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-500' : 'bg-london-blue text-white shadow-3xl shadow-blue-500/20'}`}>{isLive ? 'Kill Node' : 'Initialize Live'}</button>
              <button onClick={() => setActiveTab('profile')} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400 hover:text-london-blue hover:border-london-blue/30 transition-all flex items-center justify-center shadow-lg active:scale-90 group">
                <UserCircle size={22} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex gap-12 border-b border-slate-100 dark:border-white/5 mb-12 overflow-x-auto scrollbar-hide no-scrollbar">
            {[
              { id: 'feed', label: 'Telemetry Feed', icon: <Activity size={16} /> },
              { id: 'schedule', label: 'Spatial Sync', icon: <CalendarDays size={16} /> },
              { id: 'architect', label: 'Mission Architect', icon: <Target size={16} /> },
              { id: 'ledger', label: 'Yield Ledger', icon: <Database size={16} /> }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`pb-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 relative transition-all whitespace-nowrap shrink-0 ${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}>
                {tab.icon} {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-london-blue shadow-[0_0_15px_#0052FF]" />}
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            {activeTab === 'feed' && (
              <div className="grid lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 <div className="lg:col-span-2 space-y-10">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white px-2">Authorized handshakes</h2>
                    {loading ? (
                      [...Array(2)].map((_, i) => <TableRowSkeleton key={i} />)
                    ) : (
                      [1, 2].map(i => (
                        <div key={i} className="p-10 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[3.5rem] flex flex-col sm:flex-row items-center justify-between gap-10 group hover:border-london-blue/30 transition-all shadow-sm">
                           <div className="flex items-center gap-8">
                              <div className="w-20 h-20 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center font-black italic text-slate-400 dark:text-slate-500 shadow-inner">R-0{i}</div>
                              <div className="space-y-1.5">
                                 <div className="flex items-center gap-3">
                                   <p className="text-2xl font-black italic uppercase text-slate-900 dark:text-white">MISSION_ID_{1024 + i}</p>
                                   <span className="text-[9px] font-black text-london-blue uppercase tracking-[0.2em] px-3 py-1 bg-london-blue/10 rounded-full">L2 Protocol</span>
                                 </div>
                                 <p className="text-sm text-slate-500 font-light italic leading-relaxed">"Brief: Strategic audit of cross-chain liquidity nodes for ecosystem scale."</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-10">
                              <div className="text-right">
                                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Yield Node</p>
                                 <p className="text-3xl font-black italic text-slate-900 dark:text-white">£450.00</p>
                              </div>
                              <button 
                                onClick={() => onJoinCall(EXPERTS[0])} 
                                className="px-10 py-5 bg-london-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 shadow-3xl active:scale-95 transition-all"
                              >
                                Synchronize
                              </button>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
                 <div className="space-y-10">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white px-2">Node integrity</h2>
                    {loading ? <StatCardSkeleton /> : (
                      <div className="p-10 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[3.5rem] space-y-12 shadow-sm">
                         <div className="space-y-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Registry Standing Index</p>
                            <div className="flex items-end gap-3">
                               <p className="text-7xl font-black italic tracking-tighter text-slate-900 dark:text-white">4.98</p>
                               <Star size={28} fill="currentColor" className="text-london-blue mb-3 shadow-[0_0_15px_rgba(0,82,255,0.4)]" />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                               <span>Network Pulse</span>
                               <span className="text-emerald-500 font-black italic">Elite L1 Node</span>
                            </div>
                            <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-london-blue w-[98%] shadow-[0_0_10px_#0052FF]" />
                            </div>
                         </div>
                         <div className="p-8 border border-slate-100 dark:border-white/5 rounded-3xl bg-white dark:bg-black/40 space-y-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                            <p className="flex justify-between"><span className="text-emerald-500">[OK]</span> <span>IDENTITY_AUTH_X2</span></p>
                            <p className="flex justify-between"><span className="text-emerald-500">[OK]</span> <span>TAX_NODE_UK_SYNC</span></p>
                            <p className="flex justify-between"><span className="text-emerald-500">[OK]</span> <span>SLA_STABLE_V4</span></p>
                         </div>
                      </div>
                    )}
                 </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="grid lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 <div className="lg:col-span-8 space-y-10">
                    <div className="flex justify-between items-center px-2">
                       <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font">Spatial Availability Node Sync</h2>
                       <div className="flex items-center gap-3 px-4 py-2 bg-london-blue/10 border border-london-blue/20 rounded-xl">
                         <div className="w-2 h-2 rounded-full bg-london-blue animate-pulse" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-london-blue">Registry Sync Live</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {loading ? [...Array(4)].map((_, i) => <BentoBlockSkeleton key={i} />) : (
                        availGrid.map((item, i) => (
                          <div key={i} className={`p-10 border-2 bg-slate-50 dark:bg-white/[0.01] rounded-[3.5rem] space-y-8 group transition-all duration-500 ${item.status === 'Synced' ? 'border-slate-100 dark:border-white/5 hover:border-london-blue/30' : 'border-red-500/20 grayscale opacity-60'}`}>
                             <div className="flex justify-between items-start">
                                <div className="space-y-1.5" onClick={() => toggleStatus(i)}>
                                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-london-blue transition-colors cursor-pointer">{item.day}</p>
                                   <p className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">{item.date}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => addSlot(i)}
                                    disabled={item.status === 'Blocked'}
                                    className="w-10 h-10 rounded-xl bg-london-blue/10 border border-london-blue/20 text-london-blue flex items-center justify-center hover:bg-london-blue hover:text-white transition-all shadow-xl active:scale-90 disabled:opacity-0"
                                  >
                                    <Plus size={18} />
                                  </button>
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.status === 'Synced' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                                     {item.status}
                                  </span>
                                </div>
                             </div>
                             
                             <div className="flex flex-wrap gap-3 min-h-[100px] content-start">
                                {item.slots.length > 0 ? (
                                  item.slots.map(slot => (
                                    <div key={slot} className="px-5 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[1.25rem] flex items-center gap-4 group/slot hover:border-london-blue/40 transition-all shadow-sm">
                                       <span className="text-[13px] font-black italic text-slate-900 dark:text-white tabular-nums">{slot}</span>
                                       <button 
                                         onClick={() => removeSlot(i, slot)}
                                         className="text-slate-300 hover:text-red-500 opacity-0 group-hover/slot:opacity-100 transition-all hover:scale-125"
                                       >
                                         <X size={14} />
                                       </button>
                                    </div>
                                  ))
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center py-4 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-3xl space-y-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Moon size={24} className="text-slate-400" />
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Parameter Blocked</p>
                                  </div>
                                )}
                             </div>
                          </div>
                        ))
                      )}
                    </div>
                 </div>

                 <div className="lg:col-span-4 space-y-10">
                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white px-2">External Matrix Sync</h2>
                    <div className="p-12 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[3.5rem] space-y-10 shadow-lg text-center relative overflow-hidden group">
                       <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
                       <div className="w-20 h-20 rounded-[2.5rem] bg-london-blue/10 text-london-blue flex items-center justify-center mx-auto shadow-inner border border-london-blue/20 group-hover:scale-110 transition-transform duration-700">
                          <RefreshCw size={32} className="group-hover:rotate-180 transition-transform duration-1000" />
                       </div>
                       <div className="space-y-4">
                          <p className="text-2xl font-black italic tracking-tighter uppercase dark:text-white hero-font">Synchronize Registry</p>
                          <p className="text-sm text-slate-500 font-light italic leading-relaxed max-w-[240px] mx-auto">Push real-time node availability to external high-fidelity calendars.</p>
                       </div>
                       <button className="w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3">
                          Authorize Protocol Sync <ArrowRight size={16} />
                       </button>
                       <div className="flex justify-center gap-6 opacity-40">
                          <Sun size={18} />
                          <Globe size={18} />
                          <Activity size={18} />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'architect' && <MissionArchitect onDeploy={() => setActiveTab('feed')} />}

            {activeTab === 'ledger' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                 <div className="grid md:grid-cols-3 gap-10">
                    {loading ? (
                      [...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)
                    ) : (
                      <>
                        <div className="p-12 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[4rem] space-y-6 shadow-3xl relative overflow-hidden group">
                           <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-1000 rotate-12 pointer-events-none"><Zap size={220} /></div>
                           <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Fractional Cycle Yield</p>
                           <p className="text-8xl font-black italic tracking-tighter leading-none tabular-nums">£12,450</p>
                           <div className="flex items-center gap-3 pt-6">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                 <TrendingUp size={16} />
                              </div>
                              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">+12.4% vs PR_CYCLE</span>
                           </div>
                        </div>
                        <div className="p-12 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[4rem] space-y-6 shadow-sm flex flex-col justify-center group hover:border-london-blue/30 transition-colors">
                           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Escrow Liquidity</p>
                           <p className="text-6xl font-black italic tracking-tighter text-slate-900 dark:text-white tabular-nums leading-none">£4,120</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic mt-4 flex items-center gap-2">
                             <Lock size={12} className="text-london-blue" /> AUTH_PENDING_MISSION_SYNC
                           </p>
                        </div>
                        <div className="p-12 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.01] rounded-[4rem] space-y-6 shadow-sm flex flex-col justify-center">
                           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">HMRC VAT Compliance</p>
                           <div className="flex items-center gap-6">
                              <p className="text-6xl font-black italic tracking-tighter text-london-blue leading-none hero-font uppercase">Active</p>
                              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-inner">
                                 <CheckCircle2 size={32} />
                              </div>
                           </div>
                           <button className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-london-blue transition-colors mt-4">
                             <Download size={14} /> Download Protocol Invoices
                           </button>
                        </div>
                      </>
                    )}
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <ConsultantProfileEdit 
          expert={consultantData} 
          onSave={(updated) => { 
            setConsultantData(updated); 
            setActiveTab('feed'); 
          }} 
          onCancel={() => setActiveTab('feed')} 
        />
      )}
    </div>
  );
};

export default DashboardConsultant;
