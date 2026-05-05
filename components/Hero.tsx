
import React, { useEffect, useRef } from 'react';
import { ArrowRight, FileText, Zap } from 'lucide-react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a floating effect for the main container
      gsap.to(containerRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

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
    <section id="about" className="relative pt-40 pb-32 flex content-center items-center justify-center min-h-[95vh] bg-transparent overflow-hidden" aria-label="Introduction">
      <div ref={containerRef} className="container relative mx-auto px-4 z-10 transition-transform duration-300">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-border shadow-sm transition-all">
            <Zap className="w-3.5 h-3.5" />
            SaaS Product Leader | AI-Enabled Platforms
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-foreground leading-[1.05] mb-10 tracking-tight drop-shadow-sm">
            Driving 0→1 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">and scale (1→N)</span> <br />
            Product Growth.
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-medium transition-colors">
            Technical Product Owner with 9+ years experience. Specializing in SaaS Platforms, AI-led innovation, and enterprise-grade delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#projects" 
              onClick={(e) => handleScroll(e, 'projects')}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1"
            >
              Explore Systems
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="/Asset/Resume/Abhijeet_Maske_Technical_Product_Owner_Product_Manager_05_05_2026.pdf" 
              download
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-background text-foreground border border-border font-bold rounded-2xl hover:bg-accent transition-all shadow-lg hover:-translate-y-1"
            >
              Download Dossier
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative localized depth markers */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-primary/20 rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 border border-primary/10 rounded-full animate-pulse delay-500 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
