
import React, { useState, useEffect } from 'react';
import { Menu, X, Command, Sun, Moon } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
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

  useEffect(() => {
    const handleScroll = () => {
      // Reading Progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);

      // Scroll Spy
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(item.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    setIsOpen(false);

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.history.pushState(null, '', '#');
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Progress Bar */}
      <div 
        className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      ></div>

      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={scrollToTop}
                className="flex items-center gap-3 text-gray-900 dark:text-white group"
                aria-label="Abhijeet Maske Home"
              >
                <div className="bg-gray-900 dark:bg-blue-600 text-white p-2.5 rounded-2xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-gray-200 dark:shadow-none">
                  <Command className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter leading-none">ABHIJEET</span>
                  <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 dark:text-blue-400 uppercase">Portfolio</span>
                </div>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-1 bg-gray-900/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5" role="navigation">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-gray-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl bg-gray-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 transition-all active:scale-95"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 dark:text-white p-2.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl transition-all active:scale-95"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-500 ease-in-out transform origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-5 py-4 rounded-2xl text-base font-bold transition-all ${
                  activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
              onClick={(e) => handleNavClick(e, item.id)}
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
