
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Sparkles, ShieldCheck, Video, Zap } from 'lucide-react';

interface Props {
  onClose: () => void;
  onComplete: () => void;
}

const PlatformTour: React.FC<Props> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "City Intelligence Node",
      description: "Welcome to London's elite consultancy network. This platform uses high-fidelity protocols to connect you with top-tier City consultants instantly.",
      icon: <Zap className="text-amber-500" size={32} />,
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Protocol-Based Discovery",
      description: "Use our AI-enhanced registry to filter by London-specific niche expertise, from FCA compliance to AI digital transformation.",
      icon: <Sparkles className="text-blue-500" size={32} />,
      color: "from-blue-500/20 to-purple-600/20"
    },
    {
      title: "Secure Verification",
      description: "Every session is end-to-end encrypted. We handle the HMRC-compliant billing and multi-node identity verification automatically.",
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      color: "from-emerald-500/20 to-teal-600/20"
    },
    {
      title: "Live Deployment",
      description: "Engage in zero-latency video calls with built-in document review. Pay only for the fractional time you actually use.",
      icon: <Video className="text-rose-500" size={32} />,
      color: "from-rose-500/20 to-pink-600/20"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="max-w-lg w-full bg-[var(--bg-sidebar)] border border-[var(--border-soft)] rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,1)]">
        <div className={`absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br ${steps[step].color} rounded-full blur-[100px] opacity-30 transition-all duration-700`} />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-3 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-xl hover:bg-[var(--border-soft)]">
          <X size={20} />
        </button>

        <div className="relative z-10 space-y-10">
          <div className="w-20 h-20 bg-gray-50 dark:bg-black/40 rounded-3xl flex items-center justify-center border border-[var(--border-soft)] shadow-inner">
            {steps[step].icon}
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold tracking-tight text-[var(--text-main)] italic">{steps[step].title}</h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-light">
              {steps[step].description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-10 border-t border-[var(--border-soft)]">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-[var(--brand-primary)]' : 'w-2 bg-[var(--text-muted)] opacity-20'}`} />
              ))}
            </div>

            <div className="flex gap-4">
              {step > 0 && (
                <button 
                  onClick={prevStep} 
                  className="p-4 rounded-2xl hover:bg-[var(--border-soft)] text-[var(--text-secondary)] transition-all border border-[var(--border-soft)]"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <button 
                onClick={nextStep}
                className="bg-[var(--text-main)] text-[var(--bg-deep)] px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-[var(--brand-primary)] transition-all shadow-2xl group"
              >
                {step === steps.length - 1 ? "Initialize Registry" : "Next Protocol"} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformTour;
