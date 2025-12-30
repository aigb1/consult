
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, Zap, Globe, ShieldCheck, ChevronRight, PoundSterling, Activity, Cpu, Fingerprint } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ForAdvisorsPage: React.FC<Props> = ({ onBack }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h-full bg-white dark:bg-gpt-dark-bg transition-colors duration-500 px-6 py-12 md:py-24">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto space-y-24"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-8">
          <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-london-blue transition-all group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Exit Portal
          </button>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase hero-font leading-none text-slate-900 dark:text-white">
              For <span className="text-london-blue">Consultants.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl italic leading-relaxed">
              Monetize your strategic intelligence. We handle the protocol, you provide the precision.
            </p>
          </div>
        </motion.div>

        {/* Advisor Benefit Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
          {[
            { 
              icon: <PoundSterling className="text-london-blue" />, 
              title: "Yield Control", 
              desc: "Set your own hourly rate. Capital is secured via Stripe escrow before the node initializes. Instant global settlement." 
            },
            { 
              icon: <Activity className="text-emerald-500" />, 
              title: "Sovereign Schedule", 
              desc: "Total autonomy over your availability node. Toggle live status instantly or schedule mission windows in advance." 
            },
            { 
              icon: <ShieldCheck className="text-purple-500" />, 
              title: "Compliance Shield", 
              desc: "Automated IR35 determination and VAT processing. We act as your digital back-office so you can focus on advisory." 
            },
            { 
              icon: <Cpu className="text-amber-500" />, 
              title: "Unified Terminal", 
              desc: "Access our proprietary L3 video node with built-in adjudication tools, session recording, and logic briefings." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3.5rem] flex flex-col items-start gap-8 group hover:border-london-blue/30 transition-all shadow-xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-white dark:bg-black/40 flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none">{item.title}</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light italic">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Credential Section */}
        <motion.div variants={itemVariants} className="p-16 bg-[#0A0B0E] rounded-[4rem] flex flex-col md:flex-row items-center gap-16 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 gold-grid opacity-[0.05]" />
          <div className="w-32 h-32 rounded-[40px] bg-london-blue/5 border-2 border-london-blue/20 flex items-center justify-center shrink-0 shadow-2xl relative z-10">
            <Fingerprint size={64} className="text-london-blue animate-pulse" />
          </div>
          <div className="space-y-6 relative z-10">
            <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-tight hero-font">Elite Network Standing.</h3>
            <p className="text-slate-400 text-lg font-light italic leading-relaxed max-w-2xl">
              Applicants undergo a multi-node verification process. Our registry includes former leads from Tier-1 banks, tech unicorns, and sovereign wealth nodes.
            </p>
            <button 
              onClick={() => onBack()}
              className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center gap-4 group"
            >
              Initialize Application <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Global Reach Footer */}
        <motion.div variants={itemVariants} className="text-center space-y-8 py-12">
          <div className="flex justify-center gap-16 text-slate-400">
             <div className="flex items-center gap-3">
               <Globe size={20} className="text-london-blue" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global Node Sync</span>
             </div>
             <div className="flex items-center gap-3">
               <ShieldCheck size={20} className="text-london-blue" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">AES-256 Escrow</span>
             </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-600 opacity-40">MMXXVI Registry Protocol Advisory Node</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForAdvisorsPage;
