
import React, { useState, useMemo, useEffect } from 'react';
import { EXPERTS, INDUSTRIES } from '../constants';
import { Expert, ViewState, NodeTier } from '../types';
import { 
  Star, 
  ShieldCheck, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal, 
  Verified, 
  Clock,
  MapPin, 
  X, 
  Video, 
  Building2, 
  Zap, 
  Filter, 
  Check, 
  Award, 
  CalendarDays, 
  Activity, 
  History, 
  TrendingUp, 
  Cpu, 
  Target, 
  Crown, 
  Shield, 
  Gem, 
  Fingerprint, 
  Sparkles, 
  PoundSterling, 
  BadgeCheck, 
  ChevronLeft,
  Scale,
  Landmark,
  Coins
} from 'lucide-react';
import { CardSkeleton } from './Skeleton';

interface ExpertBrowserProps {
  onViewExpert: (expert: Expert) => void;
  onStartCall: (expert: Expert) => void;
  onNavigate: (view: ViewState) => void;
  isLoggedIn: boolean;
  activeIndustry?: string;
  onIndustryChange?: (industry: string) => void;
  initialSearch?: string;
  isSidebarOpen?: boolean;
  priceRange: number;
  selectedTiers: NodeTier[];
  onlyOnline: boolean;
  modalityFilter: 'all' | 'video' | 'in-person';
  selectedHubs: string[];
  fastTrack: boolean;
  onPriceChange: (val: number) => void;
  onTiersChange: (tiers: NodeTier[]) => void;
  onOnlineToggle: () => void;
  onModalityChange: (val: 'all' | 'video' | 'in-person') => void;
  onHubsChange: (val: string[]) => void;
  onFastTrackToggle: () => void;
}

const ExpertBrowser: React.FC<ExpertBrowserProps> = ({ 
  onViewExpert, 
  onStartCall, 
  onNavigate, 
  isLoggedIn,
  activeIndustry = 'All',
  onIndustryChange,
  initialSearch = '',
  isSidebarOpen = true,
  priceRange,
  selectedTiers,
  onlyOnline,
  modalityFilter,
  selectedHubs,
  fastTrack,
  onPriceChange,
  onTiersChange,
  onOnlineToggle,
  onModalityChange,
  onHubsChange,
  onFastTrackToggle
}) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [activeSubSector, setActiveSubSector] = useState<string>('All');

  useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setActiveSubSector('All');
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeIndustry]);

  const filteredExperts = useMemo(() => {
    return EXPERTS.filter(e => {
      const matchSearch = searchQuery.trim() === '' || 
                          e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchIndustry = activeIndustry === 'All' || e.industry === activeIndustry;
      const matchSubSector = activeSubSector === 'All' || e.subSector === activeSubSector;
      const matchPrice = e.hourlyRate <= priceRange;
      const matchTier = selectedTiers.includes(e.tier || 3);
      const matchOnline = onlyOnline ? e.isOnline : true;
      const matchModality = modalityFilter === 'all' 
        ? true 
        : modalityFilter === 'video' 
          ? true 
          : e.offersInPerson === true;
      
      const matchHubs = selectedHubs.length === 0 
        ? true 
        : e.preferredHubs?.some(h => selectedHubs.includes(h));

      return matchSearch && matchIndustry && matchSubSector && matchPrice && matchTier && matchOnline && matchModality && matchHubs;
    });
  }, [searchQuery, activeIndustry, activeSubSector, priceRange, selectedTiers, onlyOnline, modalityFilter, selectedHubs]);

  const currentIndustryObj = useMemo(() => 
    INDUSTRIES.find(i => i.title === activeIndustry), 
  [activeIndustry]);

  const handleImgError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const toggleTier = (tier: NodeTier) => {
    if (selectedTiers.includes(tier)) {
      onTiersChange(selectedTiers.filter(t => t !== tier));
    } else {
      onTiersChange([...selectedTiers, tier]);
    }
  };

  const toggleHub = (hub: string) => {
    if (selectedHubs.includes(hub)) {
      onHubsChange(selectedHubs.filter(h => h !== hub));
    } else {
      onHubsChange([...selectedHubs, hub]);
    }
  };

  const getPriceColor = () => {
    if (priceRange > 1500) return 'text-amber-500';
    if (priceRange > 800) return 'text-london-blue';
    return 'text-emerald-500';
  };

  const getSliderHex = () => {
    if (priceRange > 1500) return '#f59e0b'; 
    if (priceRange > 800) return '#0052FF'; 
    return '#10b981'; 
  };

  const sliderPercentage = ((priceRange - 150) / (2000 - 150)) * 100;

  const gridClasses = isSidebarOpen 
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8";

  const densityClasses = !isSidebarOpen ? "scale-[0.98] origin-top" : "";

  const optionBase = "rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group";
  const optionUnselected = "bg-slate-100 dark:bg-white/[0.03] border-slate-100 dark:border-white/5 text-slate-400 dark:text-slate-600 hover:border-london-blue/30";
  const optionSelected = "bg-london-blue border-london-blue text-white shadow-[0_15px_30px_rgba(0,82,255,0.3)] scale-[1.02] z-10";

  const tierOptions = [
    { id: 1, label: 'SOVEREIGN', icon: <Crown size={16} /> },
    { id: 2, label: 'PRIME', icon: <Shield size={16} /> },
    { id: 3, label: 'CORE', icon: <Cpu size={16} /> }
  ];

  const seniorityOptions = [
    { id: 1, icon: <Award size={16} />, label: 'Principal' },
    { id: 2, icon: <Target size={16} />, label: 'Lead' },
    { id: 3, icon: <History size={16} />, label: 'Advisor' }
  ];

  const locationHubs = [
    { id: 'Mayfair Node', icon: <Gem size={14} /> },
    { id: 'The City Hub', icon: <Landmark size={14} /> },
    { id: 'Shoreditch Labs', icon: <Zap size={14} /> },
    { id: 'Canary Wharf Node', icon: <Building2 size={14} /> },
    { id: 'Westminster Node', icon: <Scale size={14} /> }
  ];

  return (
    <div className="min-h-full bg-slate-50 dark:bg-gpt-dark-bg transition-colors duration-700 relative flex flex-col">
      
      <div className="flex-none sticky top-0 z-[150] bg-white/80 dark:bg-[#050505]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-3 md:py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {loading ? 'SYNCING...' : `${filteredExperts.length} Nodes Active`}
                </span>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 max-w-2xl">
              <div className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 flex items-center gap-4 focus-within:border-london-blue/40 transition-all group shadow-sm">
                <Search size={14} className="text-slate-400 dark:text-slate-500 group-focus-within:text-london-blue" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  placeholder="Neural search registry..." 
                  className="bg-transparent border-none p-0 w-full text-[13px] outline-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-700 italic font-medium" 
                />
              </div>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-3 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] bg-london-blue/5 text-london-blue border border-london-blue/10 hover:bg-london-blue hover:text-white transition-all active:scale-95"
              >
                <SlidersHorizontal size={14} /> Refine
              </button>
            </div>
          </div>

          <div className="pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar">
             {activeIndustry === 'All' ? (
               <>
                <button 
                  onClick={() => onIndustryChange?.('All')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeIndustry === 'All' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-sm' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20'}`}
                >
                  All Nodes
                </button>
                {INDUSTRIES.map(ind => (
                  <button 
                    key={ind.id}
                    onClick={() => onIndustryChange?.(ind.title)}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeIndustry === ind.title ? 'bg-london-blue text-white border-london-blue shadow-md' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20'}`}
                  >
                    {ind.title}
                  </button>
                ))}
               </>
             ) : (
               <>
                 <button 
                  onClick={() => onIndustryChange?.('All')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group mr-2"
                 >
                   <ChevronLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" /> Back
                 </button>
                 
                 <button 
                  onClick={() => setActiveSubSector('All')}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeSubSector === 'All' ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-sm' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20'}`}
                 >
                   {activeIndustry} (All)
                 </button>

                 {currentIndustryObj?.subSectors.map(sub => (
                   <button 
                    key={sub}
                    onClick={() => setActiveSubSector(sub)}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeSubSector === sub ? 'bg-london-blue text-white border-london-blue shadow-md' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20'}`}
                   >
                     {sub}
                   </button>
                 ))}
               </>
             )}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[600] transition-all duration-500 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" 
          onClick={() => setIsDrawerOpen(false)} 
        />
        
        <aside className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-white dark:bg-[#09090b] border-l border-slate-200 dark:border-white/10 shadow-premium flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-24 px-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-london-blue" />
                <h3 className="text-xl font-black italic tracking-tighter uppercase dark:text-white leading-none">Refinement.</h3>
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Protocol Parameters</p>
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide px-8 py-10 space-y-12">
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                <Activity size={12} className="text-london-blue" /> 1. Deployment Modality
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => onModalityChange(modalityFilter === 'video' ? 'all' : 'video')}
                  className={`${optionBase} p-6 ${modalityFilter === 'video' ? optionSelected : optionUnselected}`}
                >
                  <Video size={20} strokeWidth={2} />
                  <span className="text-[8px] font-black uppercase tracking-widest">Video Node</span>
                </button>
                <button 
                  onClick={() => onModalityChange(modalityFilter === 'in-person' ? 'all' : 'in-person')}
                  className={`${optionBase} p-6 ${modalityFilter === 'in-person' ? optionSelected : optionUnselected}`}
                >
                  <Building2 size={20} strokeWidth={2} />
                  <span className="text-[8px] font-black uppercase tracking-widest">In-Person Hub</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                <Gem size={12} className="text-london-blue" /> 2. Seniority Index
              </p>
              <div className="grid grid-cols-3 gap-2">
                {seniorityOptions.map(opt => {
                  const isActive = selectedTiers.length === 1 && selectedTiers[0] === opt.id;
                  return (
                    <button 
                      key={opt.id}
                      onClick={() => onTiersChange([opt.id as NodeTier])}
                      className={`${optionBase} py-5 ${isActive ? optionSelected : optionUnselected}`}
                    >
                      {opt.icon}
                      <span className="text-[8px] font-black uppercase tracking-widest">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                <MapPin size={12} className="text-london-blue" /> 3. Location Hubs
              </p>
              <div className="grid grid-cols-2 gap-2">
                {locationHubs.map(hub => {
                  const isActive = selectedHubs.includes(hub.id);
                  return (
                    <button 
                      key={hub.id}
                      onClick={() => toggleHub(hub.id)}
                      className={`${optionBase} px-4 py-4 ${isActive ? optionSelected : optionUnselected} flex-row justify-start items-center gap-3`}
                    >
                      <span className={`shrink-0 transition-colors ${isActive ? 'text-white' : 'text-london-blue opacity-60'}`}>
                        {hub.icon}
                      </span>
                      <span className="truncate uppercase text-[9px] font-black italic tracking-tighter flex-1 text-left">{hub.id}</span>
                      {isActive && <Check size={12} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                <ShieldCheck size={12} className="text-london-blue" /> 4. Registry Node Tier
              </p>
              <div className="grid grid-cols-3 gap-2">
                {tierOptions.map(t => {
                   const isActive = selectedTiers.includes(t.id as NodeTier);
                   return (
                     <button 
                       key={t.id}
                       onClick={() => toggleTier(t.id as NodeTier)}
                       className={`${optionBase} py-5 ${isActive ? optionSelected : optionUnselected}`}
                     >
                       {t.icon}
                       <span className="text-[10px] font-black italic">T{t.id}</span>
                       <span className="text-[7px] font-black uppercase tracking-widest opacity-60">{t.label}</span>
                     </button>
                   );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end px-1">
                 <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 flex items-center gap-2">
                   <PoundSterling size={12} className="text-london-blue" /> 5. Yield Threshold
                 </p>
                 <div className="text-right">
                    <span className={`text-2xl font-black italic tracking-tighter tabular-nums leading-none transition-colors duration-500 ${getPriceColor()}`}>£{priceRange}</span>
                    <span className="text-[8px] block font-bold text-slate-400 uppercase tracking-widest mt-0.5">MAX RATE</span>
                 </div>
              </div>
              <div className="px-1 group">
                <input 
                  type="range" min="150" max="2000" step="50" 
                  value={priceRange} onChange={e => onPriceChange(parseInt(e.target.value))}
                  style={{
                    background: `linear-gradient(to right, ${getSliderHex()} 0%, ${getSliderHex()} ${sliderPercentage}%, rgba(226, 232, 240, 0.2) ${sliderPercentage}%, rgba(226, 232, 240, 0.2) 100%)`
                  }}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer transition-all duration-300 hover:h-2 accent-london-blue dark:accent-white" 
                />
                <div className="flex justify-between mt-3 text-[8px] font-black uppercase tracking-widest text-slate-400">
                   <span>£150</span>
                   <span className="flex items-center gap-1"><Sparkles size={8} className="text-amber-500" /> £2,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-white/50 dark:bg-[#09090b] space-y-4 shrink-0">
             <button 
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-6 bg-london-blue text-white rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
             >
                Apply Protocol Sync <Check size={18} />
             </button>
             <button 
              onClick={() => {
                onPriceChange(2000);
                onTiersChange([1,2,3]);
                onModalityChange('all');
                onHubsChange([]);
                if (onlyOnline) onOnlineToggle();
                if (fastTrack) onFastTrackToggle();
                setActiveSubSector('All');
              }}
              className="w-full py-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
             >
               Purge Parameters
             </button>
          </div>
        </aside>
      </div>

      <div className={`flex-1 max-w-[1800px] mx-auto p-6 md:p-10 pb-32 relative ${densityClasses}`}>
        {loading ? (
          <div className={gridClasses}>
            {[...Array(isSidebarOpen ? 8 : 10)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredExperts.length > 0 ? (
          <div className={gridClasses}>
            {filteredExperts.map(expert => (
              <div 
                key={expert.id} 
                onClick={() => onViewExpert(expert)} 
                className="group cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-5 bg-slate-200 dark:bg-[#020203] border border-slate-200 dark:border-white/5 shadow-sm group-hover:shadow-premium group-hover:border-london-blue/30 transition-all duration-700">
                  {imgErrors[expert.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-[#0D1117] text-slate-400 dark:text-slate-500 font-black text-6xl italic select-none">
                      {getInitials(expert.name)}
                    </div>
                  ) : (
                    <img 
                      src={expert.imageUrl} 
                      onError={() => handleImgError(expert.id)}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0 opacity-90 group-hover:opacity-100" 
                      alt={expert.name} 
                    />
                  )}
                  
                  <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                    <div className="px-3 py-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-full text-[8px] font-black text-slate-900 dark:text-white border border-white/20 dark:border-white/10 flex items-center gap-2 uppercase tracking-widest shadow-2xl">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        expert.availabilityStatus === 'High Demand' ? 'bg-london-blue shadow-[0_0_10px_#0052FF]' : 
                        expert.availabilityStatus === 'Waitlist' ? 'bg-slate-500' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                      } ${expert.availabilityStatus !== 'Waitlist' ? 'animate-pulse' : ''}`} /> 
                      {expert.availabilityStatus === 'High Demand' ? 'IN SESSION' : 
                       expert.availabilityStatus === 'Waitlist' ? 'UNAVAILABLE' : 'AVAILABLE'}
                    </div>
                    <div className="px-3 py-1.5 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-full text-[8px] font-black text-slate-900 dark:text-white border border-white/10 dark:border-white/5 flex items-center gap-2 uppercase tracking-widest shadow-2xl w-fit">
                      <Video size={10} className="text-london-blue" /> Video Node
                    </div>
                    {expert.offersInPerson && (
                      <div className="px-3 py-1.5 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-full text-[8px] font-black text-slate-900 dark:text-white border border-white/10 dark:border-white/5 flex items-center gap-2 uppercase tracking-widest shadow-2xl w-fit">
                        <MapPin size={10} className="text-london-blue" /> In Person Node
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-5 right-5 z-20">
                    <div className={`px-3 py-1.5 backdrop-blur-xl rounded-full text-[8px] font-black text-white flex items-center justify-center uppercase tracking-widest shadow-2xl ${expert.tier === 1 ? 'bg-gold-accent/80' : 'bg-london-blue/80'}`}>
                       <ShieldCheck size={10} /> T{expert.tier}
                    </div>
                  </div>

                  <div className="absolute bottom-6 inset-x-6 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full py-4 bg-white/95 dark:bg-[#0A0A0B]/95 backdrop-blur-3xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-full font-black text-[7px] xl:text-[8px] 2xl:text-[9px] uppercase tracking-[0.4em] flex items-center justify-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:bg-london-blue hover:text-white hover:border-london-blue transition-all group/btn ring-1 ring-white/10">
                      INITIALIZE NODE <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="space-y-4 px-1">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 overflow-hidden flex-1">
                       <h4 className="text-lg font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-none truncate group-hover:text-london-blue transition-colors">{expert.name}</h4>
                       <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">{expert.title}</p>
                    </div>
                    <BadgeCheck size={18} className="text-london-blue shrink-0 ml-4 mt-0.5" />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-baseline gap-1">
                       <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">£{expert.hourlyRate}</span>
                       <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">/ Cycle</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500/80">
                       <Clock size={10} /> Ready
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center space-y-10">
             <div className="relative">
                <div className="absolute inset-0 bg-london-blue/5 blur-[100px] rounded-full animate-pulse" />
                <div className="w-24 h-24 rounded-[32px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-300 dark:text-slate-700 relative z-10">
                   <Search size={40} strokeWidth={1.5} />
                </div>
             </div>
             <div className="text-center space-y-3">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">No Nodes Identified.</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">Neural Sync Failed: Parameter Mismatch</p>
             </div>
             <button onClick={() => { onIndustryChange?.('All'); setActiveSubSector('All'); }} className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-xl">Purge Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertBrowser;
