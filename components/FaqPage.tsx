
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageSquare, Plus, Minus, ChevronRight, Zap } from 'lucide-react';

const FaqPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "How are consultants verified?", a: "Every expert undergoes a multi-stage review including professional credential verification, identity screening, and a peer-led technical evaluation session. We only accept the top 5% of applicants based on City-scale performance metrics." },
    { q: "Can I record my session?", a: "Sessions are recorded by default using L3-AES encryption for regulatory and arbitration compliance. Executives can access recordings in their Terminal dashboard for up to 30 operational days." },
    { q: "What happens if a node misses a slot?", a: "The protocol automatically triggers a 100% capital reallocation via Stripe escrow. The consultant's network standing is adjusted to reflect the missed handshake instantly." },
    { q: "Is the platform mobile-optimized?", a: "Yes. Our secure video terminal is engineered to operate on any modern mobile node with full document review and biometric auth capabilities." },
    { q: "How does the pricing protocol work?", a: "Experts set their own node rates based on vertical demand. The platform adds a flat 10% protocol fee covering escrow, encryption, and unified communications." }
  ];

  return (
    <div className="min-h-screen pt-12 md:pt-24 pb-48 px-6 bg-white dark:bg-gpt-dark-bg transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-20"
      >
        <button 
          onClick={onBack} 
          className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Terminal
        </button>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none text-slate-900 dark:text-white uppercase hero-font"
          >
            Registry <span className="brand-gradient-text">FAQ.</span>
          </motion.h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">
            Infrastructure logic and engagement protocols.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`border-b border-slate-100 dark:border-white/5 transition-all duration-500 ${open === i ? 'pb-8' : 'pb-0'}`}
            >
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full py-10 flex justify-between items-center text-left hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group"
              >
                <span className={`text-2xl font-black italic tracking-tighter uppercase transition-all duration-500 ${open === i ? 'text-london-blue' : 'text-slate-800 dark:text-white'}`}>
                  {f.q}
                </span>
                <div className={`w-12 h-12 rounded-2xl border transition-all duration-500 flex items-center justify-center shrink-0 shadow-sm ${open === i ? 'bg-london-blue border-london-blue text-white shadow-blue-500/20 rotate-180' : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-400 group-hover:border-slate-900 dark:group-hover:border-white'}`}>
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-light italic leading-relaxed max-w-3xl pb-6">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-12 md:p-20 bg-slate-900 dark:bg-obsidian rounded-[4rem] text-white space-y-10 relative overflow-hidden shadow-premium border border-white/5"
        >
           <div className="absolute inset-0 gold-grid opacity-[0.05] pointer-events-none" />
           <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">
                 <Zap size={14} className="animate-pulse" /> Support Node Active
              </div>
              <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none hero-font">Logic Check Required?</h3>
              <p className="text-xl text-slate-400 font-light italic max-w-xl">Our adjudicators are available 24/7 for Registry status checks and deployment synchronization.</p>
           </div>
           <button className="px-14 py-6 bg-white text-black rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-3xl flex items-center gap-4 relative z-10 group">
              Open Logic Channel <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
           </button>
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
              <MessageSquare size={320} />
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FaqPage;
