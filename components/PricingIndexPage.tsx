
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PoundSterling, 
  Check, 
  ArrowLeft, 
  Info, 
  CircleDollarSign, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  PieChart
} from 'lucide-react';

const PricingIndexPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-12 md:pt-24 pb-48 px-6 md:px-12 bg-white dark:bg-gpt-dark-bg transition-colors duration-500">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1400px] mx-auto space-y-24"
      >
        <motion.div variants={item} className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Terminal
          </button>
        </motion.div>

        <motion.div variants={item} className="max-w-4xl space-y-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] hero-font italic text-slate-900 dark:text-white uppercase">
            Marketplace <br/>
            <span className="brand-gradient-text">Economics.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light max-w-2xl leading-relaxed italic">
            Dismantling the traditional consultancy billing node. Transparent, expert-led pricing protocols.
          </p>
        </motion.div>

        <motion.div variants={item} className="grid lg:grid-cols-2 gap-8">
          {/* Legacy Card */}
          <div className="p-12 md:p-16 bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] border border-slate-100 dark:border-white/5 space-y-12 shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legacy Node Model</span>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Institutional Friction</h3>
            </div>
            
            <div className="space-y-8">
              {[
                { label: "Opaque Margins", desc: "Agency markups often exceed 50% of the actual consultant rate." },
                { label: "Rigid Retainers", desc: "Forced long-term commitments regardless of tactical project outcome." },
                { label: "Administrative Drag", desc: "Complex sales cycles and protracted legal handshake protocols." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start opacity-40 grayscale group hover:grayscale-0 transition-all">
                  <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-px bg-slate-300 dark:bg-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-xl italic uppercase text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-slate-500 font-light italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol Card */}
          <div className="p-12 md:p-16 bg-white dark:bg-[#0D1117] rounded-[4rem] border-2 border-london-blue shadow-premium space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Zap size={300} />
            </div>
            
            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-london-blue">Registry Standard</span>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Surgical Yield</h3>
            </div>

            <div className="space-y-8 relative z-10">
              {[
                { label: "Direct-to-Expert Value", desc: "Experts set their own rates. Pay for intelligence, not high-rise rent." },
                { label: "Fractional Scale", desc: "Book 15, 30 or 60-minute sessions. Agile deployment scaling." },
                { label: "Unified Handshake", desc: "Single secure protocol for booking, briefing, and encrypted sync." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-london-blue flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-blue-500/20">
                    <Check size={16} className="text-white" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-xl italic uppercase text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fee Architecture */}
        <motion.div variants={item} className="bg-slate-900 dark:bg-obsidian rounded-[5rem] p-16 md:p-24 text-white relative overflow-hidden shadow-premium border border-white/5">
          <div className="absolute inset-0 gold-grid opacity-[0.05] pointer-events-none" />
          <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">
                <PieChart size={16} /> Fee Architecture Protocol
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none hero-font">
                Absolute <br/> <span className="text-slate-500">Transparency.</span>
              </h2>
              <p className="text-xl text-slate-400 font-light italic leading-relaxed">
                Platform economics operating on a unified commission sync. No hidden nodes.
              </p>
              
              <div className="space-y-6 pt-6">
                 {[
                   { label: "Expert Node Rate", val: "Set by Registry Node", sub: "100% Direct to Consultant" },
                   { label: "Platform Protocol", val: "10% Platform Fixed", sub: "Security & Escrow Management" },
                   { label: "Treasury VAT", val: "Calculated at Source", sub: "HMRC Compliant Sync" }
                 ].map((row, i) => (
                   <div key={i} className="flex flex-col gap-1 border-b border-white/10 pb-6 last:border-none">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{row.label}</span>
                        <span className="text-xl font-black italic text-white">{row.val}</span>
                      </div>
                      <span className="text-[10px] font-medium italic text-london-blue">{row.sub}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] p-12 text-slate-900 space-y-12 shadow-3xl">
               <div className="space-y-3">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Mission Authorization Example</p>
                 <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Sample Session.</h4>
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                    <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors italic">Advisory Node (A. Sterling)</span>
                    <span className="font-black text-xl tabular-nums">£250.00</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors italic">Protocol Service Fee</span>
                    <span className="font-black text-xl tabular-nums">£25.00</span>
                  </div>
                  <div className="pt-8 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-london-blue">Total Deployment</p>
                       <h4 className="text-6xl font-black italic tracking-tighter leading-none hero-font">£275.00</h4>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-london-blue text-white flex items-center justify-center shadow-lg">
                       <ShieldCheck size={24} />
                    </div>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 rounded-3xl flex items-center gap-6 border border-slate-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 italic">End-to-End Escrow Protection ACTIVE</p>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Globe size={28} />, title: "City-Wide Access", desc: "Registry includes Tier-1 consultants from major banks and sovereign nodes." },
            { icon: <ShieldCheck size={28} />, title: "Sovereign Escrow", desc: "Capital is only cleared for payout once the mission node is verified successful." },
            { icon: <CircleDollarSign size={28} />, title: "Instant Ledger", desc: "Download HMRC-compliant documentation directly from your Terminal." }
          ].map((card, i) => (
            <div key={i} className="p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3rem] text-center space-y-6 group hover:border-london-blue/30 transition-all shadow-sm">
              <div className="w-16 h-16 bg-white dark:bg-black/40 rounded-2xl flex items-center justify-center mx-auto text-london-blue shadow-inner group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="space-y-3">
                 <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{card.title}</h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light italic">{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="text-center space-y-12 pb-32">
          <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.9]">Initialize your first <br/> <span className="brand-gradient-text">expert node.</span></h2>
          <button 
            onClick={onBack}
            className="px-20 py-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-3xl flex items-center justify-center gap-6 mx-auto group"
          >
            Access Registry <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingIndexPage;
