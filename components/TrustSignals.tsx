
import React from 'react';
import { Quote, ShieldCheck, CheckCircle2, Verified, Fingerprint, Zap } from 'lucide-react';

const TrustSignals: React.FC = () => {
  return (
    <section className="py-32 bg-white dark:bg-[#020203] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] p-12 md:p-24 relative overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="absolute top-10 right-10 text-slate-200 dark:text-white/5 pointer-events-none">
            <Quote size={200} />
          </div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <div key={s} className="w-3 h-3 rounded-full bg-london-blue shadow-[0_0_10px_#0052FF]" />
              ))}
              <span className="ml-4 text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Registry Sync: L5_RATING</span>
            </div>
            
            <p className="text-3xl md:text-5xl font-black tracking-tighter text-slate-800 dark:text-white leading-[0.95] italic hero-font">
              "Registry.LND allowed us to initialize a surgical 30-minute node audit that saved our startup from protocol failure. We didn't need a firm; we just needed one elite mind."
            </p>
            
            <div className="flex items-center gap-6 border-t border-slate-200 dark:border-white/10 pt-12">
              <div className="w-16 h-16 rounded-2xl bg-london-blue/10 flex items-center justify-center text-london-blue shadow-inner border border-london-blue/20">
                 <Fingerprint size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900 dark:text-white uppercase italic tracking-tighter">Director @ Stealth Labs</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <Verified size={12} className="text-london-blue fill-current" /> Verified Client Handshake
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
               <ShieldCheck size={24} />
            </div>
            <div className="space-y-1">
               <span className="font-black text-[10px] tracking-[0.4em] uppercase text-slate-900 dark:text-white">Elite Vetting Node</span>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Only top 5% advisors accepted</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-london-blue/5 border border-london-blue/20 flex items-center justify-center text-london-blue group-hover:scale-110 transition-transform">
               <Zap size={24} />
            </div>
            <div className="space-y-1">
               <span className="font-black text-[10px] tracking-[0.4em] uppercase text-slate-900 dark:text-white">Tier-1 Settlement</span>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Stripe Escrow protocol</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
               <CheckCircle2 size={24} />
            </div>
            <div className="space-y-1">
               <span className="font-black text-[10px] tracking-[0.4em] uppercase text-slate-900 dark:text-white">HMRC Compliant</span>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Automated VAT logic synchronization</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
