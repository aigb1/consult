
import React from 'react';
import { ArrowLeft, Shield, Video, Target, Zap, ChevronRight } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const HowItWorksPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-full bg-gpt-light-bg dark:bg-gpt-dark-bg transition-colors duration-300 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-20 pb-24">
        
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="w-16 h-16 rounded-3xl bg-london-blue/10 text-london-blue flex items-center justify-center border border-london-blue/20 shadow-xl">
              <Zap size={32} />
           </div>
           <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight italic uppercase hero-font dark:text-white leading-[0.9]">Registry <span className="text-london-blue">Protocol.</span></h1>
              <p className="text-xl text-slate-500 font-light max-w-2xl italic leading-relaxed">Direct access to high-fidelity intelligence, stripped of legacy friction.</p>
           </div>
        </div>

        <div className="space-y-12">
           {[
             { 
               num: "01", 
               title: "Node Discovery", 
               desc: "Identify elite fractional consultants through our neural vertical mapping engine.",
               icon: <Target className="text-london-blue" />
             },
             { 
               num: "02", 
               title: "Secure Authorization", 
               desc: "Initialize a deployment window protected by L3-AES sovereign encryption.",
               icon: <Shield className="text-london-blue" />
             },
             { 
               num: "03", 
               title: "Operational Sync", 
               desc: "Engage via our high-fidelity video terminal with integrated document adjudication.",
               icon: <Video className="text-london-blue" />
             }
           ].map((step, i) => (
             <div key={i} className="flex gap-8 group p-10 bg-slate-50 dark:bg-white/5 rounded-4xl border border-slate-100 dark:border-white/5 transition-all hover:border-london-blue/40">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gpt-dark-bg border border-slate-200 dark:border-[#3d3d3d] flex items-center justify-center text-lg font-black italic shadow-inner shrink-0 group-hover:scale-110 transition-transform">{step.num}</div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      {step.icon}
                      <h3 className="text-2xl font-bold italic uppercase tracking-tighter dark:text-white">{step.title}</h3>
                   </div>
                   <p className="text-lg text-slate-500 font-light leading-relaxed italic">{step.desc}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="pt-20 border-t border-slate-100 dark:border-[#3d3d3d] text-center">
            <button 
              onClick={onBack}
              className="px-12 py-5 bg-london-blue text-white rounded-gpt font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:brightness-110 transition-all flex items-center gap-4 mx-auto group"
            >
              Access Registry <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
