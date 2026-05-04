
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactStats from './components/ImpactStats';
import Skills from './components/Skills';
import Methodology from './components/Methodology';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/Admin/AdminModal';
import ScrollToTop from './components/ScrollToTop';
import StrategyCopilot from './components/StrategyCopilot';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [totalVisits, setTotalVisits] = useState(0);
  const [liveUsers, setLiveUsers] = useState(0);
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
    // 1. Total Visitor Logic (Base + Persistence)
    const BASE_VISITS = 12482;
    const getStoredReach = () => {
      const stored = localStorage.getItem('portfolio_total_visits');
      return stored ? parseInt(stored) : BASE_VISITS;
    };

    let currentTotal = getStoredReach();
    
    // Increment on new unique session
    if (!sessionStorage.getItem('session_recorded')) {
      currentTotal += 1;
      localStorage.setItem('portfolio_total_visits', currentTotal.toString());
      sessionStorage.setItem('session_recorded', 'true');
      
      const history = JSON.parse(localStorage.getItem('traffic_history') || '[]');
      history.unshift({
        timestamp: new Date().toISOString(),
        location: 'New Session Detected',
        action: 'Inbound Entry'
      });
      localStorage.setItem('traffic_history', JSON.stringify(history.slice(0, 50)));
    }
    setTotalVisits(currentTotal);

    // 2. Fluctuating Live Traffic Logic (Active Users)
    const updateLiveUsers = () => {
      const base = 4;
      const variance = Math.floor(Math.random() * 12);
      setLiveUsers(base + variance);
    };

    // 3. "Global Pulse" - Simulate reach growth while active
    const globalPulse = () => {
      setTotalVisits(prev => {
        const next = prev + 1;
        localStorage.setItem('portfolio_total_visits', next.toString());
        
        // Occasionally log a "Global Hit" to history
        if (Math.random() > 0.7) {
          const history = JSON.parse(localStorage.getItem('traffic_history') || '[]');
          history.unshift({
            timestamp: new Date().toISOString(),
            location: 'Global Node Sync',
            action: 'Background Impression'
          });
          localStorage.setItem('traffic_history', JSON.stringify(history.slice(0, 50)));
        }
        
        return next;
      });
    };

    updateLiveUsers();
    const liveInterval = setInterval(updateLiveUsers, 10000);
    const pulseInterval = setInterval(globalPulse, 45000); // Pulse every 45s

    return () => {
      clearInterval(liveInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <ImpactStats />
        <Skills />
        <Methodology />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        totalVisits={totalVisits} 
        liveUsers={liveUsers}
      />
      
      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      <StrategyCopilot />
      <ScrollToTop />
    </div>
  );
};

export default App;
