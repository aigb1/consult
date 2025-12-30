import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  ShieldCheck, 
  User, 
  Briefcase, 
  ArrowLeft, 
  Fingerprint, 
  Zap, 
  Lock,
  ChevronRight,
  Globe,
  Database,
  Mail,
  Smartphone,
  CheckCircle2,
  Loader2,
  Chrome
} from 'lucide-react';

interface Props {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

type LoginStep = 'entry' | 'role-selection' | 'verifying';

const LoginView: React.FC<Props> = ({ onLogin, onBack }) => {
  const [step, setStep] = useState<LoginStep>('entry');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate lookup/initial handshake
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
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-700">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full tech-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-london-blue/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

      <div className="w-full max-w-[480px] relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-london-blue/5 border border-london-blue/10 rounded-full cursor-pointer hover:bg-london-blue/10 transition-all group"
          >
            <Zap size={14} className="text-london-blue group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-london-blue">Consultancy.london Node</span>
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase hero-font dark:text-white">
            {step === 'entry' ? 'Welcome Back.' : step === 'role-selection' ? 'Select Node.' : 'Authorizing.'}
          </h1>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-[#0D1117] rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border border-slate-100 dark:border-white/5 p-10 md:p-12 animate-in zoom-in-95 duration-500">
          
          {step === 'entry' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <form onSubmit={handleEntry} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Organizational ID / Email</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-london-blue transition-colors">
                      <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="executive@firm.com"
                      className="w-full h-16 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-16 pr-6 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-16 bg-london-blue text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Continue'}
                  {!isLoading && <ChevronRight size={18} />}
                </button>
              </form>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-white/5" /></div>
                <span className="relative px-4 bg-white dark:bg-[#0D1117] text-[9px] font-black text-slate-400 uppercase tracking-widest">or Secure Protocol</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 h-14 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                  <Chrome size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest dark:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 h-14 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                  <Smartphone size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest dark:text-white">Apple</span>
                </button>
              </div>
            </div>
          )}

          {step === 'role-selection' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Synchronize Identity Node</p>
              
              <button 
                onClick={() => handleRoleSelection('USER')}
                className="w-full p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-london-blue bg-white dark:bg-white/[0.02] flex items-center gap-6 group transition-all"
              >
                <div className="w-14 h-14 bg-london-blue/10 text-london-blue rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <User size={24} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black italic tracking-tighter uppercase dark:text-white leading-none">Executive</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">Hire Elite Fractional Advisors</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-slate-300 group-hover:text-london-blue transition-colors" />
              </button>

              <button 
                onClick={() => handleRoleSelection('CONSULTANT')}
                className="w-full p-8 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-purple-500 bg-white dark:bg-white/[0.02] flex items-center gap-6 group transition-all"
              >
                <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-black italic tracking-tighter uppercase dark:text-white leading-none">Expert</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">Monetize Strategic Intelligence</p>
                </div>
                <ChevronRight size={20} className="ml-auto text-slate-300 group-hover:text-purple-500 transition-colors" />
              </button>

              <button 
                onClick={() => setStep('entry')}
                className="w-full py-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Change Registry ID
              </button>
            </div>
          )}

          {step === 'verifying' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-london-blue/20 blur-[60px] rounded-full animate-pulse" />
                <div className="w-24 h-24 rounded-full border-2 border-london-blue/40 flex items-center justify-center relative z-10 bg-london-blue/5">
                  <Loader2 size={40} className="text-london-blue animate-spin" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <p className="text-[10px] font-black text-london-blue uppercase tracking-[0.6em] animate-pulse">L3 SECURE GATEWAY</p>
                <h3 className="text-2xl font-bold italic dark:text-white">Authorizing Node Access...</h3>
              </div>
            </div>
          )}
        </div>

        {/* Footer Integrity */}
        <div className="mt-12 flex flex-col items-center gap-6 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-6 text-slate-400">
             <div className="flex items-center gap-2">
               <Lock size={12} className="text-london-blue" />
               <span className="text-[8px] font-black uppercase tracking-widest">AES-256 Verified</span>
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
             <div className="flex items-center gap-2">
               <Globe size={12} className="text-london-blue" />
               <span className="text-[8px] font-black uppercase tracking-widest">Global Protocol Sync</span>
             </div>
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-40">
            Consultancy.london Gateway MMXXVI
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;