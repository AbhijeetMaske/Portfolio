
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SiteHeader from '@/components/SiteHeader';
import SiteHero from '@/components/SiteHero';
import SiteImpactStats from '@/components/SiteImpactStats';
import SiteSkills from '@/components/SiteSkills';
import SiteMethodology from '@/components/SiteMethodology';
import SiteExperience from '@/components/SiteExperience';
import SiteProjects from '@/components/SiteProjects';
import SiteTestimonials from '@/components/SiteTestimonials';
import SiteContact from '@/components/SiteContact';
import SiteFooter from '@/components/SiteFooter';
import SiteAdminModal from '@/components/Admin/SiteAdminModal';
import SiteScrollToTop from '@/components/SiteScrollToTop';
import SitePortfolioAI from '@/components/SitePortfolioAI';
import SiteThreeScene from '@/components/SiteThreeScene';
import SiteCaseStudyDetail from '@/components/SiteCaseStudyDetail';
import SiteResume from '@/components/SiteResume';

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
      <SiteHero />
      <SiteImpactStats />
      <SiteSkills />
      <div className="backdrop-blur-[2px] bg-accent/30">
        <SiteMethodology />
        <SiteExperience />
        <SiteProjects />
        <SiteTestimonials />
        <SiteContact />
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
      <SiteThreeScene scrollY={scrollY} theme={theme} />

      <SiteHeader theme={theme} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={<Home mainRef={mainRef} />} />
        <Route path="/project/:id" element={<SiteCaseStudyDetail />} />
        <Route path="/resume" element={<SiteResume />} />
      </Routes>

      <SiteFooter 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        totalVisits={totalVisits} 
        liveUsers={liveUsers}
      />
      
      <SiteAdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      <SitePortfolioAI />
      <SiteScrollToTop />
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
