
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Zap, 
  Target, 
  Info, 
  ChevronRight, 
  Crown, 
  Cpu, 
  Activity,
  Fingerprint,
  Lock,
  X,
  AlertCircle,
  Network,
  Terminal,
  Verified,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { Expert } from '../types';
import { EXPERTS } from '../constants';
import { NodeInventoryItemSkeleton } from './Skeleton';

interface MissionArchitectProps {
  onDeploy: (squad: Expert[], economics: any) => void;
}

const STORAGE_KEY = 'mission_architect_squad_v3';

const MissionArchitect: React.FC<MissionArchitectProps> = ({ onDeploy }) => {
  const [loading, setLoading] = useState(true);
  const [squad, setSquad] = useState<Expert[]>([]);
  const [draggedNode, setDraggedNode] = useState<Expert | null>(null);

  useEffect(() => {
    setLoading(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedIds = JSON.parse(saved);
        const reconstructedSquad = parsedIds.map((id: string) => EXPERTS.find(e => e.id === id)).filter(Boolean);
        setSquad(reconstructedSquad as Expert[]);
      } catch (e) {
        console.error("Restoration failed", e);
      }
    }
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(squad.map(e => e.id)));
  }, [squad]);

  const nodesByTier = useMemo(() => {
    return {
      t1: EXPERTS.filter(e => e.tier === 1).slice(0, 8),
      t2: EXPERTS.filter(e => e.tier === 2).slice(0, 10),
      t3: EXPERTS.filter(e => e.tier === 3).slice(0, 10),
    };
  }, []);

  const metrics = useMemo(() => {
    const subtotal = squad.reduce((sum, e) => sum + e.hourlyRate, 0);
    const platformFee = Math.round(subtotal * 0.10);
    const handshakeFees = Math.round(subtotal * 0.05);
    const total = subtotal + platformFee + handshakeFees;
    
    // Squad Logic
    const hasLead = squad.some(e => e.tier === 1);
    const diversityBonus = new Set(squad.map(e => e.industry)).size * 5;
    const intelligenceIndex = squad.length > 0 
      ? Math.min(100, Math.round((squad.reduce((sum, e) => sum + (4 - (e.tier || 3)) * 25, 0) / (squad.length * 75)) * 100) + diversityBonus)
      : 0;
      
    const synergyLevel = hasLead ? Math.min(99, 75 + (squad.length * 4)) : Math.min(60, squad.length * 15);
    
    return { subtotal, platformFee, handshakeFees, total, intelligenceIndex, synergyLevel, hasLead };
  }, [squad]);

  const addNode = (node: Expert) => {
    if (squad.length >= 6) return; // Limit to 6 for canvas space
    if (squad.find(e => e.id === node.id)) return;
    setSquad(prev => [...prev, node]);
  };

  const removeNode = (id: string) => {
    setSquad(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="flex h-[800px] bg-white dark:bg-[#020203] rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-premium w-full relative font-sans">
      
      {/* 1. NODE INVENTORY (LEFT RAIL) */}
      <div className="w-[300px] bg-slate-50 dark:bg-[#080808] border-r border-slate-200 dark:border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-london-blue/10 flex items-center justify-center border border-london-blue/20">
              <Compass size={16} className="text-london-blue" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Intelligence Registry</span>
          </div>
          <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font">Node Inventory</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-8">
          {/* TIER 1 - SOVEREIGN */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-gold-accent opacity-60">L1: SOVEREIGN SQUAD</p>
                <Crown size={12} className="text-gold-accent opacity-40" />
             </div>
             <div className="space-y-2">
                {loading ? [...Array(3)].map((_, i) => <NodeInventoryItemSkeleton key={i} />) : (
                  nodesByTier.t1.map(node => (
                    <motion.div 
                      key={node.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => addNode(node)}
                      className="p-4 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl cursor-pointer hover:border-gold-accent/50 transition-all group shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-[11px] font-black italic uppercase text-slate-900 dark:text-white group-hover:text-gold-accent transition-colors truncate pr-2">{node.name}</p>
                        <span className="text-[10px] font-black text-gold-accent shrink-0">£{node.hourlyRate}</span>
                      </div>
                      <p className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest truncate">{node.industry}</p>
                    </motion.div>
                  ))
                )}
             </div>
          </div>

          {/* TIER 2 - OPERATIONAL */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-london-blue opacity-60">L2: OPERATIONAL CORE</p>
                <Cpu size={12} className="text-london-blue opacity-40" />
             </div>
             <div className="space-y-2">
                {loading ? [...Array(3)].map((_, i) => <NodeInventoryItemSkeleton key={i} />) : (
                  nodesByTier.t2.map(node => (
                    <motion.div 
                      key={node.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => addNode(node)}
                      className="p-4 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl cursor-pointer hover:border-london-blue/40 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-0.5">
                        <p className="text-[11px] font-black italic uppercase text-slate-900 dark:text-white group-hover:text-london-blue transition-colors truncate pr-2">{node.name}</p>
                        <span className="text-[10px] font-black text-slate-400 shrink-0">£{node.hourlyRate}</span>
                      </div>
                      <p className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest truncate">{node.industry}</p>
                    </motion.div>
                  ))
                )}
             </div>
          </div>
        </div>
      </div>

      {/* 2. MISSION CANVAS (CENTRAL COLUMN) */}
      <div className="flex-1 bg-white dark:bg-[#050505] relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
        
        <div className="p-10 z-10 flex justify-between items-start shrink-0">
           <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font">
                 Mission <span className="text-london-blue">Canvas.</span>
              </h1>
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-600 pl-1">
                   SYNC_NODE: COMMAND_CENTER_LND
                 </p>
                 <div className="px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                   DEPLOYMENT_LIVE
                 </div>
              </div>
           </div>
           <button 
             onClick={() => setSquad([])}
             className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-red-500 transition-all shadow-lg active:scale-90"
           >
             <Trash2 size={20} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-10 pb-10 flex flex-col items-center">
           <AnimatePresence mode="popLayout">
              {squad.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-24 flex flex-col items-center text-center space-y-10"
                >
                   <div className="w-48 h-48 rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.01] flex items-center justify-center relative group cursor-pointer hover:border-london-blue/30 transition-all">
                      <div className="absolute inset-0 bg-london-blue/5 blur-[80px] rounded-full group-hover:bg-london-blue/10 transition-all duration-1000" />
                      <Plus size={64} className="text-slate-300 dark:text-slate-700 relative z-10 group-hover:text-london-blue transition-colors" />
                   </div>
                   <div className="space-y-3">
                     <p className="text-3xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Initialize Squad Node</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Select expert nodes from the registry to synchronize mission parameters</p>
                   </div>
                </motion.div>
              ) : (
                <div className="w-full max-w-2xl space-y-4 py-4">
                   {squad.map((node) => (
                     <motion.div
                       layout key={node.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                       className={`w-full p-8 rounded-[2.5rem] border-2 bg-slate-50/80 dark:bg-[#0A0B0E]/80 backdrop-blur-3xl shadow-2xl flex items-center justify-between gap-6 group relative overflow-hidden transition-all duration-500 ${node.tier === 1 ? 'border-gold-accent/30 shadow-gold-glow' : 'border-slate-100 dark:border-white/5 hover:border-london-blue/30'}`}
                     >
                        <div className="flex items-center gap-8 relative z-10">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-all ${node.tier === 1 ? 'bg-gold-accent/10 border-gold-accent text-gold-accent' : 'bg-london-blue/10 border-london-blue/30 text-london-blue'}`}>
                              {node.tier === 1 ? <Crown size={24} /> : <Cpu size={24} />}
                           </div>
                           <div className="space-y-1">
                              <h5 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{node.name}</h5>
                              <div className="flex items-center gap-3">
                                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{node.industry}</p>
                                <div className="w-1 h-1 rounded-full bg-london-blue/40" />
                                <p className="text-[8px] font-black uppercase tracking-widest text-london-blue">T{node.tier} NODE</p>
                              </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-10 relative z-10 shrink-0">
                           <div className="text-right">
                              <p className="text-[9px] font-black uppercase tracking-widest text-london-blue opacity-60">Yield Node</p>
                              <p className="text-3xl font-black italic text-slate-900 dark:text-white tracking-tighter leading-none mt-1">£{node.hourlyRate}</p>
                           </div>
                           <button 
                             onClick={() => removeNode(node.id)}
                             className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 flex items-center justify-center hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90 shadow-lg"
                           >
                             <X size={16} />
                           </button>
                        </div>
                     </motion.div>
                   ))}
                </div>
              )}
           </AnimatePresence>
        </div>

        {/* HUD FOOTER */}
        <div className="p-8 border-t border-slate-100 dark:border-white/5 z-10 flex justify-between items-center bg-slate-50/50 dark:bg-black/40 backdrop-blur-3xl shrink-0">
           <div className="flex items-center gap-12">
              <div className="space-y-2">
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 uppercase">Node Presence Map</p>
                 <div className="flex gap-1.5">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className={`w-3 h-5 rounded transition-all duration-700 ${i <= squad.length ? (metrics.hasLead ? 'bg-london-blue shadow-[0_0_10px_#0052FF]' : 'bg-slate-300 dark:bg-slate-700') : 'bg-slate-200 dark:bg-white/5'}`} />
                    ))}
                 </div>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div className="space-y-1">
                 <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 uppercase">Integrity Score</p>
                 <div className="flex items-center gap-3">
                   <Activity size={16} className="text-emerald-600 dark:text-emerald-500 animate-pulse" />
                   <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 italic tracking-tighter">{metrics.synergyLevel}% OPS_STABLE</p>
                 </div>
              </div>
           </div>
           <div className="px-6 py-3 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 text-slate-500 flex items-center gap-3 shadow-lg">
              <Network size={16} className="text-london-blue animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Mesh Logic Active</span>
           </div>
        </div>
      </div>

      {/* 3. AUTHORIZED CAPITAL (RIGHT RAIL) */}
      <div className="w-[340px] bg-slate-50 dark:bg-[#0A0B0E] border-l border-slate-200 dark:border-white/5 flex flex-col p-10 backdrop-blur-3xl shrink-0">
         <div className="flex-1 space-y-12">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-london-blue/10 border border-london-blue/20 rounded-full shadow-lg">
                  <Fingerprint size={12} className="text-london-blue" />
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-london-blue">Economic Protocol v4.2</span>
               </div>
               <h4 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.85] hero-font">Authorized <br/><span className="text-london-blue">Capital.</span></h4>
            </div>

            <div className="space-y-10">
               <div className="space-y-6 border-b border-slate-200 dark:border-white/10 pb-8">
                  <div className="flex justify-between items-center group">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-300 transition-colors">Squad Yield</span>
                     <span className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter tabular-nums">£{metrics.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center group opacity-50">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registry Fee (10%)</span>
                        <Info size={10} className="text-slate-300 dark:text-slate-700" />
                     </div>
                     <span className="text-xl font-black tabular-nums">£{metrics.platformFee}</span>
                  </div>
                  <div className="flex justify-between items-center group opacity-50">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Handshake Sync (5%)</span>
                        <Info size={10} className="text-slate-300 dark:text-slate-700" />
                     </div>
                     <span className="text-xl font-black tabular-nums">£{metrics.handshakeFees}</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-london-blue">Total Allocation</p>
                    <div className="h-px flex-1 bg-london-blue/20" />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                     <h2 className="text-7xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none tabular-nums shadow-blue-500/10">£{metrics.total}</h2>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mt-2 opacity-60 italic">Burn rate per mission cycle</p>
                  </div>
               </div>
            </div>

            <div className={`p-6 rounded-[2.5rem] border-2 transition-all duration-700 ${metrics.hasLead ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20' : 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 opacity-50'}`}>
               <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={20} className={metrics.hasLead ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-400'} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${metrics.hasLead ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-400'}`}>
                    {metrics.hasLead ? 'ARCHITECTURE VALID' : 'SQUAD IDLE'}
                  </span>
               </div>
               <p className="text-[10px] text-slate-500 italic leading-relaxed font-light">
                 {metrics.hasLead 
                   ? "Squad configuration verified by L3-Registry. Operational Lead node detected." 
                   : "Mission parameters require a T1 or T2 lead node for deployment authorization."}
               </p>
            </div>
         </div>

         <div className="space-y-6 pt-10 shrink-0">
            <button 
              disabled={squad.length === 0}
              onClick={() => onDeploy(squad, metrics)}
              className="w-full py-8 bg-london-blue text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 disabled:opacity-5 disabled:grayscale group relative overflow-hidden"
            >
               <div className="flex items-center justify-center gap-3 relative z-10">
                 Authorize Mission <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
            </button>
            <div className="text-center opacity-40">
               <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">SECURE L3 ESCROW SYNC MMXXVI • HMRC COMPLIANT</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MissionArchitect;
