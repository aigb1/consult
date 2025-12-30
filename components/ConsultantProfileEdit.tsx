
import React, { useState } from 'react';
// Added motion and AnimatePresence imports to fix the missing name errors
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Save, 
  X, 
  ShieldCheck, 
  Zap, 
  Globe, 
  FileText, 
  Code2, 
  Award, 
  Fingerprint,
  Loader2,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Landmark,
  Target
} from 'lucide-react';
import { Expert } from '../types';

interface ConsultantProfileEditProps {
  expert: Expert;
  onSave: (updatedExpert: Expert) => void;
  onCancel: () => void;
}

const ConsultantProfileEdit: React.FC<ConsultantProfileEditProps> = ({ expert, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Expert>(expert);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate registry handshake
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        onSave(formData);
        setShowSuccess(false);
      }, 1500);
    }, 2000);
  };

  const updateField = (field: keyof Expert, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-full bg-white dark:bg-[#050505] p-6 md:p-12 animate-in fade-in duration-700 relative overflow-hidden font-sans">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-100 dark:border-white/5 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-london-blue/10 border border-london-blue/20 rounded-full">
              <Fingerprint size={14} className="text-london-blue" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-london-blue">Profile Synchronization</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase hero-font dark:text-white leading-none">
              Edit <span className="text-london-blue">Node.</span>
            </h1>
            <p className="text-lg text-slate-500 font-light italic leading-relaxed max-w-xl">
              Modify your specialized intelligence parameters within the Sovereign Registry.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={onCancel} className="px-8 py-4 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">Cancel</button>
            <button onClick={handleSave} disabled={isSaving} className="px-10 py-4 bg-london-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-3">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Authorize Sync
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Identity Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3rem] space-y-8">
              <div className="flex flex-col items-center gap-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-london-blue/10 border border-london-blue/20 flex items-center justify-center text-london-blue font-black italic text-4xl shadow-inner group cursor-pointer hover:border-london-blue transition-all">
                  {formData.name[0]}
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Registry ID</p>
                  <p className="text-xs font-mono font-bold text-slate-500">{formData.id.toUpperCase()}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Authorized Name</label>
                  <input 
                    type="text" value={formData.name} onChange={e => updateField('name', e.target.value)}
                    className="w-full h-14 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-2xl px-5 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Principal Node Title</label>
                  <input 
                    type="text" value={formData.title} onChange={e => updateField('title', e.target.value)}
                    className="w-full h-14 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-2xl px-5 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Vertical Sector</label>
                  <select 
                    value={formData.industry} onChange={e => updateField('industry', e.target.value)}
                    className="w-full h-14 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-2xl px-5 font-bold italic outline-none focus:border-london-blue transition-all dark:text-white appearance-none"
                  >
                    <option>Finance & Fintech</option>
                    <option>AI & Digital Transformation</option>
                    <option>Legal & Compliance</option>
                    <option>Cyber & Security</option>
                    <option>Marketing & Strategy</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-8 bg-london-blue/5 border border-london-blue/10 rounded-[2.5rem] space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-london-blue" />
                <span className="text-[10px] font-black uppercase tracking-widest text-london-blue">Verification Standing</span>
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed font-light">
                Identity and pedigree verified for L3 deployment. Significant profile changes trigger a 24-hour adjudication window.
              </p>
            </div>
          </div>

          {/* Configuration Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[3.5rem] space-y-10">
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-london-blue/10 flex items-center justify-center text-london-blue">
                      <Target size={20} />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase dark:text-white">Dossier parameters</h3>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Professional Briefing (Bio)</label>
                    <textarea 
                      value={formData.description} onChange={e => updateField('description', e.target.value)}
                      className="w-full h-40 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-3xl p-6 font-light italic text-sm outline-none focus:border-london-blue transition-all resize-none dark:text-white leading-relaxed"
                    />
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Yield Configuration (£/Cycle)</label>
                       <div className="p-6 bg-white dark:bg-black rounded-3xl border-2 border-slate-100 dark:border-white/5 space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-3xl font-black italic tracking-tighter text-london-blue">£{formData.hourlyRate}</span>
                            <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Market Index Average: £340</span>
                          </div>
                          <input 
                            type="range" min="150" max="2000" step="10"
                            value={formData.hourlyRate} onChange={e => updateField('hourlyRate', parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full appearance-none accent-london-blue cursor-pointer"
                          />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Tech Intelligence Stack</label>
                       <div className="p-6 bg-white dark:bg-black rounded-3xl border-2 border-slate-100 dark:border-white/5 flex flex-wrap gap-2">
                          {formData.techStack.map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-lg text-[9px] font-black italic uppercase text-slate-500 border border-slate-100 dark:border-white/5">{tech}</span>
                          ))}
                          <button className="px-3 py-1.5 border border-dashed border-slate-200 dark:border-white/10 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:border-london-blue hover:text-london-blue transition-all">+ Add Node</button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-white/5 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-london-blue/10 flex items-center justify-center text-london-blue">
                      <Globe size={20} />
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase dark:text-white">Regional footprint</h3>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Market Reach</label>
                       <div className="space-y-2">
                          {formData.regionalExpertise.map((reg, i) => (
                            <div key={i} className="flex gap-2">
                               <input 
                                type="text" value={reg} 
                                className="flex-1 h-12 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-xl px-4 font-bold italic text-xs outline-none focus:border-london-blue transition-all dark:text-white"
                               />
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Language Protocols</label>
                       <div className="space-y-2">
                          {formData.languages.map((lang, i) => (
                            <div key={i} className="flex gap-2">
                               <input 
                                type="text" value={lang} 
                                className="flex-1 h-12 bg-white dark:bg-black border-2 border-slate-100 dark:border-white/5 rounded-xl px-4 font-bold italic text-xs outline-none focus:border-london-blue transition-all dark:text-white"
                               />
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8"
          >
             <div className="relative">
                <div className="absolute inset-0 bg-london-blue/20 blur-[100px] rounded-full animate-pulse" />
                <div className="w-32 h-32 rounded-[2.5rem] border-4 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-emerald-500 relative z-10 shadow-2xl">
                   <CheckCircle2 size={64} className="animate-in zoom-in duration-500" />
                </div>
             </div>
             <div className="text-center space-y-3">
                <h2 className="text-5xl font-black italic tracking-tighter uppercase dark:text-white leading-none hero-font">Registry Sync <br/><span className="text-emerald-500">Authorized.</span></h2>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 animate-pulse">Updating Sovereign Database Node...</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConsultantProfileEdit;
