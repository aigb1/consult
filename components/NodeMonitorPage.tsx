
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Globe, ShieldAlert, Cpu, Zap, Signal, Lock } from 'lucide-react';

const NodeMonitorPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [nodes, setNodes] = useState(Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)));

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(n => Math.max(10, Math.min(100, n + (Math.random() * 10 - 5)))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const boroughs = [
    "City of London", "Westminster", "Camden", "Hackney", "Southwark", 
    "Tower Hamlets", "Islington", "Lambeth", "Kensington", "Chelsea",
    "Greenwich", "Richmond"
  ];

  return (
    <div className="min-h-screen py-12 md:py-24 px-6 bg-[#050505] text-slate-300 font-mono transition-colors duration-1000 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-16"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 hover:text-white transition-all group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Exit Monitor
            </button>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic hero-font">Network <span className="text-blue-500">Monitor.</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.5em] flex items-center gap-3">
               <Lock size={12} className="text-blue-500" /> Operational Standing: L3_ENCRYPT_ACTIVE
            </p>
          </div>
          <div className="flex gap-4">
             <div className="px-8 py-4 border border-blue-500/20 rounded-2xl bg-blue-500/5 flex items-center gap-4 shadow-2xl">
               <Signal size={16} className="text-blue-500 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">London Mainnet Sync</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nodes.map((load, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl space-y-8 group hover:border-blue-500/50 transition-all shadow-xl relative overflow-hidden"
            >
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{boroughs[i]} Node</span>
                <Activity size={14} className={load > 80 ? "text-red-500" : "text-emerald-500"} />
              </div>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Node Intensity</span>
                  <span className={load > 80 ? "text-red-500" : "text-white"}>{Math.round(load)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${load}%` }}
                    className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_10px_#0052FF]'}`} 
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                 <Zap size={10} className="text-blue-500" />
                 <span className="text-[8px] uppercase font-black tracking-widest text-slate-500 italic">ADJUDICATOR_NODE_{1024 + i}</span>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"><Cpu size={120} /></div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 p-12 border border-white/5 bg-white/[0.02] rounded-[3.5rem] space-y-10 shadow-premium relative overflow-hidden"
          >
            <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white relative z-10 flex items-center gap-3">
               <Zap size={14} className="text-blue-500" /> Encryption Flux Matrix
            </h3>
            <div className="h-64 flex items-end gap-2 px-2 relative z-10">
              {nodes.map((n, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${n}%` }}
                  className="flex-1 bg-blue-500/20 border-t border-blue-500/50 transition-all duration-1000 hover:bg-blue-500/40 cursor-help" 
                />
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.6em] text-slate-600 relative z-10">
              <span>00:00:00 UTC</span>
              <span className="text-blue-500">L3_AES_256_ACTIVE_PROTOCOL</span>
              <span>23:59:59 UTC</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-12 border border-white/5 bg-white/[0.02] rounded-[3.5rem] space-y-10 shadow-premium"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white flex items-center gap-3">
               <ShieldAlert size={14} className="text-red-500" /> Security Telemetry
            </h3>
            <div className="space-y-8">
              {[
                { time: "22:41:02", msg: "Biometric auth: B. Vance", type: "info" },
                { time: "22:38:15", msg: "Handshake: Shoreditch_Hub", type: "success" },
                { time: "22:30:54", msg: "Migrating Node: Hackney -> City", type: "warning" },
                { time: "22:24:01", msg: "HMRC Invoice Sync: Complete", type: "success" },
                { time: "22:12:33", msg: "AES Rotate Pulse: Optimized", type: "info" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-5 text-[10px] animate-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                   <span className="text-slate-600 shrink-0 font-black">{alert.time}</span>
                   <span className="uppercase tracking-widest text-slate-400 italic">[{alert.type}] {alert.msg}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">
               Access Full Secure Logs
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NodeMonitorPage;
