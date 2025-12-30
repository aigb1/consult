
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { 
  Zap, 
  Lock, 
  Globe, 
  ChevronRight, 
  Mail, 
  Chrome, 
  Smartphone, 
  Loader2, 
  User, 
  Briefcase,
  ShieldCheck,
  Fingerprint,
  Terminal,
  Activity,
  ArrowRight,
  Shield,
  CircleCheck,
  Cpu,
  Star,
  Compass
} from 'lucide-react';

interface Props {
  onLogin: (role: UserRole) => void;
}

type AuthMode = 'login' | 'signup';
type AuthStep = 'entry' | 'role-selection' | 'verifying';
type EntryModality = 'email' | 'phone';

const SplitAuthView: React.FC<Props> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<AuthStep>('entry');
  const [modality, setModality] = useState<EntryModality>('email');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      title: "The Sovereign Registry.",
      subtitle: "Deploy elite London minds via encrypted fractional nodes. Direct access to the top 1% of City intelligence.",
      stat: "542+ Nodes Online"
    },
    {
      title: "Surgical Execution.",
      subtitle: "Skip protracted retainers. Pay for direct intelligence in 30-minute high-fidelity windows.",
      stat: "99.9% Logic Uptime"
    },
    {
      title: "City Wide Access.",
      subtitle: "Vetted experts from Tier-1 banks, tech unicorns, and sovereign wealth funds. Handshake ready.",
      stat: "Top 5% Vetted"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('role-selection');
    }, 1200);
  };

  const handleRoleSelection = (role: UserRole) => {
    setIsLoading(true);
    setStep('verifying');
    setTimeout(() => {
      onLogin(role);
    }, 2200);
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-[#050505] text-white overflow-hidden font-sans">
      {/* LEFT SIDE: Cinematic Visual Carousel (Minimalist text focus) */}
      <div className="lg:w-[58%] relative overflow-hidden hidden lg:flex flex-col border-r border-white/5 bg-[#050505]">
        <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
        
        {carouselItems.map((item, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-[1.5s] ease-in-out transform ${
              idx === carouselIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 translate-x-10'
            }`}
          >
            <div className="absolute inset-x-0 bottom-0 p-16 z-20 space-y-8">
              <div className="space-y-4 max-w-2xl animate-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-london-blue/20 backdrop-blur-xl border border-london-blue/30 rounded-full">
                  <Activity size={14} className="text-london-blue animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">{item.stat}</span>
                </div>
                <h2 className="text-6xl xl:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] hero-font">
                  {item.title.split('.').map((part, i) => (
                    <span key={i} className={i === 0 ? 'text-white' : 'text-white/30'}>{part}{i === 0 && '.'}</span>
                  ))}
                </h2>
                <p className="text-lg text-slate-100 font-light italic leading-relaxed opacity-80 max-w-lg">
                  {item.subtitle}
                </p>
              </div>
              
              <div className="flex items-center gap-10 border-t border-white/10 pt-8">
                 <div className="flex flex-col gap-1.5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">System Node</p>
                    <p className="text-[10px] font-mono font-bold tracking-widest text-slate-300">MAINNET_ALPHA_STABLE</p>
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Handshake Secure</p>
                    <p className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-2 uppercase">
                       <ShieldCheck size={12} /> AES-256 Verified
                    </p>
                 </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Top Brand Identity */}
        <div className="absolute top-10 left-12 z-30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-105">
            <Zap size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-black italic tracking-tighter hero-font">
              <span className="text-white">consultancy</span>
              <span className="text-london-blue">.london</span>
            </span>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-london-blue">Sovereign Intelligence</span>
          </div>
        </div>

        {/* Dynamic Carousel Indicators */}
        <div className="absolute bottom-10 right-12 z-30 flex gap-2">
           {carouselItems.map((_, idx) => (
             <div 
               key={idx} 
               onClick={() => setCarouselIndex(idx)}
               className={`h-1 cursor-pointer transition-all duration-700 rounded-full ${idx === carouselIndex ? 'w-12 bg-white' : 'w-3 bg-white/10 hover:bg-white/30'}`} 
             />
           ))}
        </div>
      </div>

      {/* RIGHT SIDE: Obsidian Auth Terminal */}
      <div className="lg:w-[42%] flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative bg-[#050505]">
        <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
        
        <div className="w-full max-w-[400px] space-y-8 md:space-y-10 relative z-10">
          {/* Header Branding */}
          <div className="text-center space-y-4">
             <div className="lg:hidden flex justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-london-blue text-white flex items-center justify-center shadow-2xl">
                   <Zap size={28} fill="currentColor" />
                </div>
             </div>
             
             <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none hero-font animate-in fade-in slide-in-from-bottom-2 duration-700">
                  {step === 'entry' ? (mode === 'login' ? 'Initialize' : 'Register') : step === 'role-selection' ? 'Select Node' : 'Verifying'}
                  <br/>
                  <span className="text-london-blue">
                    {step === 'entry' ? 'Identity.' : step === 'role-selection' ? 'Protocol.' : 'Auth Sync.'}
                  </span>
                </h1>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">Sovereign Intelligence Gateway</p>
             </div>
          </div>

          {/* Luxury Auth Card */}
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5 animate-in zoom-in-95 duration-1000">
             {step === 'entry' && (
               <div className="space-y-6 animate-in fade-in duration-500">
                 <form onSubmit={handleEntry} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end px-2">
                        <label className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">
                          {modality === 'email' ? 'Executive ID / Email' : 'Mobile Protocol'}
                        </label>
                        <button 
                          type="button"
                          onClick={() => { setModality(modality === 'email' ? 'phone' : 'email'); setInputValue(''); }}
                          className="text-[8px] font-black uppercase tracking-widest text-london-blue hover:text-white transition-colors"
                        >
                          Switch Mode
                        </button>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-london-blue transition-colors">
                          {modality === 'email' ? <Mail size={18} /> : <Smartphone size={18} />}
                        </div>
                        <input 
                          type={modality === 'email' ? 'email' : 'tel'} 
                          required
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={modality === 'email' ? 'name@firm.com' : '+44'}
                          className="w-full h-14 bg-white/[0.01] border-2 border-white/5 rounded-[1.5rem] pl-14 pr-6 font-black italic text-base outline-none focus:border-london-blue focus:bg-white/[0.04] transition-all placeholder:text-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading || !inputValue}
                      className="w-full h-14 bg-white text-black rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-london-blue hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-20 group overflow-hidden relative"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : (mode === 'login' ? 'Authorize Handshake' : 'Request Registry Access')}
                        {!isLoading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </button>
                 </form>

                 <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                    <span className="relative px-4 bg-[#050505] text-[7px] font-black text-slate-600 uppercase tracking-widest">Single Sign-On</span>
                 </div>

                 <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/10 rounded-[1.25rem] hover:bg-white/10 transition-all group">
                      <Chrome size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-3 h-12 bg-white/5 border border-white/10 rounded-[1.25rem] hover:bg-white/10 transition-all group">
                      <Smartphone size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Apple</span>
                    </button>
                 </div>
               </div>
             )}

             {step === 'role-selection' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                 <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-600 text-center mb-4">Authorized Deployment Mode</p>
                 
                 <button 
                    onClick={() => handleRoleSelection('USER')}
                    className="w-full p-6 rounded-[2rem] border-2 border-white/5 hover:border-london-blue bg-white/[0.01] flex items-center gap-5 group transition-all"
                 >
                    <div className="w-12 h-12 bg-london-blue/10 text-london-blue rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-london-blue group-hover:text-white transition-all shadow-inner">
                      <User size={22} />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black italic tracking-tighter uppercase text-white leading-none">Executive Node</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-slate-600 mt-1">Deploy Strategic Minds</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-slate-800 group-hover:text-london-blue transition-colors" />
                 </button>

                 <button 
                    onClick={() => handleRoleSelection('CONSULTANT')}
                    className="w-full p-6 rounded-[2rem] border-2 border-white/5 hover:border-gold-accent bg-white/[0.01] flex items-center gap-5 group transition-all"
                 >
                    <div className="w-12 h-12 bg-gold-accent/10 text-gold-accent rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-gold-accent group-hover:text-black transition-all shadow-inner">
                      <Briefcase size={22} />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-black italic tracking-tighter uppercase text-white leading-none">Expert Node</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-slate-600 mt-1">Monetize Core Intel</p>
                    </div>
                    <ChevronRight size={16} className="ml-auto text-slate-800 group-hover:text-gold-accent transition-colors" />
                 </button>

                 <button 
                    onClick={() => setStep('entry')}
                    className="w-full py-4 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 hover:text-white transition-colors"
                 >
                    Abort Node Synchronization
                 </button>
               </div>
             )}

             {step === 'verifying' && (
               <div className="py-12 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500">
                 <div className="relative">
                    <div className="absolute inset-0 bg-london-blue/30 blur-[80px] rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-[2rem] border-4 border-london-blue/40 flex items-center justify-center relative z-10 bg-london-blue/5">
                      <Loader2 size={40} className="text-london-blue animate-spin" />
                    </div>
                 </div>
                 <div className="text-center space-y-3">
                    <p className="text-[9px] font-black text-london-blue uppercase tracking-[0.6em] animate-pulse">ESTABLISHING_L3_NODE</p>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Authorizing.</h3>
                 </div>
                 <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-london-blue animate-[progress_2s_ease-in-out_infinite] shadow-[0_0_25px_#0052FF]" />
                 </div>
               </div>
             )}
          </div>

          {/* Global Trust Signals */}
          <div className="text-center space-y-8">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 hover:text-london-blue transition-colors"
            >
              {mode === 'login' ? "Registry invite only? Apply for access" : "Existing Node? Sync Authorized Terminal"}
            </button>
            
            <div className="flex items-center justify-center gap-6 opacity-30 group hover:opacity-80 transition-all duration-1000">
              <div className="flex flex-col items-center gap-1.5">
                <Shield size={12} className="text-london-blue" />
                <span className="text-[6px] font-black uppercase tracking-widest text-white">Compliance</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div className="flex flex-col items-center gap-1.5">
                <Lock size={12} className="text-london-blue" />
                <span className="text-[6px] font-black uppercase tracking-widest text-white">L3 Encrypted</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div className="flex flex-col items-center gap-1.5">
                <Fingerprint size={12} className="text-london-blue" />
                <span className="text-[6px] font-black uppercase tracking-widest text-white">Biometric</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Footnote */}
        <div className="absolute bottom-8 flex items-center gap-4 opacity-10">
           <div className="h-px w-16 bg-white" />
           <span className="text-[7px] font-black uppercase tracking-[1em] text-white">
              STABLE_V4.2.1
           </span>
           <div className="h-px w-16 bg-white" />
        </div>
      </div>
    </div>
  );
};

export default SplitAuthView;
