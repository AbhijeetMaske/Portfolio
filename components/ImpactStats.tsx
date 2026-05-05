
import React, { useEffect, useState, useRef } from 'react';
import { Zap, UsersRound, Rocket, History } from 'lucide-react';
import { calculateDuration } from './Experience';

const ImpactStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [totalExp, setTotalExp] = useState({ years: 0, months: 0, days: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Exact dates from master_data.md
    // SynergyConnect: Feb 2021
    // SCOPE T&M: July 2016 - Oct 2020
    const exp1 = calculateDuration("2021-02-01");
    const exp2 = calculateDuration("2016-07-01", "2020-10-31");

    // Total years, months, days summation logic
    let totalDays = exp1.days + exp2.days;
    let totalMonths = exp1.months + exp2.months;
    let totalYears = exp1.years + exp2.years;

    if (totalDays >= 30) {
      totalMonths += Math.floor(totalDays / 30);
      totalDays = totalDays % 30;
    }
    if (totalMonths >= 12) {
      totalYears += Math.floor(totalMonths / 12);
      totalMonths = totalMonths % 12;
    }

    setTotalExp({ years: totalYears, months: totalMonths, days: totalDays });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { 
      id: 1, 
      label: "Products Scaled", 
      value: 22, 
      suffix: "+", 
      icon: Rocket, 
      color: "text-indigo-600 dark:text-blue-400",
      bg: "bg-indigo-50 dark:bg-blue-900/30"
    },
    { 
      id: 2, 
      label: "Total Experience", 
      value: totalExp.years, 
      customDisplay: `${totalExp.years}y ${totalExp.months}m ${totalExp.days}d`,
      icon: History, 
      color: "text-violet-600 dark:text-purple-400",
      bg: "bg-violet-50 dark:bg-purple-900/30"
    },
    { 
      id: 3, 
      label: "Enterprise Clients", 
      value: 26, 
      suffix: "+", 
      icon: UsersRound, 
      color: "text-emerald-600 dark:text-green-400",
      bg: "bg-emerald-50 dark:bg-green-900/30"
    },
    { 
      id: 4, 
      label: "Faster Onboarding", 
      value: 30, 
      suffix: "%", 
      icon: Zap, 
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/30"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 bg-transparent -mt-12 relative z-10 container mx-auto px-4" 
      aria-label="Impact Statistics"
    >
      <div className="bg-card/90 rounded-[2.5rem] shadow-xl border border-border p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 backdrop-blur-xl">
        {stats.map((stat) => (
          <Counter 
            key={stat.id} 
            stat={stat} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </section>
  );
};

const Counter: React.FC<{ stat: any, isVisible: boolean }> = ({ stat, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const incrementTime = Math.floor(duration / end);
    
    const timer = setInterval(() => {
      if (end === 0) {
        clearInterval(timer);
        return;
      }
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, Math.max(incrementTime, 50));

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center group scale-110 lg:scale-125 transition-transform">
      <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <Icon className={`w-8 h-8 ${stat.color}`} aria-hidden="true" />
      </div>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-card-foreground mb-2 tracking-tighter">
        {stat.customDisplay ? stat.customDisplay : `${count}${stat.suffix || ''}`}
      </div>
      <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
        {stat.label}
      </div>
    </div>
  );
};

export default ImpactStats;