
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { X, ChevronRight, User, Building2, Globe, TrendingUp, Lightbulb, Layers, Users, Box, CheckCircle2, ArrowUpRight, MessageSquare } from 'lucide-react';
import { projectsData } from '@/data/projects.ts';

const LazyImage: React.FC<{ src: string; alt: string; className?: string; priority?: boolean }> = ({ src, alt, className, priority }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={`relative overflow-hidden bg-accent/20 ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-accent/10">
           <Box className="w-6 h-6 text-muted-foreground/10" />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
      />
    </div>
  );
};

const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  const handleRequestAccess = () => {
    navigate('/?contact=true');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background pt-24 pb-24"
    >
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 sticky top-20 z-30 bg-background/80 backdrop-blur-md py-4 px-2 rounded-xl border border-transparent hover:border-border transition-all">
          <Link to="/" className="hover:text-primary flex items-center gap-1 font-medium transition-colors">
            <Box className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/#projects" className="hover:text-primary flex items-center gap-1 font-medium transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-black uppercase tracking-widest text-[10px] truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </nav>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-[2.5rem] overflow-hidden border border-border shadow-2xl flex flex-col">
            <div className="relative h-64 md:h-[500px] w-full flex-shrink-0">
              <LazyImage 
                src={project.image} 
                alt={`Case Study: ${project.title}`} 
                className="w-full h-full"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              
              <Link 
                to="/"
                className="absolute top-6 right-6 z-20 bg-background/50 hover:bg-background backdrop-blur-md text-foreground p-3 rounded-full transition-all border border-border shadow-xl"
              >
                <X className="w-6 h-6" />
              </Link>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-primary/90 text-primary-foreground backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-foreground mb-8 leading-tight tracking-tighter">
                    {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm font-bold text-muted-foreground bg-accent/50 backdrop-blur-md border border-border p-4 md:p-6 rounded-2xl w-fit">
                    {project.role && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        {project.role}
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center gap-2 md:border-l md:border-border md:pl-8">
                        <Building2 className="w-4 h-4 text-primary" />
                        {project.client}
                      </div>
                    )}
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:brightness-110 transition-colors md:border-l md:border-border md:pl-8"
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-12 lg:p-16">
              <div className="mb-16 border-b border-border pb-12">
                <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light italic">
                  {project.description}
                </p>
                {project.recruiterTakeaway && (
                  <div className="mt-10 p-8 bg-primary/5 border border-primary/20 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3 relative z-10">Recruiter Insight</h4>
                    <p className="text-foreground text-lg font-medium italic relative z-10 leading-relaxed">"{project.recruiterTakeaway}"</p>
                  </div>
                )}
              </div>

              {/* Problem & Strategy Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                <div>
                    <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                      </div>
                      The Business Problem
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{project.businessProblem || project.challenge}</p>
                    
                    {project.productChallenge && (
                      <div className="mt-8 p-6 bg-accent/30 rounded-2xl border border-border">
                        <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-3">Product Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.productChallenge}</p>
                      </div>
                    )}
                </div>
                <div>
                    <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-blue-500" />
                      </div>
                      Product Strategy
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{project.productStrategy || project.solution}</p>
                    
                    {project.prioritization && (
                      <div className="mt-8 p-6 bg-accent/30 rounded-2xl border border-border">
                        <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-3">Prioritization Approach</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.prioritization}</p>
                      </div>
                    )}
                </div>
              </div>

              {/* Technical & Methodology Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                <div className="bg-accent/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all">
                  <Layers className="w-8 h-8 text-primary mb-6" />
                  <h4 className="font-black text-sm uppercase tracking-widest mb-3">Architecture</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.technicalArchitecture || "Full-stack SaaS Ecosystem"}</p>
                </div>
                <div className="bg-accent/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all">
                  <Users className="w-8 h-8 text-primary mb-6" />
                  <h4 className="font-black text-sm uppercase tracking-widest mb-3">Personas</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.usersPersonas?.map((p, i) => (
                      <span key={i} className="text-[10px] font-bold bg-background px-3 py-1 rounded-full border border-border">{p}</span>
                    )) || <span className="text-xs text-muted-foreground">Global Enterprise Users</span>}
                  </div>
                </div>
                <div className="bg-accent/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all">
                  <Box className="w-8 h-8 text-primary mb-6" />
                  <h4 className="font-black text-sm uppercase tracking-widest mb-3">Methodology</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.executionMethodology || "Agile Scrum / SAFe"}</p>
                </div>
                <div className="bg-accent/30 p-8 rounded-3xl border border-border hover:border-primary/30 transition-all">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mb-6" />
                  <h4 className="font-black text-sm uppercase tracking-widest mb-3 text-green-500">Impact</h4>
                  <p className="text-sm font-bold text-foreground leading-relaxed">{project.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                  {/* Responsibilities */}
                  <section>
                    <h3 className="text-2xl font-black text-foreground mb-10">Execution & Lead Responsibilities</h3>
                    <div className="space-y-4">
                      {project.keyResponsibilities?.map((resp, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-5 p-6 bg-accent/20 rounded-2xl border border-border hover:border-primary/20 transition-all group"
                        >
                           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                             <CheckCircle2 className="w-4 h-4" />
                           </div>
                           <span className="text-muted-foreground text-lg leading-relaxed">{resp}</span>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Constraints & Stakeholders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <section className="p-8 bg-accent/10 rounded-3xl border border-border">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">Critical Constraints</h4>
                      <ul className="space-y-4">
                        {(project.constraints || ["Budget", "Timeline", "Compliance"]).map((c, i) => (
                          <li key={i} className="text-foreground font-bold flex items-center gap-3">
                            <span className="w-2 h-2 bg-primary rounded-full" /> {c}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section className="p-8 bg-accent/10 rounded-3xl border border-border">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">Cross-functional Stakeholders</h4>
                      <div className="flex flex-wrap gap-2">
                        {(project.stakeholders || ["C-suite", "Engineering", "PMM", "Legal"]).map((s, i) => (
                          <span key={i} className="px-4 py-2 bg-background rounded-xl text-xs font-bold text-muted-foreground border border-border shadow-sm">{s}</span>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Lessons Learned */}
                  <section className="p-10 md:p-16 bg-foreground text-background dark:bg-accent dark:text-accent-foreground rounded-[3rem] border border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <h3 className="text-2xl font-black mb-10 relative z-10 flex items-center gap-4">
                      <Lightbulb className="w-8 h-8 text-primary" />
                      Key Strategic Lessons
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                      {(project.lessonsLearned || ["Constant communication is key", "User-centric design wins"]).map((l, i) => (
                        <div key={i} className="space-y-2">
                          <span className="text-primary font-black text-4xl opacity-50">0{i+1}.</span>
                          <p className="text-lg font-medium leading-relaxed opacity-90">{l}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                    <div className="bg-card rounded-[2rem] p-8 shadow-2xl border border-border">
                        <h3 className="text-xl font-black mb-8 border-b border-border pb-4">Project Metadata</h3>
                        
                        <div className="space-y-6 mb-10">
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground font-medium">Team Scale</span>
                            <span className="font-black text-foreground">{project.teamSize || "Cross-functional"}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground font-medium">Client Sector</span>
                            <span className="font-black text-foreground">{project.client || "Enterprise"}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground font-medium">Timeline</span>
                            <span className="font-black text-foreground">{project.date}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground font-medium">Status</span>
                            <span className="font-black text-green-500 uppercase tracking-widest text-[10px] bg-green-500/10 px-3 py-1 rounded-full">Completed</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {project.link ? (
                            <a 
                              href={project.link}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-3 bg-primary hover:brightness-110 text-primary-foreground font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20"
                            >
                              Visit Platform
                              <ArrowUpRight className="w-5 h-5" />
                            </a>
                          ) : (
                            <button 
                              onClick={handleRequestAccess}
                              className="w-full flex items-center justify-center gap-3 bg-primary hover:brightness-110 text-primary-foreground font-black py-5 rounded-2xl transition-all shadow-xl shadow-primary/20"
                            >
                              Request Demo
                              <MessageSquare className="w-5 h-5" />
                            </button>
                          )}
                          
                          <Link 
                            to="/"
                            className="w-full flex items-center justify-center gap-3 bg-accent hover:bg-accent/80 text-foreground font-bold py-5 rounded-2xl transition-all border border-border"
                          >
                            Back to Home
                          </Link>
                        </div>

                        <div className="mt-12">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Strategic Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {(project.seoKeywords || project.tags).map((tag, i) => (
                              <span key={i} className="text-[10px] bg-accent/50 px-3 py-2 rounded-xl text-foreground border border-border uppercase tracking-widest font-black group hover:border-primary transition-colors cursor-default">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                    </div>

                    {/* Quick CTA */}
                    <div className="bg-primary p-8 rounded-[2rem] text-primary-foreground shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                       <h4 className="text-xl font-black mb-4 relative z-10">Looking for a Platform Leader?</h4>
                       <p className="text-primary-foreground/80 text-sm mb-6 relative z-10">I specialize in scaling SaaS products from legacy monoliths to enterprise-grade ecosystems.</p>
                       <button 
                        onClick={handleRequestAccess}
                        className="w-full bg-white text-primary font-black py-4 rounded-xl hover:bg-white/90 transition-all relative z-10"
                       >
                          Let's Connect
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyDetail;
