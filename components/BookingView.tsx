
import React, { useState } from 'react';
import { Expert } from '../types';
import { 
  CheckCircle, 
  ShieldCheck, 
  Lock, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Loader2, 
  Sparkles, 
  Video, 
  Copy, 
  ExternalLink,
  ShieldAlert,
  Zap,
  ChevronRight,
  Info,
  Sun,
  Moon
} from 'lucide-react';

interface Props {
  expert: Expert;
  onBack: () => void;
  onComplete: () => void;
}

const BookingView: React.FC<Props> = ({ expert, onBack, onComplete }) => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [briefing, setBriefing] = useState('');
  const [step, setStep] = useState<'schedule' | 'briefing' | 'payment' | 'authorizing' | 'success'>('schedule');
  const [copied, setCopied] = useState(false);

  const dates = [
    { label: 'MON', date: '22 MAY' },
    { label: 'TUE', date: '23 MAY' },
    { label: 'WED', date: '24 MAY' },
    { label: 'THU', date: '25 MAY' },
    { label: 'FRI', date: '26 MAY' },
  ];

  const morningTimes = ['09:00', '10:30', '11:30'];
  const afternoonTimes = ['13:00', '14:30', '16:00', '17:30'];

  const handleAuthorize = () => {
    setStep('authorizing');
    setTimeout(() => {
      setStep('success');
    }, 2400); 
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://consultancy.london/secure/v_82394_x');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const protocolFee = Math.round(expert.hourlyRate * 0.10);
  const totalInvestment = expert.hourlyRate + protocolFee;

  if (step === 'authorizing') {
    return (
      <div className="max-w-xl mx-auto px-6 h-[80vh] flex flex-col items-center justify-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
          <Loader2 size={80} className="text-[var(--brand-primary)] animate-spin relative z-10" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Authorizing Secure Protocol...</h2>
          <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.4em]">Verifying encrypted transaction & node availability</p>
        </div>
        <div className="w-64 h-1 bg-[var(--border-soft)] rounded-full overflow-hidden">
          <div className="h-full bg-[var(--brand-primary)]" style={{ width: '60%' }} />
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 space-y-16">
        <div className="text-center space-y-8">
          <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto ring-1 ring-emerald-500/20 shadow-2xl">
            <CheckCircle size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none italic">Deployment <span className="brand-gradient-text">Authorized.</span></h2>
            <p className="text-[var(--text-secondary)] text-xl font-light">Your fractional session with {expert.name} is confirmed.</p>
          </div>
        </div>

        <div className="noir-card p-12 space-y-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
             <ShieldCheck size={160} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Date & Time Node</p>
              <p className="text-2xl font-black italic tracking-tighter">{dates[selectedDate].date} @ {selectedTime} GMT</p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Protocol Status</p>
              <div className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-[0.2em]">
                <ShieldCheck size={20} /> End-to-End Encrypted
              </div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Secure Video Access</p>
            <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-[var(--border-soft)] group">
              <Video size={20} className="text-[var(--text-muted)]" />
              <code className="flex-1 text-sm text-[var(--text-main)] truncate font-mono tracking-wider italic">https://consultancy.london/secure/v_82394_x</code>
              <button 
                onClick={copyLink}
                className="p-3 hover:bg-[var(--border-soft)] rounded-xl transition-all text-[var(--text-muted)] hover:text-[var(--text-main)]"
                title="Copy secure link"
              >
                {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
              </button>
            </div>
            <div className="flex items-center gap-3 px-2">
               <Info size={14} className="text-[var(--brand-primary)]" />
               <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                 Node link activates 300 seconds prior to scheduled deployment.
               </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <button className="flex-1 bg-[var(--text-main)] text-[var(--bg-deep)] py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[var(--brand-primary)] transition-all shadow-2xl flex items-center justify-center gap-3 group">
            Add to Registry <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <button 
            onClick={onComplete}
            className="flex-1 bg-transparent border border-[var(--border-soft)] text-[var(--text-main)] py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[var(--border-soft)] transition-all"
          >
            Access Terminal Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-24 pb-32">
      <div className="flex items-center justify-between mb-20">
        <button onClick={onBack} className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text-main)] text-[10px] font-black uppercase tracking-[0.3em] transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Abort Authorization
        </button>
        <div className="flex gap-4">
          {['schedule', 'briefing', 'payment'].map((s, idx) => (
            <div 
              key={s} 
              className={`h-1.5 w-12 rounded-full transition-all duration-700 ${
                (step === s || (step === 'payment' && s !== 'payment' ) || (step === 'briefing' && s === 'schedule')) 
                  ? 'bg-[var(--brand-primary)] shadow-[0_0_10px_var(--brand-primary)]' 
                  : 'bg-[var(--border-soft)]'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-16">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="hidden md:flex flex-col items-center gap-6 shrink-0">
            <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-white/5 border border-[var(--border-soft)] flex items-center justify-center text-[var(--text-muted)] font-black text-2xl shadow-xl italic">
              {expert.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="w-0.5 h-full bg-gradient-to-b from-[var(--border-soft)] to-transparent" />
          </div>

          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-[var(--text-main)] tracking-tighter uppercase italic">
                Secure Session Request
              </h3>
              <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.4em] text-[10px]">
                Deploying with <span className="text-[var(--brand-primary)]">{expert.name}</span> • {expert.industry} Node
              </p>
            </div>
            
            {step === 'schedule' && (
              <div className="space-y-12">
                <div className="space-y-6">
                  <p className="text-[var(--text-secondary)] flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                    <Calendar size={18} className="text-[var(--brand-primary)]" /> 1. Deployment Window
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {dates.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(i)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center ${
                          selectedDate === i 
                            ? 'bg-[var(--text-main)] border-[var(--text-main)] text-[var(--bg-deep)] shadow-2xl' 
                            : 'bg-transparent border-[var(--border-soft)] text-[var(--text-muted)] hover:border-[var(--text-main)]'
                        }`}
                      >
                        <span className="text-[9px] font-black block mb-2 uppercase tracking-widest opacity-60">{d.label}</span>
                        <span className="text-xl font-black tracking-tighter">{d.date.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-[var(--text-secondary)] flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                    <Clock size={18} className="text-[var(--brand-accent)]" /> 2. Start Time (GMT)
                  </p>
                  
                  {/* Morning Slots */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                      <Sun size={14} className="text-amber-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Morning Blocks (AM)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {morningTimes.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all border-2 duration-300 ${
                            selectedTime === t 
                              ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-2xl' 
                              : 'bg-transparent border-[var(--border-soft)] text-[var(--text-muted)] hover:border-[var(--brand-primary)]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Afternoon Slots */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                      <Moon size={14} className="text-london-blue" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Afternoon Blocks (PM)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {afternoonTimes.map(t => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all border-2 duration-300 ${
                            selectedTime === t 
                              ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-white shadow-2xl' 
                              : 'bg-transparent border-[var(--border-soft)] text-[var(--text-muted)] hover:border-[var(--brand-primary)]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!selectedTime}
                  onClick={() => setStep('briefing')}
                  className="w-full bg-[var(--text-main)] text-[var(--bg-deep)] py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] disabled:opacity-30 hover:bg-[var(--brand-primary)] transition-all shadow-2xl flex items-center justify-center gap-3 group"
                >
                  Configure Intelligence Brief <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 'briefing' && (
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-[var(--text-secondary)] flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                      <Sparkles size={18} className="text-amber-500" /> Intelligence Briefing
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light italic">
                      Provide situational context for {expert.name} to review prior to deployment.
                    </p>
                  </div>
                  <textarea
                    value={briefing}
                    onChange={(e) => setBriefing(e.target.value)}
                    placeholder="Brief objective: FCA compliance audit for London-based fintech scaling Series B... "
                    className="w-full bg-gray-50 dark:bg-white/5 border-2 border-[var(--border-soft)] rounded-2xl p-8 text-[var(--text-main)] text-sm focus:outline-none focus:border-[var(--brand-primary)] min-h-[220px] resize-none transition-all font-light italic"
                  />
                </div>

                <div className="flex gap-6">
                  <button 
                    onClick={() => setStep('schedule')}
                    className="px-10 py-6 rounded-2xl border-2 border-[var(--border-soft)] text-[var(--text-main)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--border-soft)] transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('payment')}
                    className="flex-1 bg-[var(--text-main)] text-[var(--bg-deep)] py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[var(--brand-primary)] transition-all shadow-2xl"
                  >
                    Proceed to Authorization Terminal
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-12">
                <div className="noir-card p-12 space-y-12 bg-gradient-to-br from-gray-50 to-white dark:from-[#111112] dark:to-transparent shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Zap size={160} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.5em]">Deployment Investment</p>
                      <p className="text-7xl font-black text-[var(--text-main)] tracking-tighter italic leading-none">£{totalInvestment}</p>
                    </div>
                    <div className="text-right space-y-4">
                       <div className="text-[var(--brand-primary)] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-end gap-3">
                         <ShieldCheck size={16} /> Protocol Secure L3
                       </div>
                       <p className="text-[var(--text-muted)] text-[9px] uppercase font-bold tracking-[0.4em]">HMRC Verified • VAT Invoiced</p>
                    </div>
                  </div>
                  
                  <div className="h-0.5 bg-[var(--border-soft)] w-full opacity-50" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
                       <span>Consultant Subtotal</span>
                       <span className="text-[var(--text-main)]">£{expert.hourlyRate}.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black text-[var(--brand-primary)] uppercase tracking-[0.3em]">
                       <span>Service Protocol Fee (10%)</span>
                       <span>£{protocolFee}.00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">Authorized Payment Source</p>
                    <div className="noir-card p-8 flex justify-between items-center group hover:border-[var(--brand-primary)] transition-all cursor-pointer bg-white/50 dark:bg-transparent">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg shadow-lg" />
                        <span className="text-[var(--text-main)] font-mono tracking-[0.4em] text-sm italic font-bold">•••• •••• •••• 4242</span>
                      </div>
                      <span className="text-[var(--text-muted)] font-mono text-[10px] font-black uppercase tracking-widest">EXP: 12 / 28</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-amber-500/5 rounded-2xl border-2 border-amber-500/10">
                    <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-black uppercase tracking-widest">
                      Engagement protocol: 24h standard cancellation policy. All sessions recorded for regulatory compliance by default.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <button 
                    onClick={() => setStep('briefing')}
                    className="px-10 py-6 rounded-2xl border-2 border-[var(--border-soft)] text-[var(--text-main)] font-black text-[10px] uppercase tracking-widest hover:bg-[var(--border-soft)] transition-all"
                  >
                    Modify Brief
                  </button>
                  <button
                    onClick={handleAuthorize}
                    className="flex-1 bg-[var(--text-main)] text-[var(--bg-deep)] py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[var(--brand-primary)] transition-all shadow-2xl flex items-center justify-center gap-3 group"
                  >
                    Authorize Node Deployment <Lock size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingView;
