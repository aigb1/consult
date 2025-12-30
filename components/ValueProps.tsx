
import React from 'react';
import { Globe, Clock, ShieldCheck, PoundSterling, Zap } from 'lucide-react';

const props = [
  {
    icon: <Globe size={24} className="text-london-blue" />,
    title: "Hyper-Local Knowledge",
    desc: "Every consultant node is vetted for UK regulatory mastery and specific London market friction points."
  },
  {
    icon: <Clock size={24} className="text-london-blue" />,
    title: "Zero Commitment",
    desc: "Skip protracted retainers. Deploy 30 or 60-minute fractional intelligence windows instantly."
  },
  {
    icon: <ShieldCheck size={24} className="text-london-blue" />,
    title: "Secure Terminal Suite",
    desc: "End-to-end L3-AES encrypted video channels with integrated multi-node document adjudication."
  },
  {
    icon: <PoundSterling size={24} className="text-london-blue" />,
    title: "Transparent Yield",
    desc: "Surgical price clarity. Pay for direct intelligence, stripped of legacy agency markups."
  }
];

const ValueProps: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#020203] relative transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-100 dark:border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Zap size={14} className="text-london-blue animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-london-blue">Operational Advantage</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white hero-font">High-Fidelity <br/> <span className="text-slate-400">Handshakes.</span></h2>
          </div>
          <p className="text-slate-500 dark:text-slate-500 max-w-sm text-sm font-light italic leading-relaxed">
            Engineered to remove the friction between complex strategic problems and the minds capable of solving them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((p, i) => (
            <div key={i} className="flex flex-col p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2.5rem] group hover:border-london-blue/30 transition-all shadow-sm">
              <div className="mb-10 p-5 bg-white dark:bg-black/40 w-fit rounded-2xl shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {p.icon}
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-4 text-slate-900 dark:text-white uppercase leading-none">{p.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light italic">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
