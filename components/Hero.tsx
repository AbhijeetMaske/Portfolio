
import React from 'react';
import { ArrowRight, FileText, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section id="about" className="relative pt-40 pb-32 flex content-center items-center justify-center min-h-[85vh] bg-white dark:bg-slate-950 overflow-hidden" aria-label="Introduction">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 dark:invert"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-10 animate-[fadeIn_0.5s_ease-out]">
            <Zap className="w-3.5 h-3.5" />
            SaaS Product Leader | AI-Enabled Platforms
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.05] mb-10 tracking-tight animate-[fadeIn_0.6s_ease-out]">
            Driving 0→1 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">and scale (1→N)</span> <br />
            Product Growth.
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed font-medium animate-[fadeIn_0.7s_ease-out]">
            Technical Product Owner with 9+ years experience. Specializing in SaaS Platforms, AI-led innovation, and enterprise-grade delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-[fadeIn_0.8s_ease-out]">
            <a 
              href="#projects" 
              onClick={(e) => handleScroll(e, 'projects')}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-2xl shadow-slate-200 dark:shadow-none hover:shadow-blue-200 dark:hover:shadow-blue-900/40 hover:-translate-y-1"
            >
              Explore Systems
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScroll(e, 'contact')}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1"
            >
              Download Dossier
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
