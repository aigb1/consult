
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PoundSterling, 
  Clock, 
  Globe, 
  Award, 
  ShieldCheck, 
  X, 
  ChevronRight, 
  User, 
  Linkedin, 
  Rocket, 
  Zap,
  Target,
  FileText,
  ChevronLeft,
  CheckCircle2,
  Lock,
  BarChart3,
  Monitor,
  Fingerprint,
  Mic,
  Video,
  ShieldAlert,
  Building2,
  Briefcase,
  Trophy,
  Activity,
  Cpu,
  CircleCheck,
  Loader2
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

type AppStep = 'identity' | 'matrix' | 'profile' | 'readiness' | 'governance' | 'processing' | 'success';

const ForConsultantsPage: React.FC<Props> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<AppStep>('identity');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    vertical: 'Finance & Fintech',
    rate: 250,
    years: 10,
    bio: '',
    specialties: '',
    hardwareChecked: false,
    privacyAgreed: false
  });

  const steps: AppStep[] = ['identity', 'matrix', 'profile', 'readiness', 'governance'];
  const currentIndex = steps.indexOf(currentStep);

  const handleNext = () => {
    if (currentStep === 'governance') {
      setCurrentStep('processing');
      setTimeout(() => setCurrentStep('success'), 2500);
    } else {
      const nextIdx = currentIndex + 1;
      if (nextIdx < steps.length) setCurrentStep(steps[nextIdx]);
    }
  };

  const handleBack = () => {
    const prevIdx = currentIndex - 1;
    if (prevIdx >= 0) setCurrentStep(steps[prevIdx]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep('identity');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'identity':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold hero-font italic tracking-tighter dark:text-white uppercase leading-none">Identity <span className="text-london-blue">Protocol.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Section 01: Core Verification</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Authorized Full Name</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-london-blue transition-colors"><User size={18} /></div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Alistair Sterling" 
                    className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-16 pr-6 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Secure Email Address</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-london-blue transition-colors"><ShieldCheck size={18} /></div>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="corporate@domain.com" 
                    className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-16 pr-6 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Professional Index (LinkedIn)</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-london-blue transition-colors"><Linkedin size={18} /></div>
                  <input 
                    type="url" 
                    value={formData.linkedin}
                    onChange={e => setFormData({...formData, linkedin: e.target.value})}
                    placeholder="linkedin.com/in/username" 
                    className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-16 pr-6 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white" 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'matrix':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold hero-font italic tracking-tighter dark:text-white uppercase leading-none">Deployment <span className="text-london-blue">Matrix.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Section 02: Configuration</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Vertical Specialization</label>
                <select 
                  value={formData.vertical}
                  onChange={e => setFormData({...formData, vertical: e.target.value})}
                  className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 font-bold italic outline-none focus:border-london-blue transition-all appearance-none dark:text-white"
                >
                  <option>Finance & Fintech</option>
                  <option>AI & Digital Transformation</option>
                  <option>Legal & Compliance</option>
                  <option>Sustainability (ESG)</option>
                  <option>Marketing & Strategy</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Requested Hourly Rate (£)</label>
                <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-4xl font-bold italic tracking-tighter dark:text-white">£{formData.rate}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-london-blue">Registry Target</span>
                  </div>
                  <input 
                    type="range" 
                    min="150" 
                    max="1000" 
                    step="10" 
                    value={formData.rate}
                    onChange={e => setFormData({...formData, rate: parseInt(e.target.value)})}
                    className="w-full accent-london-blue"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold hero-font italic tracking-tighter dark:text-white uppercase leading-none">Intelligence <span className="text-london-blue">Depth.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Section 03: Expertise Mapping</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Consultancy Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  placeholder="Summarize your London market experience and high-impact projects..." 
                  className="w-full h-32 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-6 font-medium italic text-sm outline-none focus:border-london-blue transition-all resize-none dark:text-white" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Core Specialties (e.g. FCA, L3, IR35)</label>
                <input 
                  type="text" 
                  value={formData.specialties}
                  onChange={e => setFormData({...formData, specialties: e.target.value})}
                  placeholder="Strategy, Compliance, Scaling..." 
                  className="w-full h-16 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white" 
                />
              </div>
            </div>
          </div>
        );
      case 'readiness':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold hero-font italic tracking-tighter dark:text-white uppercase leading-none">Terminal <span className="text-london-blue">Sync.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Section 04: Operational Checks</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 border-2 border-slate-100 dark:border-white/5 rounded-[32px] flex flex-col items-center gap-4 text-center">
                 <div className="w-14 h-14 bg-london-blue/10 rounded-2xl flex items-center justify-center text-london-blue">
                   <Video size={24} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest">High-Fidelity Video Node</p>
                 <div className="flex gap-1">
                   {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 rounded-full bg-emerald-500" />)}
                 </div>
              </div>
              <div className="p-8 border-2 border-slate-100 dark:border-white/5 rounded-[32px] flex flex-col items-center gap-4 text-center">
                 <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                   <Mic size={24} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest">Acoustic Logic Verified</p>
                 <div className="flex gap-1">
                   {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 rounded-full bg-emerald-500" />)}
                 </div>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, hardwareChecked: !formData.hardwareChecked})}
              className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.hardwareChecked ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-100 dark:border-white/5 hover:border-london-blue/30'}`}
            >
              <div className="flex items-center gap-4">
                <Monitor size={18} className={formData.hardwareChecked ? 'text-emerald-500' : 'text-slate-400'} />
                <span className="text-sm font-bold italic">Authorize hardware handshake</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.hardwareChecked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'}`}>
                 {formData.hardwareChecked && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </button>
          </div>
        );
      case 'governance':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold hero-font italic tracking-tighter dark:text-white uppercase leading-none">Registry <span className="text-london-blue">Commit.</span></h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Section 05: Compliance Authorization</p>
            </div>
            <div className="space-y-6">
               <div className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center gap-4 text-london-blue">
                    <ShieldCheck size={24} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Sovereign Data Pledge</span>
                  </div>
                  <p className="text-sm text-slate-500 italic leading-relaxed font-light">
                    "I authorize Consultancy.london to perform specialized identity and professional standing verification. I commit to maintaining London market standards."
                  </p>
               </div>
               <button 
                type="button" 
                onClick={() => setFormData({...formData, privacyAgreed: !formData.privacyAgreed})}
                className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.privacyAgreed ? 'border-london-blue bg-london-blue/5' : 'border-slate-100 dark:border-white/5 hover:border-london-blue/30'}`}
               >
                 <div className="flex items-center gap-4">
                   <Fingerprint size={18} className={formData.privacyAgreed ? 'text-london-blue' : 'text-slate-400'} />
                   <span className="text-sm font-bold italic">Digitally sign protocol agreement</span>
                 </div>
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.privacyAgreed ? 'bg-london-blue border-london-blue' : 'border-slate-200'}`}>
                    {formData.privacyAgreed && <CheckCircle2 size={14} className="text-white" />}
                 </div>
               </button>
            </div>
          </div>
        );
      case 'processing':
        return (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-10 p-10 text-center animate-in fade-in duration-700">
             <div className="relative">
                <div className="absolute inset-0 bg-london-blue/20 blur-[80px] rounded-full animate-pulse" />
                <Loader2 size={64} className="text-london-blue animate-spin relative z-10" />
             </div>
             <div className="space-y-3">
               <h4 className="text-2xl font-black italic tracking-tighter uppercase dark:text-white">Synthesizing Node Entry</h4>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Running L3 Verification Handshake...</p>
             </div>
             <div className="w-full max-w-xs space-y-3 font-mono bg-white/5 p-6 rounded-2xl border border-white/5 text-[9px] text-slate-500 uppercase tracking-widest text-left">
                <p className="flex gap-2"> <span className="text-emerald-500">[OK]</span> IDENTITY_RESOLVED</p>
                <p className="flex gap-2"> <span className="text-emerald-500">[OK]</span> REGISTRY_INDEX_SYNC</p>
                <p className="flex gap-2 text-london-blue animate-pulse"> <span className="opacity-0">---</span> VERIFYING_PEDIGREE...</p>
             </div>
          </div>
        );
      case 'success':
        return (
          <div className="min-h-[500px] flex flex-col items-center justify-center space-y-10 p-10 text-center animate-in fade-in duration-1000">
             <div className="relative group cursor-pointer" onClick={closeModal}>
                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse scale-125" />
                <div className="w-40 h-40 rounded-[56px] border-4 border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center relative z-10 shadow-3xl">
                   <CircleCheck size={80} className="text-emerald-500 animate-[bounce_2s_infinite]" />
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white leading-tight">NODE ENTRY <br/><span className="text-emerald-500">COMPLETE.</span></h3>
                <p className="text-slate-400 text-lg italic font-light max-w-sm mx-auto leading-relaxed">Your application is registered. Our adjudicators will finalize the handshake within 24 operational hours.</p>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-[#050505] text-slate-900 dark:text-white min-h-screen py-16 animate-in fade-in duration-700 transition-colors relative">
      
      {/* Centered Application Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-[400] bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-500" onClick={currentStep === 'processing' ? undefined : closeModal} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[500] w-full max-w-xl bg-white dark:bg-[#0D1117] rounded-[40px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] border border-slate-100 dark:border-white/5 animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-10 pt-10 pb-6 flex justify-between items-center z-10 shrink-0 border-b border-slate-50 dark:border-white/5">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-london-blue/10 text-london-blue flex items-center justify-center font-black italic border border-london-blue/20 shadow-inner">
                     {formData.name ? formData.name[0] : 'A'}
                   </div>
                   <div className="space-y-0.5">
                      <h3 className="text-2xl font-black italic tracking-tighter uppercase dark:text-white leading-none">
                        {currentStep === 'success' ? 'Terminal Entry Complete' : 'Registry Entry Protocol'}
                      </h3>
                      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                        {currentStep === 'success' ? 'HANDSHAKE_SECURED' : `Step ${currentIndex + 1} of 5: NODE_INGESTION`}
                      </p>
                   </div>
                </div>
                <button onClick={closeModal} className="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl text-slate-400 hover:text-red-500 transition-all">
                  <X size={24} />
                </button>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-10">
              {renderStepContent()}
            </div>

            {/* Footer Action Bar */}
            <div className={`px-10 py-10 border-t shrink-0 z-40 transition-all duration-700 ${currentStep === 'processing' ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'} ${currentStep === 'success' ? 'bg-[#050505] border-white/10' : 'bg-white dark:bg-[#0D1117] border-slate-50 dark:border-white/5'} flex gap-4`}>
              {currentIndex > 0 && currentStep !== 'success' && (
                <button 
                  onClick={handleBack}
                  className="flex-1 py-5 border-2 border-slate-200 dark:border-white/10 rounded-full font-black text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleNext} 
                disabled={(currentStep === 'identity' && (!formData.name || !formData.email)) || (currentStep === 'readiness' && !formData.hardwareChecked) || (currentStep === 'governance' && !formData.privacyAgreed)}
                className={`flex-[2] py-5 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 shadow-xl flex items-center justify-center gap-4 group ${currentStep === 'success' ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' : 'bg-[#0D1E3A] text-white hover:bg-blue-600'}`}
              >
                {currentStep === 'success' ? 'Return to Home' : 
                 currentStep === 'governance' ? 'Initialize Final Commit' : 'Authorize Step'} 
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </>
      )}

      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-400 hover:text-london-blue transition-colors mb-12 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold hero-font tracking-tight mb-8 leading-tight italic dark:text-white">
              Expert<span className="brand-gradient-text">ise.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light italic max-w-xl">
              Join the capital's most exclusive consultancy node. We manage the logistics, billing, and technical stack, allowing you to focus purely on high-impact fractional delivery.
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-12 py-6 bg-london-blue text-white rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-blue-500/30 flex items-center gap-4 group shrink-0"
          >
            Apply to Registry <Rocket size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {[
            { 
              icon: <Fingerprint size={32} />, 
              title: "Defined Economics", 
              desc: "Full control over your hourly rate. Instant payouts through the Stripe protocol. Tier-1 billing automation.", 
              color: "text-blue-500", 
              bg: "bg-blue-500/10" 
            },
            { 
              icon: <Clock size={32} />, 
              title: "Fractional Scale", 
              desc: "Total schedule autonomy. Open specific slots or block weeks for deep-work projects. Deployment on your terms.", 
              color: "text-emerald-500", 
              bg: "bg-emerald-500/10" 
            },
            { 
              icon: <ShieldCheck size={32} />, 
              title: "Verified Standing", 
              desc: "Join a curated elite. We only admit consultants with proven London-market pedigrees, ensuring high-fidelity engagements.", 
              color: "text-purple-500", 
              bg: "bg-purple-500/10" 
            },
            { 
              icon: <Monitor size={32} />, 
              title: "Unified Terminal", 
              desc: "Access our end-to-end encrypted video suite with integrated document collaboration and session recording.", 
              color: "text-amber-500", 
              bg: "bg-amber-500/10" 
            }
          ].map((card, i) => (
            <div key={i} className="p-10 bg-white dark:bg-[#12161D] border border-slate-100 dark:border-white/5 rounded-[40px] space-y-6 group hover:border-london-blue/30 transition-all shadow-sm hover:shadow-xl">
              <div className={`p-5 ${card.bg} ${card.color} rounded-[24px] w-fit group-hover:scale-110 transition-all duration-500 shadow-inner`}>
                {card.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold hero-font italic tracking-tight dark:text-white">{card.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light italic">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-12 md:p-24 bg-[#0A0C10] text-white rounded-[4rem] relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12"><Zap size={400} /></div>
          <div className="relative z-10 max-w-2xl space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
              <Target size={14} className="text-london-blue" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-300">HMRC Registered Entity</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold italic tracking-tighter hero-font leading-[0.8]">Ready for <br/> <span className="brand-gradient-text">Deployment?</span></h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed italic">
              Our network only admits the top 5% of fractional consultants in London. If you have a proven track record of City excellence, initialize your entry node today.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center gap-4 group"
            >
              Initialize Entry Protocol <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForConsultantsPage;
