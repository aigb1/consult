
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, Terminal, Database, Activity, ShieldCheck, Lock } from 'lucide-react';

const AuditLogPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const logs = [
    { id: "LOG_0943", action: "EXPERT_NODE_SYNC", borough: "Westminster", status: "SUCCESS", timestamp: "2024-05-22 22:50:01" },
    { id: "LOG_0942", action: "SECURITY_PATCH_L3", borough: "Network-Wide", status: "SUCCESS", timestamp: "2024-05-22 21:12:44" },
    { id: "LOG_0941", action: "NEW_HMRC_TEMPLATE", borough: "Governance", status: "ACTIVE", timestamp: "2024-05-22 20:05:12" },
    { id: "LOG_0940", action: "NODE_ADJUDICATION", borough: "Hackney", status: "COMPLETE", timestamp: "2024-05-22 19:44:33" },
    { id: "LOG_0939", action: "API_REGEN_AUTH", borough: "Admin Hub", status: "SUCCESS", timestamp: "2024-05-22 18:20:09" },
    { id: "LOG_0938", action: "L3_ENCRYPT_ROTATE", borough: "Mayfair Node", status: "OPTIMIZED", timestamp: "2024-05-22 17:55:20" },
    { id: "LOG_0937", action: "FCA_INDEX_UPDATE", borough: "Compliance", status: "SUCCESS", timestamp: "2024-05-22 16:10:45" },
  ];

  return (
    <div className="min-h-screen py-12 md:py-24 px-6 bg-slate-50 dark:bg-gpt-dark-bg transition-colors duration-500 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-20"
      >
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Terminal Home
          </button>
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white hero-font leading-none"
          >
            Audit <span className="brand-gradient-text">Log.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic max-w-2xl leading-relaxed">
            System-level diagnostic archive. Comprehensive record of protocol deployments and node synchronization.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           {[
             { label: "Total Operations", val: "14,204", icon: <Database size={14} /> },
             { label: "Active Handshakes", val: "542", icon: <Activity size={14} /> },
             { label: "Uptime Protocol", val: "99.99%", icon: <ShieldCheck size={14} /> },
             { label: "System Load", val: "12%", icon: <Lock size={14} /> },
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="p-6 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl space-y-2 shadow-sm"
             >
                <div className="text-london-blue opacity-40">{stat.icon}</div>
                <div>
                   <p className="text-xl font-black italic text-slate-900 dark:text-white tabular-nums">{stat.val}</p>
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="space-y-3">
          {logs.map((log, i) => (
            <motion.div 
              key={log.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.005, x: 5 }}
              className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-[10px] bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2rem] shadow-sm hover:border-london-blue/30 transition-all cursor-crosshair group"
            >
              <div className="flex items-center gap-8">
                <span className="text-london-blue font-black tracking-widest group-hover:scale-110 transition-transform">{log.id}</span>
                <div className="space-y-1">
                   <span className="text-slate-900 dark:text-white font-black uppercase tracking-widest block">{log.action}</span>
                   <span className="text-slate-400 italic lowercase tracking-wider opacity-60">@{log.borough}</span>
                </div>
              </div>
              <div className="flex items-center gap-12 self-end md:self-auto">
                 <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'SUCCESS' || log.status === 'COMPLETE' || log.status === 'OPTIMIZED' ? 'bg-emerald-500' : 'bg-london-blue'} animate-pulse`} />
                    <span className={`${log.status === 'SUCCESS' || log.status === 'COMPLETE' || log.status === 'OPTIMIZED' ? 'text-emerald-500' : 'text-london-blue'} font-black tracking-widest`}>{log.status}</span>
                 </div>
                 <span className="text-slate-400 opacity-40 font-mono italic tracking-tighter">{log.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-8 pt-12 pb-24"
        >
           <button className="flex items-center gap-4 px-10 py-5 bg-slate-100 dark:bg-white/5 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 transition-all group shadow-xl">
             <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Fetch Operations Cycle 02
           </button>
           <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 opacity-20">
             Consultancy.london System Terminal V4.2.1-STABLE
           </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuditLogPage;
