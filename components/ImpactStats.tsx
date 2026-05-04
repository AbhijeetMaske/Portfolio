
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
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    { 
      id: 2, 
      label: "Total Experience", 
      value: totalExp.years, 
      customDisplay: `${totalExp.years}y ${totalExp.months}m ${totalExp.days}d`,
      icon: History, 
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    { 
      id: 3, 
      label: "Enterprise Clients", 
      value: 26, 
      suffix: "+", 
      icon: UsersRound, 
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30"
    },
    { 
      id: 4, 
      label: "Faster Onboarding", 
      value: 30, 
      suffix: "%", 
      icon: Zap, 
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-100 dark:bg-orange-900/30"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-12 bg-white dark:bg-slate-950 -mt-10 relative z-10 container mx-auto px-4" 
      aria-label="Impact Statistics"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
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
    <div className="flex flex-col items-center text-center group">
      <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
      </div>
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {stat.customDisplay ? stat.customDisplay : `${count}${stat.suffix || ''}`}
      </div>
      <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
        {stat.label}
      </div>
    </div>
  );
};

export default ImpactStats;