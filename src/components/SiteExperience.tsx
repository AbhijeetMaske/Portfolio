
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Building2, CheckCircle2, Award, BriefcaseBusiness, Sparkles, Clock, Globe } from 'lucide-react';
import { ExperienceItem } from '@/types';

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "Technical Product Owner",
    company: "SynergyConnect Data Innovation Pvt. Ltd.",
    location: "Mumbai, India",
    startDate: "2021-02-01",
    endDate: "2026-03-31",
    period: "Feb 2021 - Mar 2026",
    description: [
      "Own product strategy and roadmap for a multi-product SaaS ecosystem, aligning development with business goals and customer needs.",
      "Led product discovery and stakeholder workshops to identify high-impact features and define product direction.",
      "Owned end-to-end delivery of SaaS platform products, improving **customer onboarding by 30%** and increasing **product adoption by 25%**.",
      "Built and launched an **AI-powered Document Intelligence Platform** using LLMs, improving document processing efficiency and reducing manual effort.",
      "Standardized platform components and workflows, enabling faster product launches and a consistent user experience."
    ],
    awards: [
      "Aspiring Leader Excellence Award",
      "Outstanding Leadership in Delivering a Critical Project (2024)",
      "Special Contribution Award for Critical Delivery (2024)"
    ],
    skills: ["SaaS Strategy", "AI/LLM", "Product Roadmap", "API Strategy", "Microservices", "JIRA", "Postman", "SQL"]
  },
  {
    id: 2,
    role: "Senior Associate Consultant",
    company: "SCOPE T&M Pvt. Ltd.",
    location: "Pune, India",
    startDate: "2016-07-01",
    endDate: "2020-10-31",
    period: "July 2016 - Oct 2020",
    description: [
      "Supported SaaS and enterprise project delivery through requirement analysis, workflow design, and full functional validation.",
      "Conducted API, UAT, regression, and end-to-end functional testing.",
      "Worked directly with business teams and clients to align platform capabilities with operational processes.",
      "Performed SQL-based data validation and system readiness checks before production releases."
    ],
    skills: ["SQL", "API Testing", "UAT", "Data Validation", "Requirement Analysis", "Workflow Design"]
  }
];

export const calculateDuration = (startStr: string, endStr?: string) => {
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

const SiteExperience: React.FC = () => {
  const [now, setNow] = useState(new Date());

  // Update "Present" experience in real-time every 24 hours (or just on mount)
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 86400000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="experience" className="py-24 bg-transparent relative overflow-hidden" aria-label="Professional Career & Product Leadership">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Professional Career & Product Leadership</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" aria-hidden="true"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A track record of delivering scalable solutions and driving operational excellence.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-white/10 transform md:-translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-12">
            {experienceData.map((item, index) => {
              const { years, months, days } = calculateDuration(item.startDate, item.endDate);
              
              return (
                <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="absolute left-8 md:left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-card border-4 border-accent shadow-md z-10 mt-0">
                    <BriefcaseBusiness className={`w-5 h-5 ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true" />
                  </div>

                  <div className={`hidden md:block flex-1 pt-3 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                     <div className={`inline-flex flex-col gap-1 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-transform hover:scale-105
                          ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground border border-border'}`}
                        >
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {item.period}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest px-4">
                          <Clock className="w-3 h-3" />
                          {years}y {months}m {days}d
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 pl-20 md:pl-0">
                    <div className={`bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border-l-4 overflow-hidden group
                      ${index === 0 ? 'border-primary' : 'border-border'}`}
                    >
                      
                      <div className="md:hidden px-6 pt-6 pb-2">
                         <div className="flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              {item.period}
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                              <Clock className="w-3 h-3" />
                              {years}y {months}m {days}d
                            </div>
                         </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="mb-6">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                            {item.role}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                              <span className="font-semibold">{item.company}</span>
                            </div>
                            {item.location && (
                              <div className="flex items-center gap-1.5 sm:border-l sm:border-gray-300 dark:sm:border-white/10 sm:pl-4">
                                <MapPin className="w-4 h-4 text-gray-400" aria-hidden="true" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {item.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                              <CheckCircle2 className="w-5 h-5 text-blue-500/60 dark:text-blue-400/60 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                              <span 
                                dangerouslySetInnerHTML={{ 
                                  __html: desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>') 
                                }} 
                              />
                            </li>
                          ))}
                        </ul>

                        {item.awards && (
                          <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                 <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Key Recognition</h4>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              {item.awards.map((award, i) => (
                                <div 
                                  key={i} 
                                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-all group/award"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center group-hover/award:scale-110 transition-transform shadow-sm">
                                    <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" aria-hidden="true" />
                                  </div>
                                  <div>
                                     <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block leading-tight">{award}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {item.skills && (
                        <div className="bg-accent/50 px-6 py-4 border-t border-border flex flex-wrap gap-2">
                          {item.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-24 pt-20 border-t border-border">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Educational Background & Languages</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" aria-hidden="true"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Bachelor of Engineering</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Solapur University</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Score: 68%</span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">B.E. Degree</span>
              </div>
            </div>

            <div className="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Languages</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Multilingual Proficiency</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-6 border-t border-border">
                {["Marathi", "English", "Hindi"].map((lang, i) => (
                  <span key={i} className="px-4 py-1.5 bg-accent text-foreground text-xs font-black rounded-xl border border-border uppercase tracking-widest">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteExperience;