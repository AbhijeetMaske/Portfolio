
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '@/components/Header.tsx';
import Hero from '@/components/Hero.tsx';
import ImpactStats from '@/components/ImpactStats.tsx';
import Skills from '@/components/Skills.tsx';
import Methodology from '@/components/Methodology.tsx';
import Experience from '@/components/Experience.tsx';
import Projects from '@/components/Projects.tsx';
import Testimonials from '@/components/Testimonials.tsx';
import Contact from '@/components/Contact.tsx';
import Footer from '@/components/Footer.tsx';
import AdminModal from '@/components/Admin/AdminModal.tsx';
import ScrollToTop from '@/components/ScrollToTop.tsx';
import PortfolioAI from '@/components/PortfolioAI.tsx';
import ThreeScene from '@/components/ThreeScene.tsx';
import CaseStudyDetail from '@/components/CaseStudyDetail.tsx';
import Resume from '@/components/Resume.tsx';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC<{ mainRef: React.RefObject<HTMLDivElement | null> }> = ({ mainRef }) => {
  const location = useLocation();

  useEffect(() => {
    // Check for query params to scroll to specific sections
    const params = new URLSearchParams(location.search);
    if (params.get('contact')) {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div ref={mainRef} className="relative z-10 w-full overflow-hidden">
      <Hero />
      <ImpactStats />
      <Skills />
      <div className="backdrop-blur-[2px] bg-accent/30">
        <Methodology />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [totalVisits, setTotalVisits] = useState(0);
  const [liveUsers, setLiveUsers] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const BASE_VISITS = 12482;
    const getStoredReach = () => {
      const stored = localStorage.getItem('portfolio_total_visits');
      return stored ? parseInt(stored) : BASE_VISITS;
    };
    let currentTotal = getStoredReach();
    if (!sessionStorage.getItem('session_recorded')) {
      currentTotal += 1;
      localStorage.setItem('portfolio_total_visits', currentTotal.toString());
      sessionStorage.setItem('session_recorded', 'true');
    }
    setTotalVisits(currentTotal);

    const updateLiveUsers = () => {
      setLiveUsers(4 + Math.floor(Math.random() * 12));
    };
    updateLiveUsers();
    const liveInterval = setInterval(updateLiveUsers, 10000);

    return () => clearInterval(liveInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial GSAP animations for sections
    const sections = mainRef.current?.querySelectorAll('section');
    if (sections) {
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50, scale: 0.98 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [location.pathname]); // Re-run when path changes

  return (
    <div className="relative min-h-screen bg-transparent text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-500">
      <ThreeScene scrollY={scrollY} theme={theme} />

      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={<Home mainRef={mainRef} />} />
        <Route path="/project/:id" element={<CaseStudyDetail />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>

      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        totalVisits={totalVisits} 
        liveUsers={liveUsers}
      />
      
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      <PortfolioAI />
      <ScrollToTop />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
