
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, FileText, Scale, Landmark, ChevronRight, Download } from 'lucide-react';

interface Props {
  type: 'PRIVACY' | 'TERMS' | 'ARBITRATION' | 'HMRC';
  onBack: () => void;
}

const CONTENT = {
  PRIVACY: {
    title: "Privacy Protocol",
    subtitle: "End-to-end data stewardship standards.",
    icon: <ShieldCheck className="text-london-blue" />,
    text: "At Consultancy.london, we treat data as a high-value asset. Our protocol ensures that all user identities are obfuscated until a session is authorized. Video calls utilize L3-AES encryption, and all metadata is scrubbed after a 7-day compliance window unless manually archived by the Client Executive."
  },
  TERMS: {
    title: "Terms of Use",
    subtitle: "Registry governance and consultant agreement.",
    icon: <FileText className="text-london-blue" />,
    text: "Engagement via this registry constitutes a binding agreement for fractional consultancy. Consultants are independent entities. The platform acts as the secure escrow and communication node. Bypassing the platform for payments results in immediate node termination to maintain network integrity."
  },
  ARBITRATION: {
    title: "Arbitration Protocol",
    subtitle: "Resolution framework for City engagements.",
    icon: <Scale className="text-london-blue" />,
    text: "In the rare event of a deployment failure, the platform initializes a 72-hour arbitration window. Independent adjudicators from our legal registry review the session recording and briefing documents to determine capital reallocation or refund status."
  },
  HMRC: {
    title: "HMRC Compliance",
    subtitle: "Tax residency and reporting standards.",
    icon: <Landmark className="text-london-blue" />,
    text: "All consultants on the registry are verified for UK tax residency or IR35 compliance where applicable. VAT is automatically calculated based on the client's registered node location. Invoices are generated as HMRC-compliant documents immediately following session authorization."
  }
};

const LegalPage: React.FC<Props> = ({ type, onBack }) => {
  const content = CONTENT[type];
  
  return (
    <div className="min-h-screen pt-12 md:pt-24 pb-48 px-6 bg-white dark:bg-gpt-dark-bg transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-20"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Return to Terminal
        </button>

        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 rounded-[28px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-3xl shadow-sm">
              {content.icon}
            </div>
            <div className="space-y-1">
              <h1 className="text-5xl font-bold tracking-tight hero-font italic text-slate-900 dark:text-white">
                {content.title}
              </h1>
              <p className="text-lg text-slate-500 font-light italic leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-12 md:p-16 bg-slate-50 dark:bg-white/[0.02] rounded-[3.5rem] border border-slate-100 dark:border-white/5 relative overflow-hidden shadow-sm"
          >
             <div className="space-y-10 relative z-10">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b border-slate-200 dark:border-white/5 pb-6">
                  <span>Registry Version: 4.2.1_S</span>
                  <span>Handshake Secured</span>
                </div>
                
                <p className="text-2xl text-slate-800 dark:text-slate-200 leading-relaxed font-light italic hero-font">
                  {content.text}
                </p>

                <div className="space-y-6 pt-10">
                  <h4 className="text-[10px] font-black tracking-widest text-slate-900 dark:text-white uppercase opacity-40">Operational Provisions</h4>
                  <ul className="space-y-6 list-none p-0">
                    {[
                      "End-to-End Encryption protocol LDN-X42 established for all registry data.",
                      "Independent adjudication node active for performance verification.",
                      "Fractional yield settlement secured via Tier-1 escrow protocols."
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 items-start text-base text-slate-500 dark:text-slate-400 font-light italic">
                        <ChevronRight size={18} className="text-london-blue shrink-0 mt-1" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row gap-4">
                   <button className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 transition-all">
                      <Download size={16} /> Export Protocol Dossier (PDF)
                   </button>
                   <button className="px-8 py-5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                      Legal Sync Channel
                   </button>
                </div>
             </div>
          </motion.div>
        </div>

        <div className="text-center pt-20 border-t border-slate-100 dark:border-white/5">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
             Consultancy.london Protocol © MMXXVI
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPage;
