
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Command, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skill', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Resume', href: '/resume', id: 'resume' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    if (location.pathname !== '/') {
      const activeItem = navItems.find(item => item.href === location.pathname);
      setActiveSection(activeItem ? activeItem.id : '');
      return;
    }

    // Use IntersectionObserver for more accurate scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    const handleBottomReach = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleBottomReach);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleBottomReach);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      // The smooth scroll logic is in Home component or handled by router link with hash
      // But we can manually scroll after navigation if needed.
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(id);
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

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#');
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Progress Bar */}
      <div 
        className="h-1 bg-primary transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      <div className="bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={scrollToTop}
                className="flex items-center gap-3 text-foreground group"
                aria-label="Abhijeet Maske Home"
              >
                <div className="bg-primary text-primary-foreground p-2.5 rounded-2xl group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-primary/20">
                  <Command className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter leading-none">ABHIJEET</span>
                  <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Portfolio</span>
                </div>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-1 bg-accent p-1.5 rounded-2xl border border-border" role="navigation">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id, item.href)}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-background text-primary shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-accent border border-border text-foreground hover:bg-accent/80 transition-all active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-accent border border-border text-foreground hover:bg-accent/80 transition-all active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground p-2.5 hover:bg-accent rounded-2xl transition-all active:scale-95"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl transition-all duration-500 ease-in-out transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                  activeSection === item.id 
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}
              onClick={(e) => handleNavClick(e, item.id, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
