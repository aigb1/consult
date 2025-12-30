
import React from 'react';
import { ChevronRight, Target, Lock, Activity, Zap } from 'lucide-react';

interface HowItWorksProps {
  onLearnMore: () => void;
}

const steps = [
  {
    num: "01",
    title: "Node Mapping",
    desc: "Filter by niche vertical, seniority, and real-time availability sync.",
    icon: <Target size={20} />
  },
  {
    num: "02",
    title: "Secure Auth",
    desc: "Initialize a deployment window protected by L3-AES escrow protocols.",
    icon: <Lock size={20} />
  },
  {
    num: "03",
    title: "Logic Sync",
    desc: "Join the secure feed and solve tactical hurdles with elite advisors.",
    icon: <Activity size={20} />
  }
];

const HowItWorks: React.FC<HowItWorksProps> = ({ onLearnMore }) => {
  return (
    <section className="py-32 bg-slate-50 dark:bg-[#050505] border-y border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 gold-grid opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-london-blue/10 border border-london-blue/20 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">
            <Zap size={14} className="animate-pulse" /> Deployment Protocol
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white hero-font leading-none">Three Steps <br/> <span className="text-slate-400">to Clarity.</span></h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden lg:block absolute top-[100px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-london-blue/20 to-transparent"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-[2.5rem] bg-white dark:bg-[#0D1117] text-slate-900 dark:text-white flex items-center justify-center text-2xl font-black mb-10 shadow-2xl border border-slate-100 dark:border-white/10 group-hover:scale-110 group-hover:border-london-blue/50 transition-all duration-700 relative overflow-hidden">
                <span className="relative z-10">{step.num}</span>
                <div className="absolute inset-0 bg-london-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-center gap-3 text-london-blue">
                    {step.icon}
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">{step.title}</h3>
                 </div>
                 <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs font-light italic">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-24">
          <button 
            onClick={onLearnMore}
            className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-3xl flex items-center gap-4 mx-auto group"
          >
            Review Governance Dossier <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
