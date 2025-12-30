
import React from 'react';
import { Shield, Lock, EyeOff, Terminal, ArrowLeft, Zap, Fingerprint, Globe } from 'lucide-react';

const SecurityStackPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-full bg-gpt-light-bg dark:bg-gpt-dark-bg px-6 py-12 transition-colors duration-300">
    <div className="max-w-4xl mx-auto space-y-16 pb-24 animate-in fade-in duration-700">
      
      <div className="space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-london-blue/10 text-london-blue flex items-center justify-center border border-london-blue/20 shadow-xl">
           <Shield size={32} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight italic uppercase hero-font dark:text-white leading-none">Security <span className="text-london-blue">Stack.</span></h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed italic">End-to-end encrypted infrastructure engineered for absolute operational integrity.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { icon: <Lock />, title: "L3-AES Protocol", desc: "Military-grade 256-bit encryption protecting all registry streams and data packets." },
          { icon: <Fingerprint />, title: "Biometric Handshake", desc: "Expert node access requires multi-factor biometric identity confirmation." },
          { icon: <Terminal />, title: "Node Isolation", desc: "Sessions are sandboxed in isolated virtual environments to eliminate data leakage." },
          { icon: <Globe />, title: "Sovereign Nodes", desc: "Data residency strictly governed by UK professional standards and GDPR L3." }
        ].map((item, i) => (
          <div key={i} className="p-10 space-y-6 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-4xl hover:border-london-blue/30 transition-all group">
            <div className="text-london-blue group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-xl font-bold italic uppercase tracking-tighter dark:text-white">{item.title}</h3>
            <p className="text-base text-slate-500 leading-relaxed font-light italic">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-10 bg-[#0A0B0E] rounded-4xl flex items-center gap-10 border border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute inset-0 mesh-bg opacity-10" />
         <Zap size={64} className="text-london-blue shrink-0 animate-pulse relative z-10" />
         <div className="space-y-3 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-london-blue">Platform Status: SECURE</p>
            <p className="text-lg text-slate-400 font-light italic leading-relaxed">
               Registry infrastructure is monitored 24/7 by independent security adjudicators.
            </p>
         </div>
      </div>
    </div>
  </div>
);

export default SecurityStackPage;
