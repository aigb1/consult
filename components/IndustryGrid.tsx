
import React from 'react';
import { INDUSTRIES, ICON_MAP } from '../constants';
import { ChevronRight, MoveRight } from 'lucide-react';

interface IndustryGridProps {
  onCategorySelect?: (category: string) => void;
}

const IndustryGrid: React.FC<IndustryGridProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-24 bg-white dark:bg-[#050505] transition-colors border-t border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white leading-none hero-font">Registry <br/><span className="text-slate-300 dark:text-slate-800">Verticals.</span></h2>
            <p className="text-slate-500 font-light italic leading-relaxed text-lg max-w-sm">
              Curated intelligence nodes segmented by strategic market verticals.
            </p>
          </div>
          <button 
            onClick={() => onCategorySelect?.('All')}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-london-blue hover:gap-5 transition-all group"
          >
            View Full Index <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/5 overflow-hidden rounded-[2.5rem]">
          {INDUSTRIES.map((ind) => (
            <div 
              key={ind.id} 
              onClick={() => onCategorySelect?.(ind.title)}
              className="group bg-white dark:bg-[#0D0D0D] p-10 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all cursor-pointer relative flex flex-col justify-between h-[320px]"
            >
              <div>
                <div className="text-london-blue mb-8 w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-london-blue group-hover:text-white transition-all duration-500 shadow-sm">
                  {ICON_MAP[ind.icon]}
                </div>
                <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-london-blue transition-colors">{ind.title}</h3>
                <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed line-clamp-3 font-light italic">{ind.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-6">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700">Protocol: V4_{ind.id.toUpperCase()}</span>
                <ChevronRight size={16} className="text-slate-200 dark:text-slate-800 group-hover:text-london-blue group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryGrid;
