
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, ShieldCheck, Clock, ChevronRight, TrendingUp, Users, Lock, Rocket } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ForClientsPage: React.FC<Props> = ({ onBack }) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
              For <span className="text-london-blue">Clients.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light max-w-2xl italic leading-relaxed">
              Deploy surgical intelligence instantly. No retainers, no friction, just results from the capital's elite.
            </p>
          </div>
        </motion.div>

        {/* Value Boxes */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: <Users className="text-london-blue" />, 
              title: "Curated Elite", 
              desc: "Every node in our registry is vetted for Tier-1 London market experience. Only the top 5% of advisors are admitted." 
            },
            { 
              icon: <Clock className="text-emerald-500" />, 
              title: "Fractional Scale", 
              desc: "Book by the hour. Access high-level strategy for exactly as long as you need it. No wasted capital." 
            },
            { 
              icon: <Lock className="text-amber-500" />, 
              title: "L3 Security", 
              desc: "Encrypted terminals with AES-256 protocols. Your strategic discussions remain sovereign and secure." 
            },
            { 
              icon: <Target className="text-purple-500" />, 
              title: "Neural Matching", 
              desc: "Our AI engine identifies the perfect advisor node for your specific vertical challenge in milliseconds." 
            },
            { 
              icon: <Zap className="text-blue-400" />, 
              title: "Instant Sync", 
              desc: "Start a session within minutes. Our real-time availability registry ensures zero delay in deployment." 
            },
            { 
              icon: <TrendingUp className="text-rose-500" />, 
              title: "Treasury Control", 
              desc: "Unified billing with HMRC-compliant VAT invoicing. Full visibility into your consultancy spend ledger." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              className="p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-6 group hover:border-london-blue/30 transition-all shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/40 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-light italic">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div variants={itemVariants} className="p-12 md:p-24 bg-slate-900 dark:bg-obsidian text-white rounded-[4rem] relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute inset-0 gold-grid opacity-[0.1] pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-10">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.8] hero-font">Initialize Your <br/> <span className="text-london-blue">Deployment.</span></h2>
            <p className="text-xl text-slate-400 font-light italic leading-relaxed">
              Join hundreds of London-based firms accessing fractional intelligence at City scale. Your first node handshake is ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onBack()}
                className="px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center gap-4 group"
              >
                Access Registry <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12">
            <Rocket size={400} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForClientsPage;
