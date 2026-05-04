
import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Activity, Globe, Zap, Cpu } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  totalVisits?: number;
  liveUsers?: number;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin, totalVisits = 0, liveUsers = 0 }) => {
  const [displayReach, setDisplayReach] = useState(totalVisits);

  useEffect(() => {
    setDisplayReach(totalVisits);
  }, [totalVisits]);

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-white/5 relative overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16">
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-8">
               <div className="bg-blue-600 p-3 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Zap className="w-6 h-6 text-white" />
               </div>
               <div>
                 <span className="text-2xl font-black text-white tracking-tighter uppercase block leading-none">Abhijeet Maske</span>
                 <span className="text-[10px] font-black text-blue-500 tracking-[0.3em] uppercase mt-1">SaaS Product Leader | AI-Enabled Platforms</span>
               </div>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-60 mb-10">
              Architecting mission-critical SaaS ecosystems and leading high-performance product squads through digital transformation.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* Traffic Terminal */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-4 min-w-[240px]">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Network Status</span>
                  </div>
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Optimal</span>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-30">Concurrent</div>
                    <div className="text-xl font-mono text-white font-bold">{liveUsers}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-30">Global reach</div>
                    <div className="text-xl font-mono text-white font-bold">{displayReach.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* System Specs */}
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-center gap-1">
                 <div className="flex items-center gap-2 mb-2">
                   <Activity className="w-3.5 h-3.5 text-blue-400" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Kernel v2.5</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Globe className="w-3.5 h-3.5 text-blue-400" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Node: Pune_IN</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Navigation</h4>
              <nav className="flex flex-col gap-4">
                <a href="#about" className="text-sm font-bold hover:text-white transition-colors">Documentation</a>
                <a href="#projects" className="text-sm font-bold hover:text-white transition-colors">Infrastructure</a>
                <a href="#skills" className="text-sm font-bold hover:text-white transition-colors">Capabilities</a>
              </nav>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Access Control</h4>
              {onOpenAdmin && (
                <button 
                  onClick={onOpenAdmin}
                  className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-2xl"
                >
                  <Lock className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                  Secure Terminal
                </button>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Verified Secure by SSL/TLS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30 italic">
            Engineered for high-availability performance.
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
            © {new Date().getFullYear()} Abhijeet Maske • Pune, MH
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
