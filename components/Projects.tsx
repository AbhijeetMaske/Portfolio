
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, User, Building2, LayoutGrid, List, MessageSquare, Box } from 'lucide-react';
import { Project } from '../types';
import { projectsData } from '../data/projects';

const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

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
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
      />
    </div>
  );
};

const TimelineItem: React.FC<{ project: Project; index: number; onSelect: (id: number) => void }> = ({ project, index, onSelect }) => {
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFocused(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px', 
        threshold: 0
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={elementRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row gap-8 items-center transition-opacity duration-500 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      } ${isFocused ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
    >
      {/* Timeline Node */}
      <div className={`absolute left-8 md:left-1/2 top-8 md:top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full shadow-lg z-10 transition-all duration-500 ${
        isFocused 
          ? 'w-10 h-10 bg-primary border-4 border-primary/20' 
          : 'w-6 h-6 bg-accent border-2 border-background'
      }`}>
        <div className={`bg-background rounded-full transition-all duration-500 ${isFocused ? 'w-2 h-2' : 'w-0 h-0'}`}></div>
      </div>

      {/* Date Badge (Desktop) */}
      <div className={`hidden md:block flex-1 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
        <div className={`inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border transition-all duration-500 ${
          isFocused 
            ? 'bg-primary text-primary-foreground border-primary scale-105 shadow-xl shadow-primary/20' 
            : 'bg-accent text-muted-foreground border-border'
        }`}>
          {project.date || 'Ongoing'}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 w-full pl-20 md:pl-0">
         <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`bg-card rounded-[1.75rem] overflow-hidden border shadow-sm cursor-pointer group relative flex flex-col sm:flex-row h-full sm:h-auto ${
              isFocused ? 'ring-4 ring-primary/10 shadow-2xl border-primary/20' : 'border-border'
            }`}
            onClick={() => onSelect(project.id)}
         >
            {/* Thumbnail Image */}
            <div className="w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 relative overflow-hidden">
                <LazyImage 
                    src={project.image} 
                    alt={`Technical Product Management Case Study: ${project.title}`} 
                    className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {project.category}
                    </span>
                    {project.client && (
                        <span className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                            <Building2 className="w-3 h-3" /> {project.client}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {project.title}
                </h3>

                {project.role && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                        <User className="w-3.5 h-3.5 text-blue-400" />
                        {project.role}
                    </div>
                )}

                <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform ml-2">
                        View <ChevronRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
          </motion.div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const handleSelectProject = (id: number) => {
    navigate(`/project/${id}`);
  };

  return (
    <section id="projects" className="py-24 bg-transparent min-h-screen" aria-label="Portfolio Projects">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-4 uppercase tracking-tight">Technical Product Management Case Studies</h2>
            <div className="w-24 h-2 bg-primary rounded-full mb-6 mx-auto md:mx-0" aria-hidden="true"></div>
            <p className="text-muted-foreground max-w-xl text-lg">
              Strategic initiatives and platform scaling projects.
            </p>
          </div>
          
          <div className="flex bg-accent p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'grid' 
                  ? 'bg-background text-primary shadow-sm border border-border' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'timeline' 
                  ? 'bg-background text-primary shadow-sm border border-border' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List className="w-4 h-4" />
              Timeline
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-4">
            {projectsData.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="project-card bg-card rounded-[2.5rem] overflow-hidden border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 flex flex-col h-full transform group"
              >
                <div 
                  className="h-56 overflow-hidden relative cursor-pointer" 
                  onClick={() => handleSelectProject(project.id)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <LazyImage 
                      src={project.image} 
                      alt={`Project: ${project.title}`} 
                      className="w-full h-full"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black text-primary shadow-md tracking-widest uppercase">
                    {project.category}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  {project.client && (
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-primary mb-3 uppercase tracking-widest">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Client: {project.client}</span>
                      </div>
                  )}
                  
                  <h3 
                    className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer leading-tight" 
                    onClick={() => handleSelectProject(project.id)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3 font-medium">{project.description}</p>
                  
                  {project.result && (
                    <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs font-black text-primary uppercase tracking-widest mb-1 italic">Key Impact</p>
                      <p className="text-sm font-bold text-foreground leading-snug">{project.result}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border mb-8">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-accent px-3 py-1.5 rounded-lg border border-border group-hover:bg-background">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleSelectProject(project.id)}
                    className="w-full mt-auto bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-primary/20"
                  >
                    View Case Study
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto py-8">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10 transform md:-translate-x-1/2" />
            <div className="space-y-12">
              {projectsData.map((project, index) => (
                <TimelineItem 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onSelect={handleSelectProject} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
