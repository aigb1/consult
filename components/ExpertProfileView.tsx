
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Expert } from '../types';
import { 
  Star, 
  ArrowLeft, 
  ChevronRight, 
  Video, 
  Building2, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Briefcase, 
  History, 
  Fingerprint, 
  Loader2, 
  X, 
  MapPin, 
  Verified, 
  Target, 
  CheckCircle, 
  MoveUpRight, 
  TrendingUp, 
  Activity, 
  Lock, 
  ShieldAlert, 
  ArrowRight,
  Shield,
  CircleCheck,
  BadgeCheck,
  ChevronLeft,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Globe2,
  Code2,
  Users2,
  Terminal,
  Scale,
  Monitor,
  Network,
  PieChart,
  Landmark,
  Flame,
  AlertCircle,
  CalendarDays,
  Bitcoin,
  PoundSterling,
  /* Fixed missing icon imports */
  Sun,
  Moon
} from 'lucide-react';
import { DossierIdentitySkeleton, BentoBlockSkeleton, ExperienceItemSkeleton, TerminalSkeleton } from './Skeleton';

interface ExpertProfileViewProps {
  expert: Expert;
  onBack: () => void;
  onBook: (expert: Expert) => void;
  onStartCall: (expert: Expert) => void;
  isLoggedIn: boolean;
}

type BookingStep = 'modality' | 'schedule' | 'briefing' | 'authorization';
type PaymentProtocol = 'fiat' | 'crypto';

const ExpertProfileView: React.FC<ExpertProfileViewProps> = ({ 
  expert, 
  onBack, 
  onBook, 
  onStartCall, 
  isLoggedIn 
}) => {
  const [loading, setLoading] = useState(true);
  const [selectedModality, setSelectedModality] = useState<'video' | 'in-person'>('video');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [briefing, setBriefing] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [currentBookingStep, setCurrentBookingStep] = useState<BookingStep>('modality');
  const [paymentProtocol, setPaymentProtocol] = useState<PaymentProtocol>('fiat');
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDC'>('BTC');
  const [successLogs, setSuccessLogs] = useState<string[]>([]);

  const amSlots = ['09:00', '10:30', '11:30'];
  const pmSlots = ['13:00', '14:30', '16:00', '17:30'];

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, [expert.id]);

  const dates = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      arr.push({
        label: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
        day: d.getDate().toString().padStart(2, '0'),
        month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
        id: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`,
        fullDate: d
      });
    }
    return arr;
  }, []);

  const activeDateObj = useMemo(() => 
    dates.find(d => d.id === selectedDate), 
  [selectedDate, dates]);

  const nextSlots = useMemo(() => {
    const isAvailable = expert.availabilityStatus === 'Available';
    const videoSlot = isAvailable 
      ? { date: dates[0], time: '14:30', label: 'TODAY_ASAP' } 
      : { date: dates[1], time: '09:00', label: 'TMRW_EARLY' };
    const inPersonSlot = { date: dates[1], time: '11:30', label: 'CITY_HUB_SYNC' };
    return { video: videoSlot, inPerson: inPersonSlot };
  }, [expert.availabilityStatus, dates]);

  const handleFastTrack = (type: 'video' | 'in-person') => {
    const slot = type === 'video' ? nextSlots.video : nextSlots.inPerson;
    setSelectedModality(type);
    setSelectedDate(slot.date.id);
    setSelectedTimes([slot.time]);
    setCurrentBookingStep('briefing');
  };

  useEffect(() => {
    if (bookingSuccess) {
      const logs = [
        "DEPLOYMENT_PARAMS_CAPTURED",
        "ESCROW_PROTOCOL_HANDSHAKE: [OK]",
        "ENCRYPTION_LAYER_ACTIVE: [AES-256]",
        "CALENDAR_NODE_SYNCHRONIZED",
        "MISSION_AUTHORIZED: [STABLE]"
      ];
      logs.forEach((log, i) => {
        setTimeout(() => {
          setSuccessLogs(prev => [...prev, log]);
        }, i * 400);
      });
    } else {
      setSuccessLogs([]);
    }
  }, [bookingSuccess]);

  const toggleTime = (t: string) => {
    setSelectedTimes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setBookingSuccess(true);
    }, 2400);
  };

  const resetSuccessState = () => {
    setBookingSuccess(false);
    setCurrentBookingStep('modality');
    setSelectedTimes([]);
    setSelectedDate(null);
  };

  const currentStatus = useMemo(() => {
    const status = expert.availabilityStatus || 'Available';
    switch (status) {
      case 'Available':
        return { label: 'AVAILABLE', color: 'text-emerald-500', dot: 'bg-emerald-500', bg: 'bg-emerald-500/10' };
      case 'High Demand':
        return { label: 'IN SESSION', color: 'text-london-blue', dot: 'bg-london-blue', bg: 'bg-london-blue/10' };
      case 'Waitlist':
        return { label: 'UNAVAILABLE', color: 'text-slate-500', dot: 'bg-slate-500', bg: 'bg-emerald-500/10' };
      default:
        return { label: 'AVAILABLE', color: 'text-emerald-500', dot: 'bg-emerald-500', bg: 'bg-emerald-500/10' };
    }
  }, [expert.availabilityStatus]);

  const cryptoConversion = useMemo(() => {
    const totalGbp = selectedTimes.length * expert.hourlyRate;
    if (selectedCrypto === 'BTC') return (totalGbp / 50000).toFixed(4);
    if (selectedCrypto === 'ETH') return (totalGbp / 2500).toFixed(3);
    return totalGbp.toFixed(2);
  }, [selectedTimes.length, expert.hourlyRate, selectedCrypto]);

  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-gpt-dark-bg flex flex-col transition-colors z-[300] font-sans overflow-hidden">
      
      {/* SOVEREIGN TERMINAL HEADER */}
      <div className="flex-none h-14 bg-white dark:bg-black border-b border-slate-200 dark:border-white/5 flex items-center px-6 justify-between relative z-[400]">
        <div className="flex items-center gap-10 h-full">
          <button 
            onClick={onBack}
            className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            EXIT TERMINAL
          </button>
          
          <div className="h-full w-px bg-slate-200 dark:bg-white/5 mx-1" />

          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'modality', label: '01 PROTOCOL' },
              { id: 'schedule', label: '02 SYNC' },
              { id: 'briefing', label: '03 BRIEF' },
              { id: 'authorization', label: '04 DEPLOY' }
            ].map((step, idx) => {
              const stepsOrder = ['modality', 'schedule', 'briefing', 'authorization'];
              const isActive = currentBookingStep === step.id;
              const isPast = stepsOrder.indexOf(currentBookingStep) > idx;
              
              return (
                <div 
                  key={step.id}
                  className={`text-[9px] font-black tracking-tighter uppercase transition-all duration-500 ${
                    isActive ? 'text-slate-900 dark:text-white' : isPast ? 'text-london-blue' : 'text-slate-300 dark:text-slate-700'
                  } flex items-center gap-2`}
                >
                  {step.label}
                  {isActive && <div className="w-1 h-1 rounded-full bg-london-blue shadow-[0_0_8px_#0052FF]" />}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">SOVEREIGN_NODE_V4</span>
            <span className="text-[7px] font-bold font-mono tracking-widest text-slate-300 dark:text-slate-700 uppercase">0xAI...BRG0</span>
          </div>
          
          <motion.div 
            layout
            className={`h-9 px-4 rounded-xl flex items-center gap-4 transition-all duration-500 shadow-lg ${
              bookingSuccess 
              ? 'bg-london-blue text-white ring-1 ring-white/20' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-black'
            }`}
          >
             <span className="font-black text-[10px] tracking-widest">T{expert.tier || 1}</span>
             
             {bookingSuccess && (
               <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 border-l border-white/20 pl-4 h-4"
               >
                  <div className="flex items-center gap-2">
                    <CalendarDays size={10} className="opacity-60" />
                    <span className="text-[9px] font-black italic tracking-tighter uppercase">{activeDateObj?.day} {activeDateObj?.month}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={10} className="opacity-60" />
                    <span className="text-[9px] font-black italic tracking-tighter uppercase">{selectedTimes[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedModality === 'video' ? <Video size={10} className="opacity-60" /> : <Building2 size={10} className="opacity-60" />}
                    <span className="text-[9px] font-black italic tracking-tighter uppercase">{selectedModality}</span>
                  </div>
               </motion.div>
             )}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">
        <AnimatePresence>
          {isAuthorizing && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-[600] bg-slate-50/90 dark:bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 space-y-6"
            >
               <div className="relative">
                  <div className="absolute inset-0 bg-london-blue/20 blur-[60px] rounded-full animate-pulse" />
                  <Loader2 size={48} className="text-london-blue animate-spin relative z-10" />
               </div>
               <div className="text-center space-y-1.5">
                  <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font">Authorizing Node.</h3>
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500 animate-pulse">Initializing Secure Handshake</p>
               </div>
            </motion.div>
          )}

          {bookingSuccess && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-[700] bg-slate-100/95 dark:bg-black/95 backdrop-blur-[40px] flex items-center justify-center p-4 overflow-hidden"
            >
              <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none" />
              <div className="max-w-[420px] w-full bg-white dark:bg-[#0D1117]/90 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_120px_rgba(0,0,0,1)] flex flex-col items-center text-center relative ring-1 ring-black/5 dark:ring-white/5 animate-in zoom-in-95 duration-1000 shrink-0">
                 <div className="relative shrink-0 mb-4">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="absolute inset-0 bg-emerald-500/10 blur-[40px] rounded-full animate-pulse" 
                    />
                    <motion.div 
                      initial={{ rotate: -90, opacity: 0 }} 
                      animate={{ rotate: 0, opacity: 1 }} 
                      className="w-16 h-16 bg-slate-50 dark:bg-[#0D1117] border-2 border-emerald-500/40 rounded-[1.5rem] flex items-center justify-center text-emerald-500 relative z-10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    >
                      <CircleCheck size={32} className="animate-in zoom-in-50 duration-700 delay-300" />
                      <div className="absolute -inset-2 border border-emerald-500/10 rounded-[2rem] animate-[spin_12s_linear_infinite]" />
                    </motion.div>
                 </div>

                 <div className="space-y-2 relative z-10 mb-6">
                    <motion.h2 
                      initial={{ y: 15, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ delay: 0.4 }}
                      className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.85] hero-font"
                    >
                      DEPLOYMENT <br/><span className="text-emerald-500">AUTHORIZED.</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 0.6 }}
                      className="text-slate-400 dark:text-slate-500 text-[10px] italic font-light max-w-[240px] mx-auto leading-relaxed"
                    >
                      Handshake secured via Sovereign Registry Node.
                    </motion.p>
                 </div>

                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.8 }}
                   className="w-full grid grid-cols-3 gap-3 mb-6"
                 >
                    <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
                       <p className="text-[6px] font-black uppercase text-slate-400 tracking-widest">Temporal</p>
                       <p className="text-[10px] font-black italic uppercase text-slate-900 dark:text-white truncate">{activeDateObj?.day} {activeDateObj?.month}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
                       <p className="text-[6px] font-black uppercase text-slate-400 tracking-widest">Cycle Sync</p>
                       <p className="text-[10px] font-black italic uppercase text-slate-900 dark:text-white">{selectedTimes[0]}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl space-y-1">
                       <p className="text-[6px] font-black uppercase text-slate-400 tracking-widest">Modality</p>
                       <p className="text-[10px] font-black italic uppercase text-slate-900 dark:text-white truncate">{selectedModality}</p>
                    </div>
                 </motion.div>

                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.2 }}
                   className="w-full bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-1.5 font-mono text-[7px] text-slate-500 uppercase tracking-[0.2em] text-left shadow-inner group mb-6"
                 >
                    <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200 dark:border-white/5 opacity-40">
                       <Terminal size={8} className="text-london-blue" />
                       <span className="font-black">NODE_LOG_V4.2</span>
                    </div>
                    <div className="space-y-1">
                      <AnimatePresence>
                        {successLogs.map((log, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-between items-center"
                          >
                             <span className="flex items-center gap-2 truncate pr-2">
                                <span className="text-emerald-500/60 font-black">»</span>
                                <span className="text-slate-600 dark:text-slate-400">{log}</span>
                             </span>
                             <motion.span 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: 0.2 }}
                               className="text-[6px] text-slate-400 dark:text-slate-700 font-bold shrink-0"
                             >
                               ACK
                             </motion.span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <div className="pt-0.5">
                       <span className="text-london-blue animate-pulse font-black">_</span>
                    </div>
                 </motion.div>

                 <motion.button 
                   initial={{ y: 15, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1.8 }}
                   onClick={() => { resetSuccessState(); onBack(); }} 
                   className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[9px] uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden active:scale-95 shrink-0"
                 >
                    <span className="relative z-10 flex items-center gap-2">
                      REGISTRY EXIT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                 </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DOSSIER PANEL */}
        <div className="flex-1 h-full overflow-y-auto scrollbar-gpt bg-white dark:bg-gpt-dark-bg transition-colors relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 space-y-12 pb-40">
            
            {loading ? (
              <>
                <DossierIdentitySkeleton />
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <BentoBlockSkeleton />
                    <div className="grid md:grid-cols-2 gap-6">
                      <BentoBlockSkeleton />
                      <BentoBlockSkeleton />
                    </div>
                    {[...Array(3)].map((_, i) => <ExperienceItemSkeleton key={i} />)}
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <BentoBlockSkeleton />
                    <BentoBlockSkeleton />
                    <BentoBlockSkeleton />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* DOSSIER IDENTITY */}
                <div className="grid md:grid-cols-[180px_1fr] gap-10 items-start pb-10 border-b border-slate-100 dark:border-white/5">
                  <div className="space-y-5">
                    <div className="aspect-square rounded-[2.25rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl relative group bg-slate-100 dark:bg-[#0D1117] ring-1 ring-black/5 dark:ring-white/10">
                       {imgError ? (
                         <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-900 text-slate-400 dark:text-slate-700 font-black text-2xl italic select-none">{getInitials(expert.name)}</div>
                       ) : (
                         <img src={expert.imageUrl} onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={expert.name} />
                       )}
                       <div className="absolute top-4 right-4 z-10">
                          <div className="w-8 h-8 rounded-xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-slate-200 dark:border-white/20 flex items-center justify-center text-london-blue shadow-2xl">
                             <BadgeCheck size={16} />
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                          <span className="text-[6px] font-black uppercase text-emerald-500/60 tracking-widest">REGISTRY_STANDING</span>
                          <span className="text-[8px] font-black text-emerald-600 dark:text-white italic tracking-tighter">L5_VERIFIED</span>
                       </div>
                       <div className="px-3 py-1.5 bg-london-blue/5 border border-london-blue/20 rounded-xl flex items-center justify-between">
                          <span className="text-[6px] font-black uppercase text-london-blue tracking-widest">DEPLOYMENT_TIER</span>
                          <span className="text-[8px] font-black text-london-blue dark:text-white italic tracking-tighter">TIER_{expert.tier || 1}</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-london-blue">
                         <span className="text-[7.5px] font-black uppercase tracking-[0.5em] whitespace-nowrap opacity-60">ID_NODE: {expert.id.toUpperCase()}</span>
                         <div className="h-px w-full bg-london-blue/10" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font drop-shadow-2xl">
                        {expert.name}
                      </h1>
                      <p className="text-base md:text-lg font-black text-london-blue italic tracking-tight uppercase leading-none opacity-80">
                        Principal Node: {expert.industry}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <div className="p-3.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[1.75rem] space-y-1">
                          <p className="text-[6px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">THROUGHPUT</p>
                          <p className="text-base font-black italic text-slate-900 dark:text-white tracking-tighter">{expert.reviewCount}+ Missions</p>
                       </div>
                       <div className="p-3.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[1.75rem] space-y-1">
                          <p className="text-[6px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">SUCCESS_RATE</p>
                          <p className="text-base font-black italic text-emerald-500 tracking-tighter">99.8% SLA</p>
                       </div>
                       <div className="p-3.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[1.75rem] space-y-1">
                          <p className="text-[6px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">AVG_SYNC_TIME</p>
                          <p className="text-base font-black italic text-slate-900 dark:text-white tracking-tighter">{expert.avgResponseTime || '< 15M'}</p>
                       </div>
                       <div className="p-3.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[1.75rem] space-y-1">
                          <p className="text-[6px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">SENTIMENT</p>
                          <div className="flex items-center gap-1">
                            <p className="text-base font-black italic text-slate-900 dark:text-white tracking-tighter">4.9/5</p>
                            <Star size={10} className="text-london-blue fill-current" />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* BENTO GRID */}
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3rem] space-y-5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        <Terminal size={120} />
                      </div>
                      <div className="flex items-center gap-3">
                         <Target size={16} className="text-london-blue" />
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Sovereign Briefing Protocol</span>
                      </div>
                      <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-300 font-light italic leading-relaxed hero-font">
                        {expert.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-5">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <PieChart size={14} className="text-london-blue" />
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Mission distribution</span>
                             </div>
                          </div>
                          <div className="space-y-3.5">
                             {[
                               { label: 'Strategic M&A', pct: '45%' },
                               { label: 'L3 Compliance', pct: '30%' },
                               { label: 'Scale-up Ops', pct: '25%' }
                             ].map(item => (
                               <div key={item.label} className="space-y-1.5">
                                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                     <span>{item.label}</span>
                                     <span className="text-slate-900 dark:text-white">{item.pct}</span>
                                  </div>
                                  <div className="h-0.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-london-blue opacity-80" style={{ width: item.pct }} />
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-5">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <Users2 size={14} className="text-london-blue" />
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Vouch Count</span>
                             </div>
                          </div>
                          <div className="flex flex-col items-center justify-center h-20 space-y-1.5">
                             <div className="flex -space-x-1.5">
                                {[...Array(5)].map((_, i) => (
                                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#050505] bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-900 dark:text-white shadow-xl">
                                      {['VP', 'CX', 'DR', 'MD', 'PL'][i]}
                                   </div>
                                ))}
                             </div>
                             <p className="text-[8px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">42 Verified Vouch Points</p>
                          </div>
                       </div>
                    </div>

                    {/* TECHNICAL STACK & HARD SKILLS */}
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-6">
                       <div className="flex items-center gap-3 px-1">
                          <Code2 size={16} className="text-london-blue" />
                          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Technical Intelligence Stack</span>
                          <div className="h-px flex-1 bg-slate-200 dark:border-white/5" />
                       </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {expert.techStack.map(stack => (
                            <div key={stack} className="p-4 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col gap-2 group hover:border-london-blue/30 transition-all">
                               <span className="text-[11px] font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-london-blue transition-colors">{stack}</span>
                               <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`h-0.5 flex-1 rounded-full ${i < 4 ? 'bg-london-blue' : 'bg-slate-200 dark:bg-white/5'}`} />
                                  ))}
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* PEDIGREE & CREDENTIALS */}
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-8">
                       <div className="flex items-center gap-3 px-1">
                          <GraduationCap size={16} className="text-london-blue" />
                          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Pedigree & Credentials</span>
                          <div className="h-px flex-1 bg-slate-200 dark:border-white/5" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                             <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Academic Base</h6>
                             <div className="space-y-4">
                                {expert.education.map((edu, i) => (
                                  <div key={i} className="flex gap-4 items-start group">
                                     <div className="w-10 h-10 rounded-xl bg-london-blue/5 border border-london-blue/20 flex items-center justify-center shrink-0 text-london-blue group-hover:scale-110 transition-transform">
                                        <Landmark size={18} />
                                     </div>
                                     <div className="space-y-0.5">
                                        <p className="text-xs font-black uppercase italic text-slate-900 dark:text-white leading-tight">{edu.institution}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light italic">{edu.degree} • {edu.year}</p>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-6">
                             <h6 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certifications</h6>
                             <div className="space-y-4">
                                {expert.certifications.map((cert, i) => (
                                  <div key={i} className="flex gap-4 items-start group">
                                     <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-500 group-hover:scale-110 transition-transform">
                                        <Award size={18} />
                                     </div>
                                     <div className="space-y-0.5">
                                        <p className="text-xs font-black uppercase italic text-slate-900 dark:text-white leading-tight">{cert.name}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light italic">{cert.issuer}</p>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-5">
                       <div className="flex items-center gap-4 px-2">
                          <History size={16} className="text-london-blue" />
                          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Deployment History</span>
                          <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
                       </div>
                       <div className="space-y-4">
                          {expert.experience.map((exp, i) => (
                            <div key={i} className="flex gap-6 p-6 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] group hover:border-london-blue/20 transition-all relative">
                               <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                                  <Briefcase size={20} className="text-slate-400 dark:text-slate-500 group-hover:text-london-blue" />
                               </div>
                               <div className="space-y-2 flex-1">
                                  <div className="flex justify-between items-start">
                                     <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-london-blue transition-colors leading-none">{exp.role}</h4>
                                        <p className="text-[9px] font-black text-london-blue uppercase tracking-widest mt-1 opacity-70">{exp.company}</p>
                                     </div>
                                     <span className="px-2.5 py-1 bg-slate-200 dark:bg-white/5 rounded-lg text-[7px] font-black uppercase tracking-widest text-slate-500 border border-slate-300 dark:border-white/5">{exp.period}</span>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light italic leading-relaxed max-w-2xl">{exp.desc}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-7 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-white/5 rounded-[2.5rem] space-y-5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700"><Scale size={100} /></div>
                      <div className="flex items-center justify-between relative z-10">
                         <span className="text-[8px] font-black uppercase tracking-[0.4em] text-london-blue">Governance Registry</span>
                         <div className="w-1.5 h-1.5 rounded-full bg-london-blue animate-pulse" />
                      </div>
                      <div className="space-y-4 relative z-10">
                         <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            <span>DISPUTE_RECORD</span>
                            <span className="text-emerald-500">ZERO_CONFLICT</span>
                         </div>
                         <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            <span>AUDIT_ADJUDICATION</span>
                            <span className="text-slate-900 dark:text-white">CLEAR_PASS</span>
                         </div>
                         <div className="h-px bg-slate-200 dark:bg-white/5" />
                         <div className="flex items-center gap-2.5 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                            <CheckCircle2 size={10} /> Registry Adjudicated
                         </div>
                      </div>
                    </div>

                    {/* COMPLIANCE STACK */}
                    <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-6">
                       <div className="flex items-center gap-3">
                          <ShieldCheck size={14} className="text-london-blue" />
                          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Compliance Stack</span>
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">IR35 Status</span>
                             <span className="text-[10px] font-black italic text-emerald-500">{expert.ir35Status || 'Outside'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">HMRC Verified</span>
                             <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                                <CheckCircle2 size={10} />
                             </div>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest">Clearance</span>
                             <span className="text-[10px] font-black italic text-london-blue">{expert.securityClearance || 'SC'}</span>
                          </div>
                       </div>
                    </div>

                    {/* REGIONAL FOOTPRINT */}
                    <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2.5rem] space-y-6">
                       <div className="flex items-center gap-3">
                          <Globe2 size={14} className="text-london-blue" />
                          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Regional Footprint</span>
                       </div>
                       <div className="space-y-5">
                          <div className="space-y-2">
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-60">Markets</p>
                            <div className="flex flex-wrap gap-2">
                               {expert.regionalExpertise.map(region => (
                                 <span key={region} className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[9px] font-black italic text-slate-600 dark:text-slate-300 uppercase tracking-tighter">{region}</span>
                               ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 opacity-60">Languages</p>
                            <div className="flex flex-wrap gap-2">
                               {expert.languages.map(lang => (
                                 <span key={lang} className="px-2.5 py-1 border border-slate-200 dark:border-white/5 rounded-lg text-[9px] font-black italic text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{lang}</span>
                               ))}
                            </div>
                          </div>
                       </div>
                    </div>

                    <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2rem] space-y-5">
                       <div className="flex items-center gap-3">
                          <Monitor size={14} className="text-london-blue" />
                          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Specifications</span>
                       </div>
                       <div className="space-y-2.5">
                          {[
                            { label: 'Encryption Node', val: 'AES_256_L3' },
                            { label: 'Hardware Key', val: 'FIPS_140_2' },
                            { label: 'Network Pulse', val: 'UTC_London' }
                          ].map(item => (
                            <div key={item.label} className="flex justify-between text-[9px] font-mono tracking-widest">
                               <span className="text-slate-400 dark:text-slate-600">{item.label}</span>
                               <span className="text-slate-700 dark:text-slate-300">{item.val}</span>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="p-7 bg-slate-50 dark:bg-white/[0.01] border border-slate-100 dark:border-white/5 rounded-[2rem] space-y-5">
                       <div className="flex items-center gap-3 text-london-blue">
                          <Network size={14} />
                          <span className="text-[8px] font-black uppercase tracking-[0.4em]">Reach Pulse</span>
                       </div>
                       <div className="flex flex-col gap-3.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">SCALE_INDEX</span>
                            <span className="text-[10px] font-black text-slate-900 dark:text-white italic">88.4 / 100</span>
                          </div>
                          <div className="h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-london-blue shadow-[0_0_10px_#0052FF]" style={{ width: '88%' }} />
                          </div>
                       </div>
                    </div>

                    <div className="p-7 bg-slate-100 dark:bg-[#0D1117]/80 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2rem] space-y-5 shadow-2xl">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-london-blue">
                             <BookOpen size={14} />
                             <span className="text-[8px] font-black uppercase tracking-[0.4em]">Intel Library Pulse</span>
                          </div>
                       </div>
                       <div className="space-y-4">
                          {expert.publications.map((pub, i) => (
                            <div key={i} className="space-y-1.5 group cursor-pointer">
                               <h5 className="text-[10px] font-black italic uppercase text-slate-900 dark:text-white leading-tight group-hover:text-london-blue transition-colors">{pub.title}</h5>
                               <div className="flex items-center justify-between">
                                  <span className="text-[7.5px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">{pub.publisher}</span>
                                  <span className="text-[7.5px] font-black text-london-blue opacity-40">{pub.year}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* DEPLOYMENT TERMINAL (RIGHT RAIL) */}
        <div className="w-full lg:w-[400px] h-full bg-slate-50 dark:bg-[#09090B] border-l border-slate-200 dark:border-white/5 flex flex-col shadow-2xl z-[200]">
           {loading ? <TerminalSkeleton /> : (
             <>
               <div className="p-6 pb-2 space-y-4 shrink-0 border-b border-slate-100 dark:border-white/5">
                  <div className="flex justify-between items-center">
                     <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-london-blue/10 border border-london-blue/20 rounded-full shadow-lg shadow-blue-500/5">
                        <Zap size={12} className="text-london-blue animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-london-blue">SYNC_INIT</span>
                     </div>
                     <div className={`px-3 py-1.5 rounded-lg border ${currentStatus.bg} ${currentStatus.color} border-current/20 flex items-center gap-2 shadow-2xl ring-1 ring-white/5`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot} animate-pulse shadow-[0_0_12px_currentColor]`} />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">{currentStatus.label}</span>
                     </div>
                  </div>
                  
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none hero-font flex items-center gap-2">
                       MISSION <span className="text-london-blue">SYNC_AUTH.</span>
                     </h3>
                     <div className="flex items-center gap-3">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-700 italic">NODE: {expert.id.split('-')[0].toUpperCase()}_V4</span>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-white/5" />
                     </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-10">
                 <div className="min-h-full flex flex-col pt-4">
                   {currentBookingStep === 'modality' && (
                     <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col pb-6">
                        
                        <div className="p-6 bg-white dark:bg-[#131314] text-slate-900 dark:text-white rounded-[2.5rem] space-y-5 shadow-premium border border-slate-200 dark:border-white/5 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-6 opacity-[0.05] dark:opacity-[0.08] rotate-12 group-hover:scale-110 transition-transform duration-700">
                              <Flame size={80} />
                           </div>
                           <div className="flex items-center gap-3 relative z-10">
                              <AlertCircle size={14} className="text-london-blue animate-pulse" />
                              <span className="text-[9px] font-black uppercase tracking-[0.4em]">Tactical Emergency Sync</span>
                           </div>
                           <div className="space-y-3 relative z-10">
                              <button 
                                onClick={() => handleFastTrack('video')}
                                className="w-full p-4 bg-london-blue hover:brightness-125 text-white rounded-2xl flex items-center justify-between group/btn transition-all shadow-xl"
                              >
                                 <div className="flex flex-col items-start">
                                    <span className="text-[7px] font-black uppercase tracking-widest opacity-60">NEXT_VIDEO_SLOT</span>
                                    <span className="text-xs font-black italic uppercase tracking-tighter tabular-nums">{nextSlots.video.time} @ {nextSlots.video.label}</span>
                                 </div>
                                 <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                              </button>
                              <button 
                                onClick={() => handleFastTrack('in-person')}
                                className="w-full p-4 bg-slate-50 dark:bg-black/10 hover:bg-slate-100 dark:hover:bg-black/20 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-between group/btn transition-all text-slate-900 dark:text-white"
                              >
                                 <div className="flex flex-col items-start">
                                    <span className="text-[7px] font-black uppercase tracking-widest opacity-60">NEXT_HUB_SLOT</span>
                                    <span className="text-xs font-black italic uppercase tracking-tighter tabular-nums">{nextSlots.inPerson.time} @ {nextSlots.inPerson.label}</span>
                                 </div>
                                 <Building2 size={16} className="opacity-40" />
                              </button>
                           </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 px-1">
                            <div className="w-1 h-1 rounded-full bg-london-blue" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Standard Protocol</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                             <button onClick={() => setSelectedModality('video')} className={`p-5 rounded-[1.5rem] border-2 flex flex-col items-center gap-3 transition-all duration-700 relative overflow-hidden group ${selectedModality === 'video' ? 'bg-london-blue border-london-blue text-white shadow-3xl scale-[1.02]' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/40'}`}>
                                <Video size={20} strokeWidth={2.5} className={`${selectedModality === 'video' ? 'scale-110 shadow-2xl' : 'opacity-20'}`} />
                                <div className="text-center space-y-0.5">
                                   <span className="text-base font-black italic uppercase tracking-tighter block leading-none">VIRTUAL</span>
                                   <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${selectedModality === 'video' ? 'text-white/60' : 'text-slate-500 dark:text-slate-800'}`}>L3_AES_SYNC</span>
                                </div>
                             </button>
                             <button disabled={!expert.offersInPerson} onClick={() => setSelectedModality('in-person')} className={`p-5 rounded-[1.5rem] border-2 flex flex-col items-center gap-3 transition-all duration-700 relative overflow-hidden group ${selectedModality === 'in-person' ? 'bg-london-blue border-london-blue text-white shadow-3xl scale-[1.02]' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/40 disabled:opacity-5'}`}>
                                <Building2 size={20} strokeWidth={2.5} className={`${selectedModality === 'in-person' ? 'scale-110 shadow-2xl' : 'opacity-20'}`} />
                                <div className="text-center space-y-0.5">
                                   <span className="text-base font-black italic uppercase tracking-tighter block leading-none">CITY_HUB</span>
                                   <span className={`text-[7px] font-black uppercase tracking-[0.3em] ${selectedModality === 'in-person' ? 'text-white/60' : 'text-slate-500 dark:text-slate-800'}`}>ON-SITE</span>
                                </div>
                             </button>
                          </div>
                        </div>
                        <div className="p-6 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[1.5rem] space-y-3 shadow-inner">
                           <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 italic">Handshake Overview</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">Initialize a high-fidelity sync window with {expert.name.split(' ')[0]}. All sessions are recorded and archived for 30 days by default.</p>
                        </div>
                        <div className="mt-auto pt-6">
                           <button onClick={() => setCurrentBookingStep('schedule')} className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] hover:bg-london-blue hover:text-white transition-all flex items-center justify-center gap-3 group">INITIALIZE SYNC <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></button>
                        </div>
                     </div>
                   )}

                   {currentBookingStep === 'schedule' && (
                     <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 px-1">
                            <div className="w-1 h-1 rounded-full bg-london-blue" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">02_TEMPORAL_MATRIX</p>
                          </div>
                          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 px-1 no-scrollbar">
                            {dates.map((d, i) => (
                                <button key={i} onClick={() => setSelectedDate(d.id)} className={`flex-shrink-0 w-16 h-20 rounded-[1rem] border-2 flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden ${selectedDate === d.id ? 'bg-white dark:bg-white border-white text-black shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-5px_rgba(255,255,255,0.1)] z-10 scale-[1.05]' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/60'}`}>
                                  <span className={`text-[7px] font-black uppercase tracking-[0.2em] mb-0.5 ${selectedDate === d.id ? 'text-london-blue' : 'opacity-40'}`}>{d.label}</span>
                                  <span className="text-2xl font-black italic tracking-tighter tabular-nums leading-none">{d.day}</span>
                                  <span className={`text-[6px] font-bold uppercase tracking-widest mt-0.5 opacity-40 ${selectedDate === d.id ? 'text-slate-600' : ''}`}>{d.month}</span>
                                </button>
                            ))}
                          </div>
                        </div>
                        <div className={`flex-1 space-y-6 transition-all duration-1000 ${!selectedDate ? 'opacity-5 pointer-events-none' : 'opacity-100'}`}>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 px-2">
                              <Sun size={12} className="text-amber-500 animate-pulse" />
                              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Morning Blocks</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 px-1">
                              {amSlots.map(t => (
                                  <button key={t} onClick={() => toggleTime(t)} className={`py-3 rounded-[0.75rem] border-2 text-[11px] font-black italic tracking-tighter uppercase transition-all duration-300 ${selectedTimes.includes(t) ? 'bg-london-blue border-london-blue text-white shadow-2xl scale-[1.05]' : 'bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/50'}`}>{t}</button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 px-2">
                              <Moon size={12} className="text-london-blue animate-pulse" />
                              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Afternoon Blocks</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 px-1">
                              {pmSlots.map(t => (
                                  <button key={t} onClick={() => toggleTime(t)} className={`py-3 rounded-[0.75rem] border-2 text-[11px] font-black italic tracking-tighter uppercase transition-all duration-300 ${selectedTimes.includes(t) ? 'bg-london-blue border-london-blue text-white shadow-2xl scale-[1.05]' : 'bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/50'}`}>{t}</button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-auto pt-6 flex gap-3">
                           <button onClick={() => setCurrentBookingStep('modality')} className="w-14 h-14 rounded-[1rem] border-2 border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-xl"><ChevronLeft size={20} /></button>
                           <button onClick={() => setCurrentBookingStep('briefing')} disabled={selectedTimes.length === 0} className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[1rem] font-black text-[10px] uppercase tracking-[0.4em] disabled:opacity-5 transition-all hover:bg-london-blue hover:text-white flex items-center justify-center gap-3 shadow-2xl">CONFIGURE BRIEF <ArrowRight size={16} /></button>
                        </div>
                     </div>
                   )}

                   {currentBookingStep === 'briefing' && (
                     <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 px-1">
                            <div className="w-1 h-1 rounded-full bg-london-blue" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">03_INTEL_BRIEFING</p>
                          </div>
                          <div className="relative group">
                            <textarea value={briefing} onChange={(e) => setBriefing(e.target.value)} placeholder="Mission parameters (e.g. Scaling fintech audit...)" className="w-full h-56 bg-slate-100 dark:bg-white/[0.01] border-2 border-slate-200 dark:border-white/5 rounded-[1.5rem] p-6 text-base font-light italic outline-none focus:border-london-blue focus:bg-slate-50 dark:focus:bg-white/[0.03] transition-all resize-none text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800 shadow-inner leading-relaxed" />
                          </div>
                        </div>
                        <div className="p-6 bg-london-blue/5 border border-london-blue/20 rounded-[1.5rem] flex items-start gap-3 shadow-2xl">
                           <ShieldCheck size={16} className="text-london-blue shrink-0 mt-0.5" />
                           <p className="text-[10px] text-slate-500 dark:text-slate-400 font-light italic leading-relaxed">Briefings optimize node orientation prior to sync.</p>
                        </div>
                        <div className="mt-auto pt-6 flex gap-3">
                           <button onClick={() => setCurrentBookingStep('schedule')} className="w-14 h-14 rounded-[1rem] border-2 border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-xl"><ChevronLeft size={20} /></button>
                           <button onClick={() => setCurrentBookingStep('authorization')} disabled={!briefing.trim()} className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[1rem] font-black text-[10px] uppercase tracking-[0.4em] disabled:opacity-5 transition-all hover:bg-london-blue hover:text-white flex items-center justify-center gap-3 shadow-2xl">DEPLOY NODE <ArrowRight size={16} /></button>
                        </div>
                     </div>
                   )}

                   {currentBookingStep === 'authorization' && (
                     <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 px-1">
                            <div className="w-1 h-1 rounded-full bg-london-blue" />
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">04_CAPITAL_DEPLOYMENT</p>
                          </div>
                          <div className="p-6 bg-slate-100 dark:bg-[#0D1117] border-2 border-slate-200 dark:border-white/5 rounded-[2rem] space-y-6 shadow-premium relative overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                             <div className="flex justify-between items-end relative z-10">
                                <div className="space-y-1">
                                   <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600">MISSION_TOTAL</p>
                                   {paymentProtocol === 'fiat' ? (
                                     <p className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white tabular-nums leading-none hero-font">£{(selectedTimes.length * expert.hourlyRate * 1.1).toFixed(0)}</p>
                                   ) : (
                                     <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-black italic tracking-tighter text-london-blue tabular-nums leading-none hero-font">{(parseFloat(cryptoConversion) * 1.1).toFixed(4)}</p>
                                        <span className="text-[10px] font-black italic text-london-blue">{selectedCrypto}</span>
                                     </div>
                                   )}
                                </div>
                                <div className="w-12 h-12 bg-london-blue/10 border border-london-blue/20 rounded-xl flex items-center justify-center text-london-blue shadow-inner">
                                   <Verified size={24} />
                                </div>
                             </div>
                             <div className="h-px bg-slate-200 dark:bg-white/5 w-full shadow-inner" />
                             <div className="space-y-3 relative z-10">
                                <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-slate-500"><span>HANDSHAKE_CYCLES</span><span className="text-slate-900 dark:text-white">{selectedTimes.length} UNIT(S)</span></div>
                                <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em] text-slate-500"><span>PLATFORM_PROTOCOL (10%)</span><span className="text-london-blue">£{(selectedTimes.length * expert.hourlyRate * 0.1).toFixed(2)}</span></div>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-700 px-1">PROTOCOL_SELECT</p>
                             <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => setPaymentProtocol('fiat')} className={`py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${paymentProtocol === 'fiat' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-xl scale-[1.02]' : 'bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-slate-400 dark:hover:border-white/30'}`}>FIAT_NODE</button>
                                <button onClick={() => setPaymentProtocol('crypto')} className={`py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${paymentProtocol === 'crypto' ? 'bg-london-blue text-white border-london-blue shadow-3xl scale-[1.02]' : 'bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:border-london-blue/40'}`}>CRYPTO_SYNC</button>
                             </div>
                          </div>
                          {paymentProtocol === 'crypto' && (
                            <div className="grid grid-cols-3 gap-2 animate-in slide-in-from-top-4 duration-700">
                              {['BTC', 'ETH', 'USDC'].map(coin => (
                                 <button key={coin} onClick={() => setSelectedCrypto(coin as any)} className={`py-2.5 rounded-lg border-2 text-[9px] font-black uppercase transition-all duration-500 ${selectedCrypto === coin ? 'bg-london-blue/20 border-london-blue text-london-blue shadow-lg' : 'bg-slate-100 dark:bg-white/[0.01] border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-700 hover:text-slate-900 dark:hover:text-slate-400 hover:border-london-blue/20'}`}>{coin}</button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="mt-auto pt-6 flex flex-col gap-3">
                           <button onClick={handleAuthorize} className="w-full py-6 bg-london-blue text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.5em] shadow-xl hover:brightness-125 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4 group relative overflow-hidden"><span className="relative z-10">AUTHORIZE</span><Fingerprint size={20} className="relative z-10 group-hover:scale-110 transition-transform" /></button>
                           <button onClick={() => setCurrentBookingStep('modality')} className="w-full py-1 text-[8px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-800 hover:text-slate-900 dark:hover:text-white transition-all text-center">ABORT_MISSION_SYNC</button>
                        </div>
                     </div>
                   )}
                 </div>
               </div>

               <div className="shrink-0 bg-white/60 dark:bg-black/60 backdrop-blur-3xl border-t border-slate-200 dark:border-white/5 py-3 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2 opacity-30 group hover:opacity-100 transition-opacity"><Lock size={10} className="text-london-blue" /><span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">L3_READY</span></div>
                  <div className="flex items-center gap-2 opacity-30 group hover:opacity-100 transition-opacity">{paymentProtocol === 'fiat' ? <PoundSterling size={10} className="text-london-blue" /> : <Bitcoin size={10} className="text-london-blue" />}<span className="text-[7px] font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white">ESCROW_SYNC</span></div>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileView;
