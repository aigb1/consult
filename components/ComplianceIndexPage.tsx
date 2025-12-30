
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Landmark, FileText, CheckCircle, Scale, ShieldAlert, Lock, Zap } from 'lucide-react';

const ComplianceIndexPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
    <div className="min-h-screen py-12 md:py-24 px-6 bg-white dark:bg-gpt-dark-bg transition-colors duration-500">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-20"
      >
        <motion.div variants={item}>
          <button onClick={onBack} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Terminal
          </button>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white hero-font leading-none">
            Compliance <br/> <span className="brand-gradient-text">Index.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light italic leading-relaxed max-w-2xl">
            Systemic adherence to UK regulatory frameworks and elite professional indemnity standards.
          </p>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          {[
            { 
              icon: <Landmark size={28} />, 
              title: "FCA Protocol Alignment", 
              desc: "Financial consultants are vetted for compliance with FCA standards for high-fidelity fractional consultancy engagements.",
              tag: "AUTH_LDN_42"
            },
            { 
              icon: <ShieldCheck size={28} />, 
              title: "GDPR L3 Integrity", 
              desc: "Data processing is strictly restricted to Tier-3 secure nodes with zero-knowledge storage and automated 7-day scrubbing.",
              tag: "DATA_SOVEREIGN"
            },
            { 
              icon: <Scale size={28} />, 
              title: "Professional Indemnity", 
              desc: "The Registry maintains a £5M master professional indemnity policy covering all authorized mission handshake engagements.",
              tag: "INSURE_NODE_X"
            },
            { 
              icon: <FileText size={28} />, 
              title: "IR35 Determination", 
              desc: "Proprietary determination engine ensures all fractional engagements are verified for IR35 compliance at the point of sync.",
              tag: "HMRC_VERIFIED"
            }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              variants={item}
              whileHover={{ scale: 1.01, x: 5 }}
              className="p-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[4rem] group flex flex-col md:flex-row gap-12 items-center md:items-start shadow-sm transition-all"
            >
              <div className="p-8 rounded-3xl bg-london-blue/10 text-london-blue group-hover:bg-london-blue group-hover:text-white transition-all shadow-inner shrink-0 group-hover:scale-110 duration-500">
                {card.icon}
              </div>
              <div className="space-y-4 text-center md:text-left flex-1">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none">{card.title}</h3>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-london-blue bg-london-blue/5 px-4 py-1.5 rounded-full border border-london-blue/10">{card.tag}</span>
                 </div>
                 <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={item}
          className="p-16 border-2 border-dashed border-slate-100 dark:border-white/10 rounded-[5rem] text-center space-y-8 relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-london-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10 flex flex-col items-center gap-6">
              <ShieldAlert className="text-slate-300 dark:text-slate-700 animate-pulse" size={48} />
              <div className="space-y-3">
                 <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-400">Governance Oversight</p>
                 <p className="text-lg text-slate-500 dark:text-slate-400 font-light italic max-w-lg mx-auto leading-relaxed">
                   Registry monitoring and third-party logic audits are performed quarterly to maintain military-grade integrity.
                 </p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-[0.4em] text-london-blue hover:underline underline-offset-8 transition-all">
                Download Latest Audit Findings
              </button>
           </div>
        </motion.div>

        <motion.div variants={item} className="text-center pt-12">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 opacity-40">Consultancy.london Compliance Stack LDN_V42</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComplianceIndexPage;
