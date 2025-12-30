
import React from 'react';
import { 
  Twitter, 
  Linkedin, 
  Globe, 
  Shield, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  MapPin,
  ExternalLink,
  Lock,
  Cpu,
  Fingerprint,
  ArrowRight
} from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onFilterNavigate?: (filter: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterNavigate }) => {
  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-white/[0.05] relative overflow-hidden transition-colors duration-500">
      {/* Visual System Texture */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-london-blue to-transparent opacity-20" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-32 pb-16 relative z-10">
        
        {/* Top Tier: System Identity & CTA */}
        <div className="grid lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-5 space-y-10">
            <div 
              className="flex flex-col cursor-pointer group w-fit" 
              onClick={() => onNavigate(ViewState.BROWSE)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-london-blue text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                   <Zap size={24} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none hero-font">
                  Consultancy<span className="text-london-blue">.london</span>
                </h2>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mt-2">
                Elite Intelligence Registry / London Mainnet
              </p>
            </div>
            
            <p className="max-w-md text-xl font-light leading-relaxed text-slate-500 dark:text-slate-400 italic border-l-2 border-london-blue pl-10 py-2">
              "Deploying surgical access to London's highest-tier fractional intelligence nodes. Engineered for absolute execution."
            </p>

            <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-london-blue" />
                <span>The City Node</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10" />
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-london-blue" />
                <span>Global Sync Enabled</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 group shadow-sm hover:border-london-blue/30 transition-all duration-700">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-london-blue/10 rounded-full border border-london-blue/20">
                   <Cpu size={14} className="text-london-blue animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-[0.3em] text-london-blue">Registry Expansion</span>
                </div>
                <p className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none hero-font">Join the <br/> Network.</p>
                <p className="text-sm text-slate-500 font-medium italic">Apply as a vetted expert node for City-scale fractional mandates.</p>
              </div>
              <button 
                onClick={() => onNavigate(ViewState.FOR_CONSULTANTS)}
                className="bg-slate-900 dark:bg-white text-white dark:text-black px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-london-blue hover:text-white transition-all shadow-3xl flex items-center gap-4 group"
              >
                Apply to Registry <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Horizontal Site Index */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-32 border-t border-slate-100 dark:border-white/5 pt-20">
          <div className="space-y-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-london-blue" /> Nodes
            </h5>
            <ul className="space-y-6">
              {[
                { label: 'Full Registry Index', view: ViewState.BROWSE, filter: 'All' },
                { label: 'Finance & Fintech', view: ViewState.BROWSE, filter: 'Finance & Fintech' },
                { label: 'AI Transformation', view: ViewState.BROWSE, filter: 'AI & Digital Transformation' },
                { label: 'Cyber & Security', view: ViewState.BROWSE, filter: 'Cyber & Security' }
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => onFilterNavigate ? onFilterNavigate(link.filter) : onNavigate(link.view)}
                    className="text-xs font-bold italic text-slate-500 hover:text-london-blue transition-colors flex items-center gap-2 group text-left"
                  >
                    {link.label} <ArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-london-blue" /> Protocol
            </h5>
            <ul className="space-y-6">
              {[
                { label: 'AI Neural Matching', view: ViewState.AI_MATCH },
                { label: 'Security Stack', view: ViewState.SECURITY },
                { label: 'Pricing Protocol', view: ViewState.PRICING },
                { label: 'System FAQ', view: ViewState.FAQ }
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigate(link.view)}
                    className="text-xs font-bold italic text-slate-500 hover:text-london-blue transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-london-blue" /> Governance
            </h5>
            <ul className="space-y-6">
              {[
                { label: 'Compliance Index', view: ViewState.COMPLIANCE_INDEX },
                { label: 'Privacy Standards', view: ViewState.PRIVACY },
                { label: 'Arbitration Flow', view: ViewState.ARBITRATION },
                { label: 'HMRC Verification', view: ViewState.HMRC }
              ].map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => onNavigate(link.view)}
                    className="text-xs font-bold italic text-slate-500 hover:text-london-blue transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-900 dark:text-white flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-london-blue" /> Social
            </h5>
            <div className="flex gap-6">
              {[Twitter, Linkedin, Globe].map((Icon, i) => (
                <a key={i} href="#" onClick={handleSocialClick} className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-london-blue transition-all border border-slate-100 dark:border-white/5 hover:border-london-blue/40 shadow-sm">
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="pt-4 space-y-4">
               <button onClick={() => onNavigate(ViewState.AUDIT_LOG)} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-london-blue transition-colors flex items-center gap-3">
                  <Lock size={12} /> System Audit Log
               </button>
               <button onClick={() => onNavigate(ViewState.NODE_MONITOR)} className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-london-blue transition-colors flex items-center gap-3">
                  <ShieldCheck size={12} /> Network Monitor
               </button>
            </div>
          </div>

          {/* Infrastructure Health Widget */}
          <div className="col-span-2 lg:col-span-1">
            <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] space-y-8 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">OPS_ACTIVE</span>
                <ShieldCheck size={16} className="text-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                  <span>Mainnet Sync</span>
                  <span className="text-slate-900 dark:text-white">99.98%</span>
                </div>
                <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-london-blue w-[99.98%] shadow-[0_0_8px_#0052FF]" />
                </div>
              </div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed italic">
                L3-AES Protocol MMXXVI. <br/> All handshakes UTC+0 synced.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Footnotes */}
        <div className="pt-16 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 shadow-lg">
              <Zap size={16} strokeWidth={3} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              © MMXXVI Registry Protocol LDN
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            <div onClick={() => onNavigate(ViewState.HMRC)} className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-london-blue cursor-pointer transition-colors">
              <Shield size={14} className="text-amber-500" />
              HMRC Registered Node
            </div>
            <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              <Fingerprint size={14} className="text-london-blue" />
              Stripe Escrow Verified
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
