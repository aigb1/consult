
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Bot, 
  ChevronRight, 
  Star, 
  Zap, 
  Heart, 
  ArrowUpRight, 
  Fingerprint, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Upload, 
  Mic, 
  Volume2, 
  Verified, 
  Radar, 
  Calendar,
  BadgeCheck
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { EXPERTS } from '../constants';
import { ViewState, Expert } from '../types';

interface AiMatchServiceProps {
  onNavigate: (view: ViewState) => void;
  onViewExpert: (expert: Expert) => void;
  onBookExpert: (expert: Expert) => void;
  isLoggedIn?: boolean;
}

type BriefModality = 'text' | 'file' | 'audio' | 'voice';

const AiMatchService: React.FC<AiMatchServiceProps> = ({ onNavigate, onViewExpert, onBookExpert, isLoggedIn = false }) => {
  const [step, setStep] = useState<'intake' | 'analyzing' | 'results'>('intake');
  const [modality, setModality] = useState<BriefModality>('text');
  const [problem, setProblem] = useState('');
  const [results, setResults] = useState<any>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [savedExperts, setSavedExperts] = useState<string[]>([]);

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (step === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      
      const logMessages = [
        "Initializing Neural Handshake...",
        "Accessing Registry Index L3...",
        "Parsing Strategic Vertical Data...",
        "Identifying Node Compatibility...",
        "Verifying Standing Index Scores...",
        "Synthesizing Optimal Matches...",
        "Authorization Handshake Secured."
      ];

      logMessages.forEach((msg, i) => {
        setTimeout(() => setLogs(prev => [...prev, msg]), i * 400);
      });

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleMatch = async () => {
    if (modality === 'text' && !problem.trim()) return;
    setStep('analyzing');
    setLogs([]);
    setAnalysisProgress(0);
    
    try {
      const data = await geminiService.matchExpert(problem || "Analyzed specialized brief input");
      setTimeout(() => {
        setResults(data);
        setStep('results');
      }, 3500);
    } catch (e) {
      setStep('intake');
    }
  };

  const handleImgError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedExperts(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const renderIntake = () => (
    <div className="max-w-6xl mx-auto space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="space-y-6 text-center">
        <div className="w-24 h-24 bg-london-blue/10 text-london-blue rounded-[38px] flex items-center justify-center mx-auto border-2 border-london-blue/20 shadow-2xl relative">
          <Sparkles size={48} className="animate-pulse" />
          <div className="absolute -inset-4 border border-london-blue/10 rounded-[48px] animate-[spin_10s_linear_infinite]" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight hero-font italic leading-[0.9] text-slate-900 dark:text-white uppercase">
          Intelligence <br/> <span className="brand-gradient-text">Matching.</span>
        </h1>
        <p className="text-2xl text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto italic leading-relaxed">
          Describe your objective. Our neural engine will synthesize the registry to deploy your perfect consultant node.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'text', icon: <FileText size={24} />, label: "Text Brief", desc: "Detailed requirements" },
          { id: 'file', icon: <Upload size={24} />, label: "Upload Node", desc: "PDF/DOCX Analysis" },
          { id: 'audio', icon: <Mic size={24} />, label: "Acoustic Note", desc: "Encrypted audio" },
          { id: 'voice', icon: <Volume2 size={24} />, label: "Voice Command", desc: "Direct dictation" }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setModality(opt.id as BriefModality)}
            className={`p-10 rounded-[3rem] border-2 flex flex-col items-center gap-5 transition-all duration-500 group relative overflow-hidden ${modality === opt.id ? 'bg-london-blue border-london-blue text-white shadow-3xl scale-[1.03]' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 text-slate-400 hover:border-london-blue/30 hover:bg-white dark:hover:bg-white/5'}`}
          >
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 ${modality === opt.id ? 'bg-white/20 text-white' : 'bg-london-blue/5 text-london-blue group-hover:bg-london-blue group-hover:text-white shadow-inner'}`}>
              {opt.icon}
            </div>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em]">{opt.label}</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${modality === opt.id ? 'text-white/60' : 'text-slate-500'}`}>{opt.desc}</p>
            </div>
            {modality === opt.id && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white animate-ping shadow-[0_0_12px_#fff]" />}
          </button>
        ))}
      </div>

      <div className="relative group animate-in zoom-in-98 duration-500">
        {modality === 'text' ? (
          <div className="relative">
             <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. I am a fintech founder looking to secure an EMI license in the UK and need an expert who has successfully navigated FCA audits for Series B startups..."
              className="w-full h-80 bg-slate-50 dark:bg-white/[0.02] border-2 border-slate-100 dark:border-white/5 rounded-[56px] p-16 text-2xl font-light italic outline-none focus:border-london-blue transition-all resize-none shadow-inner dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-800"
            />
            <div className="absolute bottom-10 right-10 pointer-events-none opacity-20">
               <Fingerprint size={120} />
            </div>
          </div>
        ) : (
          <div className="w-full h-80 bg-slate-50 dark:bg-white/[0.02] border-2 border-dashed border-slate-100 dark:border-white/10 rounded-[56px] flex flex-col items-center justify-center space-y-8 group/drop cursor-pointer hover:bg-white dark:hover:bg-white/5 transition-all">
            <div className="w-28 h-28 rounded-full bg-london-blue/5 border-2 border-london-blue/10 flex items-center justify-center text-london-blue group-hover/drop:scale-110 group-hover/drop:bg-london-blue group-hover/drop:text-white transition-all duration-700 shadow-xl">
              {modality === 'file' ? <Upload size={40} /> : modality === 'audio' ? <Mic size={40} /> : <Volume2 size={40} />}
            </div>
            <div className="text-center space-y-3">
              <p className="text-2xl font-black italic tracking-tighter uppercase dark:text-white leading-none">Ready for Ingestion.</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-500">Drop your {modality} node here or click to authorize</p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12">
           <div className="flex items-center gap-8 text-slate-400">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={20} className="text-london-blue" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">AES-256 SECURE</span>
              </div>
              <div className="w-px h-6 bg-slate-100 dark:bg-white/5" />
              <div className="flex items-center gap-3">
                 <Bot size={20} className="text-london-blue" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">NEURAL PARSE</span>
              </div>
           </div>
           <button
            onClick={handleMatch}
            disabled={modality === 'text' && !problem.trim()}
            className="px-20 py-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[2.5rem] font-black text-sm uppercase tracking-[0.5em] shadow-[0_30px_60px_-10px_rgba(0,82,255,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-5 disabled:opacity-20 group"
          >
            Authorize Match <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyzing = () => (
    <div className="h-[80vh] flex flex-col items-center justify-center space-y-16 animate-in fade-in duration-500 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <div className="w-[400px] h-[400px] border border-london-blue rounded-full animate-[ping_4s_infinite]" />
         <div className="w-[600px] h-[600px] border border-london-blue rounded-full animate-[ping_6s_infinite] delay-1000" />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-london-blue/20 blur-[140px] rounded-full animate-pulse scale-150" />
        <div className="w-48 h-48 rounded-[48px] border-2 border-london-blue/20 bg-london-blue/5 flex items-center justify-center relative z-10 shadow-3xl group">
           <Radar size={80} className="text-london-blue animate-[spin_3s_linear_infinite]" />
           <div className="absolute inset-0 border-t-2 border-london-blue rounded-[48px] animate-spin" />
        </div>
      </div>

      <div className="text-center space-y-6 max-w-lg relative z-10">
        <div className="space-y-2">
          <h2 className="text-5xl font-black tracking-tight hero-font italic text-slate-900 dark:text-white leading-[0.9] uppercase">Synthesizing <br/> Registry Nodes...</h2>
          <p className="text-[11px] font-black uppercase tracking-[0.6em] text-london-blue animate-pulse">Running High-Fidelity Analysis</p>
        </div>

        <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-london-blue shadow-[0_0_15px_#0052FF] transition-all duration-100 ease-linear" style={{ width: `${analysisProgress}%` }} />
        </div>

        <div className="w-full space-y-3 font-mono bg-slate-50 dark:bg-white/[0.02] p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 text-[10px] text-slate-500 uppercase tracking-widest text-left shadow-2xl">
            {logs.map((log, i) => (
              <p key={i} className="flex gap-4 animate-in slide-in-from-left duration-300"> 
                 <span className="text-emerald-500 font-black">[OK]</span> 
                 <span className="italic">{log}</span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="min-h-full bg-slate-50 dark:bg-gpt-dark-bg transition-colors duration-700 relative overflow-x-hidden pt-16">
        <div className="sticky top-0 z-[150] bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 mb-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="px-6 md:px-10 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="px-6 py-2 bg-london-blue text-white rounded-full text-[10px] font-black uppercase tracking-[0.5em] shadow-lg shadow-blue-500/20">
                  Neural Synthesis Complete
                </div>
                <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Node Sync Active</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStep('intake')}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 active:scale-95 transition-all shadow-xl"
                >
                  Modify Brief
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 md:px-10 space-y-16 pb-32">
          <div className="p-12 md:p-16 bg-white dark:bg-[#0D1117] rounded-[3.5rem] border border-slate-200 dark:border-white/10 shadow-premium relative overflow-hidden">
            <div className="absolute inset-0 gold-grid opacity-[0.05] pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white leading-[0.85] hero-font">
                IDENTIFIED <span className="text-london-blue">{results.matches.length}</span> <br/>
                OPTIMAL NODES.
              </h1>
              <p className="textxl md:text-2xl text-slate-500 dark:text-slate-400 font-light italic max-w-4xl leading-relaxed">
                {results.executiveSummary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {results.matches.map((match: any) => {
              const expert = EXPERTS.find(e => e.id === match.expertId);
              if (!expert) return null;

              return (
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
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0 opacity-90 group-hover:opacity-100" 
                        alt={expert.name} 
                      />
                    )}
                    
                    <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                      <div className="px-3 py-1.5 bg-london-blue text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2">
                        {match.matchScore}% Match
                      </div>
                    </div>
                    
                    <div className="absolute top-5 right-5 z-20">
                      <button onClick={(e) => toggleSave(e, expert.id)} className={`w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-500 ${savedExperts.includes(expert.id) ? 'bg-rose-500 border-rose-500 text-white' : 'bg-black/20 border-white/10 text-white hover:bg-white/20'}`}>
                        <Heart size={18} fill={savedExperts.includes(expert.id) ? "currentColor" : "none"} />
                      </button>
                    </div>

                    <div className="absolute bottom-5 inset-x-5 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="p-4 bg-white/95 dark:bg-black/90 backdrop-blur-2xl rounded-[1.5rem] border border-slate-200 dark:border-white/10 shadow-2xl space-y-3">
                        <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 shadow-2xl hover:bg-london-blue hover:text-white transition-all">
                          Open Dossier <ArrowUpRight size={12} />
                        </button>
                      </div>
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

                    <div className="p-5 bg-white dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-3xl space-y-3 shadow-inner group-hover:border-london-blue/20 transition-all">
                       <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed line-clamp-3 font-light">"{match.reasoning}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-baseline gap-1">
                         <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white">£{expert.hourlyRate}</span>
                         <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-60">/ Cycle</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-london-blue bg-london-blue/5 px-2 py-1 rounded-md">
                         <Calendar size={10} /> {match.suggestedTime}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-48 px-6 bg-white dark:bg-[#050505] transition-colors duration-700 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
      {step === 'intake' && renderIntake()}
      {step === 'analyzing' && renderAnalyzing()}
      {step === 'results' && renderResults()}
    </div>
  );
};

export default AiMatchService;
