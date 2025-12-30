
import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  ScreenShare, 
  MessageSquare, 
  Users, 
  Settings, 
  Maximize2, 
  Shield, 
  MoreHorizontal,
  Loader2,
  Terminal,
  Zap,
  Activity,
  Lock,
  Wifi,
  AlertTriangle,
  RefreshCw,
  Timer
} from 'lucide-react';
import { Expert } from '../types';

interface Props {
  expert: Expert;
  onEndCall: () => void;
}

const VideoCallView: React.FC<Props> = ({ expert, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [handshakeStep, setHandshakeStep] = useState(0);
  const [isHandshakeComplete, setIsHandshakeComplete] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handshakeLogs = [
    "INITIALIZING SECURE L3 NODE...",
    "VERIFYING CONSULTANT IDENTITY [C_STERLING_X4]...",
    "ESTABLISHING END-TO-END ENCRYPTION (AES-256)...",
    "NODE SYNC COMPLETE. INITIATING HIGH-FIDELITY FEED."
  ];

  useEffect(() => {
    const handshakeInterval = setInterval(() => {
      setHandshakeStep(prev => {
        if (prev >= handshakeLogs.length - 1) {
          clearInterval(handshakeInterval);
          setTimeout(() => {
            if (!permissionError) setIsHandshakeComplete(true);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(handshakeInterval);
  }, [permissionError]);

  useEffect(() => {
    if (isHandshakeComplete && !permissionError) {
      const timer = setInterval(() => setCallDuration(d => d + 1), 1000);
      startCamera();
      return () => {
        clearInterval(timer);
        stopCamera();
      };
    }
  }, [isHandshakeComplete]);

  const startCamera = async () => {
    setPermissionError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access denied or node failure:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionError("AUTHORIZATION_DENIED: Browser rejected camera node access.");
      } else {
        setPermissionError("HARDWARE_FAILURE: High-fidelity node not detected.");
      }
      setIsHandshakeComplete(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (permissionError) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 space-y-12 font-mono">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-[120px] rounded-full animate-pulse scale-150" />
          <div className="w-32 h-32 rounded-[40px] border-2 border-red-500/30 flex items-center justify-center bg-red-500/5 relative z-10 shadow-2xl">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>
        
        <div className="max-w-md w-full space-y-8 text-center relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase hero-font">Deployment Failure</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 opacity-60">Error Node: SEC_PERM_04</p>
          </div>

          <div className="p-8 bg-white/5 border border-red-500/20 rounded-3xl text-left space-y-4">
             <p className="text-xs text-red-400 font-bold uppercase tracking-widest">{permissionError}</p>
             <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest italic">
               To initialize the session node, you must allow camera and microphone access in your browser settings.
             </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => { setPermissionError(null); setHandshakeStep(0); }}
              className="flex-1 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-london-blue hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group"
            >
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> Retry Authorization
            </button>
            <button 
              onClick={onEndCall}
              className="px-8 py-5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all"
            >
              Abort
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isHandshakeComplete) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-london-blue/20 blur-[120px] rounded-full animate-pulse scale-150" />
          <div className="w-32 h-32 rounded-[40px] border-2 border-london-blue/30 flex items-center justify-center bg-london-blue/5 relative z-10 shadow-2xl animate-pulse">
            <Terminal size={48} className="text-london-blue" />
          </div>
        </div>
        
        <div className="max-w-md w-full space-y-8 text-center relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase hero-font">Initialising Secure Node</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Registry Protocol v4.0.2 • Secure Gateway</p>
          </div>

          <div className="space-y-4 text-left font-mono">
            {handshakeLogs.slice(0, handshakeStep + 1).map((log, i) => (
              <div key={i} className="flex gap-4 items-start text-[10px] animate-in slide-in-from-left duration-300">
                <span className="text-emerald-500 shrink-0">[OK]</span>
                <span className="text-slate-300 italic tracking-widest uppercase">{log}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-london-blue transition-all duration-1000 ease-out shadow-[0_0_15px_#0052FF]" style={{ width: `${(handshakeStep + 1) * 25}%` }} />
             </div>
             <p className="text-[9px] font-black text-slate-500 animate-pulse uppercase tracking-[0.2em]">Authenticating Handshake...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col animate-in fade-in duration-1000">
      {/* Call Header */}
      <div className="p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">London Secure Protocol X-402</h1>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              End-to-End Encrypted • {formatTime(callDuration)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-blue-500 flex items-center justify-center text-[10px] font-bold">ME</div>
            <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-london-blue flex items-center justify-center text-[10px] font-bold">CL</div>
          </div>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5 shadow-inner">
             <Wifi size={14} className="text-emerald-500" />
             <span className="text-[9px] font-black uppercase tracking-widest">Signal Stable</span>
          </div>
        </div>
      </div>

      {/* Main Video Stage */}
      <div className="flex-1 relative overflow-hidden p-6 pt-0 flex justify-center items-center">
        <div className="h-full w-full lg:w-3/4 max-w-5xl rounded-[40px] overflow-hidden bg-[#131314] relative group border border-white/5 transition-all duration-500 shadow-2xl">
          
          {/* FLOATING REAL-TIME TIMER OVERLAY */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[40] animate-in slide-in-from-top-4 duration-1000">
             <div className="px-6 py-3 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-4 shadow-2xl">
                <div className="relative">
                   <div className="w-3 h-3 rounded-full bg-london-blue animate-ping absolute inset-0 opacity-40" />
                   <div className="w-3 h-3 rounded-full bg-london-blue relative z-10" />
                </div>
                <div className="flex items-center gap-3">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">ELAPSED TIME:</span>
                   <span className="text-2xl font-mono font-black italic tracking-tighter text-white tabular-nums">
                     {formatTime(callDuration)}
                   </span>
                </div>
             </div>
          </div>

          {/* Remote Video Feed (Simulation) */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e1f20] to-[#131314]">
             <img 
               src={expert.imageUrl} 
               alt={expert.name}
               className="w-full h-full object-cover opacity-90 grayscale-[0.2]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
             
             <div className="absolute bottom-10 left-10 space-y-3 z-10 p-2 md:p-0">
               <div className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-blue-600/30 text-blue-400 rounded-full w-fit border border-blue-400/20 backdrop-blur-xl">
                 REMOTE NODE: ACTIVE
               </div>
               <div>
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-1 uppercase italic hero-font">VENTURE_CAP_LDN</h2>
                 <p className="text-slate-300 text-sm md:text-lg font-medium opacity-80 uppercase tracking-widest">Authorized Executive Session • Registry Node-X4</p>
               </div>
             </div>
          </div>

          {/* Local User Video (Actual Feed) */}
          <div className="absolute top-10 right-10 w-40 md:w-64 aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 z-20 group-hover:scale-105 transition-transform group/pip">
             <video 
               ref={videoRef}
               autoPlay 
               playsInline 
               muted 
               className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
             />
             {isVideoOff && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
                  <VideoOff size={24} className="text-slate-500 mb-2" />
                  <div className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Feed Disabled</div>
               </div>
             )}
             <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               <span className="text-[8px] font-black uppercase tracking-widest text-white/90">LOCAL NODE</span>
             </div>
          </div>

          {/* Diagnostic Overlays */}
          <div className="absolute top-10 left-10 flex flex-col gap-4 z-10">
             <div className="space-y-1">
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-emerald-500' : 'bg-white/20'}`} />
                   ))}
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-emerald-500/80">LATENCY: 12ms</span>
             </div>
             
             <div className="p-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 space-y-3 hidden md:block">
                <div className="flex items-center gap-3">
                  <Activity size={12} className="text-london-blue" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">FPS: 60.0</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock size={12} className="text-london-blue" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">L3_AUTH_SECURE</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Call Controls Bar */}
      <div className="p-8 pb-12 flex items-center justify-center gap-6 relative z-30">
        <div className="flex flex-wrap items-center justify-center gap-4 bg-[#1e1f20]/90 backdrop-blur-2xl p-4 rounded-full border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isMuted ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'}`}
            >
              {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${isVideoOff ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'}`}
            >
              {isVideoOff ? <VideoOff size={22} /> : <Video size={22} />}
            </button>
          </div>
          
          <div className="h-10 w-px bg-white/10 mx-2" />

          <div className="flex items-center gap-3">
            <button className="p-4 rounded-full bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 transition-all hover:scale-110">
              <ScreenShare size={22} />
            </button>
            <button className="p-4 rounded-full bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 transition-all relative hover:scale-110">
              <MessageSquare size={22} />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#1e1f20]" />
            </button>
            <button className="p-4 rounded-full bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 transition-all hover:scale-110">
              <Users size={22} />
            </button>
            <button className="p-4 rounded-full bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 transition-all hover:scale-110">
              <MoreHorizontal size={22} />
            </button>
          </div>

          <div className="h-10 w-px bg-white/10 mx-2" />

          <button 
            onClick={onEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all px-12 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] shadow-[0_15px_40px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
          >
            <PhoneOff size={20} /> END SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallView;
