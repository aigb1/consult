
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Video, 
  Calendar, 
  ChevronRight, 
  Zap, 
  FileText, 
  Clock, 
  Download, 
  UserPlus, 
  ChevronLeft,
  X,
  Plus
} from 'lucide-react';
import { EXPERTS } from '../constants';
import { StatCardSkeleton, TableRowSkeleton, CardSkeleton } from './Skeleton';

interface Props {
  onLogout: () => void;
  onBrowse: () => void;
  onStartCall: () => void;
}

const DashboardUser: React.FC<Props> = ({ onLogout, onBrowse, onStartCall }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sessions' | 'payments' | 'registry'>('sessions');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const upcomingReservations = [
    { 
      expert: 'Alistair Sterling', 
      date: 'May 22, 2024', 
      time: '14:00 GMT', 
      status: 'Ready',
      active: true,
      id: 'S-992'
    }
  ];

  const handleImgError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="relative min-h-screen pt-16 pb-48 max-w-7xl mx-auto px-6 md:px-12 bg-white dark:bg-[#0D1117] transition-colors duration-500">
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Account <span className="text-slate-400 italic">Settings.</span></h1>
          <p className="text-lg text-slate-500 font-medium">Manage your elite consultancy deployments and treasury.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onLogout}
            className="px-8 py-3.5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
          >
            Sign Out
          </button>
          <button 
            onClick={onBrowse}
            className="px-8 py-3.5 bg-london-blue text-white rounded-xl text-sm font-bold shadow-xl hover:brightness-110 transition-all"
          >
            Deploy Expert
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-12 border-b border-slate-100 dark:border-white/5 mb-12">
        {['sessions', 'payments', 'registry'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 text-sm font-bold tracking-tight capitalize relative transition-all ${
              activeTab === tab ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 dark:bg-white" />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-12 min-h-[400px]">
        {activeTab === 'sessions' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold tracking-tight">Upcoming Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                [...Array(2)].map((_, i) => <StatCardSkeleton key={i} />)
              ) : (
                <>
                  {upcomingReservations.map(res => (
                    <div key={res.id} className="p-8 border border-slate-200 dark:border-white/10 rounded-[32px] space-y-8 group hover:shadow-xl transition-all">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 rounded-2xl bg-london-blue flex items-center justify-center font-bold text-xl text-white">
                          {res.expert[0]}
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                          {res.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight">{res.expert}</h3>
                        <p className="text-slate-500 text-sm font-medium">{res.date} • {res.time}</p>
                      </div>
                      <button 
                        onClick={onStartCall}
                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
                      >
                        Join Session Node
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={onBrowse}
                    className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] flex flex-col items-center justify-center text-center space-y-4 hover:border-slate-900 dark:hover:border-white transition-all group"
                  >
                    <Plus size={32} className="text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    <span className="text-sm font-bold text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Book a new expert</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-3 gap-8">
               {loading ? (
                 [...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)
               ) : (
                 <>
                   <div className="p-10 bg-slate-900 dark:bg-white text-white dark:text-black rounded-[40px] space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Treasury Balance</p>
                      <p className="text-5xl font-bold tracking-tighter italic">£1,450</p>
                      <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-london-blue">
                        <ShieldCheck size={14} /> Protocol Secure
                      </div>
                   </div>
                   <div className="p-10 border border-slate-200 dark:border-white/10 rounded-[40px] space-y-4 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Deployments</p>
                      <p className="text-4xl font-bold">12 Sessions</p>
                   </div>
                   <div className="p-10 border border-slate-200 dark:border-white/10 rounded-[40px] space-y-4 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified VAT Nodes</p>
                      <p className="text-4xl font-bold">UK Core</p>
                   </div>
                 </>
               )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Recent Transactions</h2>
              {loading ? (
                [...Array(3)].map((_, i) => <TableRowSkeleton key={i} />)
              ) : (
                ['INV_X_1204', 'INV_X_1198', 'INV_X_1182'].map((inv, i) => (
                  <div key={i} className="flex items-center justify-between p-8 border border-slate-100 dark:border-white/5 rounded-3xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                     <div className="flex items-center gap-6">
                       <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
                         <FileText size={20} />
                       </div>
                       <div>
                         <p className="text-lg font-bold">{inv}</p>
                         <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Paid on May {20 - i}, 2024</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-8">
                       <span className="text-lg font-bold">£250.00</span>
                       <Download size={20} className="text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors" />
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold tracking-tight">Your Trusted Advisors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
              ) : (
                EXPERTS.slice(0, 4).map(expert => (
                  <div key={expert.id} className="p-6 border border-slate-100 dark:border-white/5 rounded-3xl space-y-6 group hover:shadow-lg transition-all text-center">
                    <div className="w-20 h-20 rounded-full mx-auto overflow-hidden bg-london-blue border border-slate-100 dark:border-white/10 flex items-center justify-center">
                      {imgErrors[expert.id] ? (
                        <span className="text-white font-black text-2xl uppercase select-none">{getInitials(expert.name)}</span>
                      ) : (
                        <img 
                          src={expert.imageUrl} 
                          onError={() => handleImgError(expert.id)}
                          className="w-full h-full object-cover" 
                          alt={expert.name}
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold">{expert.name}</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">{expert.title}</p>
                    </div>
                    <button onClick={onBrowse} className="w-full py-3 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all">
                      Quick Book
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
