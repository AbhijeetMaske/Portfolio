
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, X, ChevronRight, Calendar, User, Users, Globe, CheckCircle2, Mountain, Lightbulb, TrendingUp, ArrowUpRight, Layers, Building2, Box, ArrowRightCircle, LayoutGrid, List, MessageSquare, Loader2 } from 'lucide-react';
import { Project } from '../types';

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

const projectsData: Project[] = [
  {
    id: 8,
    title: "Swades – Digital Transformation",
    category: "Digital Transformation",
    client: "Swades Foundation",
    date: "Apr 2021 - Mar 2024",
    role: "Delivery Manager",
    teamSize: "7 Members",
    link: "https://play.google.com/store/apps/details?id=com.synergyconnect.swadesfoundation",
    description: "A digital transformation initiative tailored for Swades Foundation delivering both Mobile and Web Applications. The ecosystem streamlines Household Census data collection, Village Development Committee (VDC) formation, and Jobsheet management for tracking community development works and beneficiary impact.",
    challenge: "Managing complex community development programs involving manual census data, committee tracking, and distributed jobsheets led to data inconsistencies and delayed decision-making.",
    solution: "Delivered a dual-platform solution with modules for Census/Demography, VDC management, and digital Jobsheets. Integrated real-time monitoring dashboards and automated reporting for stakeholders.",
    result: "Ensured on-time delivery of critical digital tools and improved data collection accuracy by 20% through automated validation and seamless program integration.",
    image: "/img/swades-logo.svg",
    tags: ["Agile", "Mobile App Deployment", "Web App Management", "UAT Coordination", "Data Analytics", "Stakeholder Mgmt"],
    keyResponsibilities: [
      "Managed delivery of Mobile and Web apps covering Household Census, VDC formation workflows, and Jobsheet tracking.",
      "Ensured on-time delivery, UAT, and improved data accuracy by 20% through automated validation.",
      "Oversaw the development of real-time dashboards for monitoring development projects and committee activities."
    ],
    features: [
      "Household Census & Demography",
      "VDC Committee Formation",
      "Jobsheet Management",
      "Needs Assessment Surveys",
      "Real-time Monitoring Dashboards",
      "Offline Data Collection"
    ],
    modules: [
      {
        name: "Household Census",
        purpose: "To create a verified demographic baseline of 500k+ villagers for targeted welfare interventions.",
        features: [
          "Offline Mobile Survey Engine",
          "Dynamic Logic & Validation",
          "Socio-economic Profiling",
          "Unique Household ID Generation"
        ],
        outcome: "Eliminated manual data entry errors and created a 100% accurate digital beneficiary database."
      },
      {
        name: "Village Development Committee (VDC)",
        purpose: "To digitize the formation and governance of village committees for sustainable community ownership.",
        features: [
          "Committee Member Onboarding",
          "Meeting Scheduler & Minutes",
          "Resolution Tracking",
          "Grading & Performance Analytics"
        ],
        outcome: "Streamlined governance across 2,000+ villages, ensuring transparency in community decisions."
      },
      {
        name: "Jobsheet Management",
        purpose: "To track the lifecycle of physical development projects (water, sanitation) from sanction to handover.",
        features: [
          "Digital Work Orders",
          "Geo-tagged Progress Photos",
          "Stage-wise Approval Workflows",
          "Material & Cost Tracking"
        ],
        outcome: "Reduced project completion timelines by 30% and plugged leakages in material utilization."
      }
    ]
  },
  {
    id: 4,
    title: "SCAdmin – SaaS Client Administration Console",
    category: "SaaS Administration",
    client: "Internal / Enterprise SaaS",
    date: "Jan 2024",
    role: "Sr. Project Leader",
    teamSize: "7 Members",
    description: "SCAdmin is a centralized administration platform built to manage SaaS client configurations and billing parameters. It enables administrators to configure client-specific settings, manage subscriptions, track usage, and automate billing cycles.",
    challenge: "Managing client-specific settings, subscriptions, and billing across multiple SaaS environments was decentralized, leading to inefficiencies and potential errors.",
    solution: "Developed a centralized console ensuring secure access control, accurate invoicing, and efficient client onboarding through automated billing cycles.",
    result: "Enabled organizations to centrally manage and monitor multiple SaaS environments with ease, ensuring accurate invoicing and secure access.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Agile Project Management", "SaaS Implementation", "Billing Automation", "API Testing", "UAT Coordination", "JIRA"],
    keyResponsibilities: [
      "Led the development of a centralized administration console to manage SaaS client configurations.",
      "Automated billing cycles and subscription management, improving invoicing accuracy.",
      "Ensured secure access control and streamlined client onboarding processes."
    ],
    features: [
      "Client Configuration Management",
      "Subscription Lifecycle Mgmt",
      "Automated Billing Cycles",
      "Usage Tracking & Analytics",
      "Secure Access Control",
      "Invoicing Automation"
    ]
  },
  {
    id: 7,
    title: "SynergyAdmin – User Management Platform",
    category: "SaaS / Governance",
    client: "Enterprise Partners",
    date: "Feb 2022",
    role: "Sr. Project Lead",
    teamSize: "5 Members",
    description: "Designed and delivered a SaaS-based User Management platform focused on improving organizational efficiency and access control. Key features include Organization Onboarding, Partner Management, User Management with role-based access control (RBAC), secure Document Repository, and actionable Analytics for governance.",
    challenge: "Organizations faced challenges in efficiently managing onboarding processes, partner lifecycles, and user access compliance across distributed environments.",
    solution: "Implemented a robust platform featuring RBAC, secure document storage, and personalization modules. Delivered comprehensive reporting tools to streamline governance and decision-making.",
    result: "Achieved 30% faster onboarding and 25% higher adoption by optimizing lifecycle management and strengthening data security and compliance.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    tags: ["SaaS Product Development", "RBAC", "Governance", "Risk Management", "Compliance", "Client Communication"],
    keyResponsibilities: [
      "Managed end-to-end delivery covering onboarding, partner management, user lifecycle, and repository.",
      "Implemented Role-Based Access Control (RBAC) and secure document storage for compliance.",
      "Optimized onboarding workflows achieving 30% faster onboarding and 25% higher adoption."
    ],
    features: [
      "Organization Onboarding",
      "Partner Lifecycle Management",
      "Role-Based Access Control (RBAC)",
      "Secure Document Repository",
      "User Personalization",
      "Governance Reporting"
    ]
  },
  {
    id: 6,
    title: "SynergyHR – HR Management SaaS",
    category: "HR Tech / SaaS",
    client: "Corporate HR Depts",
    date: "Apr 2022",
    role: "Sr. Project Lead",
    teamSize: "6 Members",
    description: "A comprehensive HR Management SaaS solution designed to automate and optimize HR processes. Key modules include Recruitment (ATS), Onboarding & Offboarding workflows, Employee Management, Biometric Attendance & Timesheets, Performance Management (Appraisals/Goals), and HR Analytics for strategic decision-making.",
    challenge: "Manual and fragmented HR processes (recruitment, leave tracking, performance reviews) caused administrative bottlenecks and lacked centralized data insights.",
    solution: "Managed the implementation of a unified HRMS platform, delivering automated workflows for the entire employee lifecycle and integrating biometric data for accurate time tracking.",
    result: "Enhanced HR efficiency through seamless automation, reduced manual data entry errors, and empowered leadership with real-time, analytics-driven insights.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    tags: ["HRMS Delivery", "Workflow Automation", "SaaS Implementation", "Employee Lifecycle", "Data Analytics", "API Testing"],
    keyResponsibilities: [
      "Managed implementation delivering modules for recruitment, onboarding, attendance, and timesheets.",
      "Oversaw the development of Performance Management and HR Analytics modules.",
      "Ensured seamless automation and UAT to enhance HR efficiency and decision-making."
    ],
    features: [
      "Recruitment (ATS)",
      "Onboarding & Offboarding",
      "Employee Database",
      "Biometric Attendance",
      "Performance Appraisals",
      "HR Analytics & Insights"
    ]
  },
  {
    id: 5,
    title: "SynergySurvey – SaaS Survey Platform",
    category: "SaaS & Mobile",
    client: "Research Organizations",
    date: "Apr 2022",
    role: "Delivery Lead",
    teamSize: "7 Members",
    description: "A SaaS-based Survey Platform enabling organizations to streamline data collection with mobile-friendly forms. Designed for online and offline usage, it supports complex workflows, approvals, multi-language functionality, and cross-platform compatibility.",
    challenge: "Organizations needed a reliable way to collect data in distributed environments (online/offline) with complex approval workflows and multi-language support.",
    solution: "Delivered a mobile-friendly platform with offline capabilities, cross-browser assurance, and robust API integrations. Managed end-to-end testing including globalization and mobile validation.",
    result: "Improved reliability and user adoption by reducing manual effort and ensuring smooth data synchronization across mobile and web platforms.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    tags: ["Mobile App Testing", "SaaS Implementation", "Globalization Testing", "API Integration", "Cross-Browser Testing", "Agile"],
    keyResponsibilities: [
      "Managed end-to-end delivery ensuring smooth data collection via mobile and web forms.",
      "Oversaw multi-language support, cross-browser assurance, and offline capabilities.",
      "Led UAT, API integration, and testing cycles to improve reliability and reduce manual effort."
    ],
    features: [
      "Offline Data Collection",
      "Multi-language Support",
      "Complex Approval Workflows",
      "Mobile-Friendly Forms",
      "Cross-Platform Sync",
      "Globalization Support"
    ]
  },
  {
    id: 9,
    title: "SynergyWorks – Asset & Purchase Management",
    category: "Asset & Procurement SaaS",
    client: "Enterprise Procurement",
    date: "Feb 2021",
    role: "Sr. Product Lead",
    teamSize: "7 Members",
    description: "An enterprise SaaS solution built to optimize asset tracking, procurement, and vendor management. Features include Vendor Onboarding, Centralized Asset Repository (FAR), Procurement Management (Quotations, POs), and seamless integration with accounting systems for accurate financial reporting.",
    challenge: "Inefficient asset tracking, manual procurement processes, and lack of transparency in vendor management led to prolonged purchase cycles and governance issues.",
    solution: "Implemented a comprehensive platform with role-based approval workflows, automated project-wise expense reporting, and real-time project progress tracking.",
    result: "Streamlined approvals, reduced purchase cycle times, and improved transparency through automated reporting and system integrations.",
    image: "https://images.unsplash.com/photo-1554224154-260327c00c40?auto=format&fit=crop&q=80&w=800",
    tags: ["Asset Management", "Procurement Workflow", "Vendor Management", "Financial Integration", "SaaS Implementation", "Agile"],
    keyResponsibilities: [
      "Delivered modules for vendor management, asset tracking, and procurement workflows.",
      "Implemented role-based approval flows and integration with financial accounting systems.",
      "Streamlined approvals and automated project-wise expense and donor reporting."
    ],
    features: [
      "Vendor Onboarding & Mgmt",
      "Fixed Asset Register (FAR)",
      "Procurement Workflows (PO)",
      "Expense Vouchers",
      "Accounting Integration",
      "Project Expense Reporting"
    ]
  },
  {
    id: 10,
    title: "AI Document Intelligence Platform",
    category: "AI & Automation",
    client: "Enterprise SaaS Ecosystem",
    date: "2023 - 2026",
    role: "Technical Product Owner",
    description: "Built and launched an AI-powered Document Intelligence Platform using Large Language Models (LLMs) to automate document processing workflows across enterprise clients. The platform reduces manual effort by extracting structured data from unstructured documents with high accuracy.",
    challenge: "Enterprise clients faced massive manual overhead in processing thousands of documents, leading to slow turnaround times and high error rates.",
    solution: "Integrated LLMs for intelligent data extraction, classification, and validation. Developed custom user journeys for document verification and exception handling.",
    result: "Improved document processing efficiency by 40% and enabled faster decision-making through AI-driven insights.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    tags: ["LLM", "AI", "Document AI", "Automation", "Python", "Product Strategy"],
    keyResponsibilities: [
      "Defined AI use cases, user journeys, and product requirements for intelligent document processing.",
      "Led the cross-functional team in building and launching the platform using LLMs.",
      "Drove AI adoption and intelligent automation across SaaS platforms to enhance operational efficiency."
    ],
    features: [
      "LLM-based Data Extraction",
      "Automated Document Classification",
      "Human-in-the-loop Verification",
      "Predictive Insights Dashboard",
      "Seamless Workflow Integration"
    ]
  },
  {
    id: 1,
    title: "SaaS Platform Scaling (4 to 22 Products)",
    category: "Product Strategy",
    client: "SynergyConnect Platform",
    description: "Led the strategic expansion of a core SaaS product suite from 4 to 22 products, managing 26+ enterprise clients and driving long-term customer value.",
    challenge: "Scaling a multi-product ecosystem while maintaining consistency, stability, and rapid time-to-market.",
    solution: "Introduced reusable platform components, standardized API strategies, and structured delivery governance.",
    result: "Increased client base from 4 to 26; achieved 30% faster onboarding and 25% higher product adoption.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["SaaS", "Scaling", "Product Roadmap", "Ecosystem Strategy"],
    keyResponsibilities: [
      "Owned product strategy and roadmap for a multi-product SaaS ecosystem.",
      "Managed 26+ enterprise clients, driving product adoption and customer success.",
      "Standardized platform components and workflows for faster product launches."
    ],
    features: [
      "Reusable Component Library",
      "Standardized API Strategy",
      "Multi-product Ecosystem Connectivity",
      "Unified Reporting Architecture",
      "Structured Delivery Governance"
    ]
  },
  {
    id: 2,
    title: "Enterprise Application Delivery",
    category: "Custom Development",
    client: "Banking, Govt & NGOs",
    description: "Delivered 8 custom enterprise-grade applications tailored for specific clients across NGO, Government, and Banking sectors.",
    challenge: "Complex, sector-specific requirements necessitating bespoke workflows and strict data validation.",
    solution: "Led requirement workshops and solutioning sessions; transformed requirements into scalable, secure architectures.",
    result: "Successful deployment across diverse sectors with reduced procurement cycle time by 25%.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    tags: ["Enterprise", "Banking", "Government", "Custom Apps"],
    keyResponsibilities: [
      "Delivered 8 custom enterprise-grade applications specifically tailored for clients.",
      "Conducted requirement workshops, solutioning sessions, and architecture reviews.",
      "Transformed complex requirements into scalable solutions for diverse sectors."
    ],
    features: [
      "Custom Workflow Engines",
      "Sector-Specific Compliance",
      "Advanced Data Validation",
      "Secure API Integrations",
      "Bespoke Reporting Tools"
    ]
  },
  {
    id: 3,
    title: "Community Mobile Applications",
    category: "Mobile Engagement",
    client: "Non-Profit Sector",
    description: "Built and launched 2 community mobile applications focused on survey, outreach, and user engagement.",
    challenge: "Engaging a distributed user base with intuitive interfaces for data collection.",
    solution: "Designed user-centric mobile flows (React/Native) focused on usability and data synchronization.",
    result: "Enhanced data collection capabilities and drove continuous improvement in user journeys.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    tags: ["Mobile", "Outreach", "UX/UI", "Engagement"],
    keyResponsibilities: [
      "Built and launched 2 community mobile applications for survey and outreach.",
      "Oversaw the full SaaS lifecycle: ideation, design, development, testing, and deployment.",
      "Drove continuous improvement in product usability and user journeys."
    ],
    features: [
      "User Engagement Tools",
      "Survey Data Collection",
      "Offline Synchronization",
      "Community Outreach Modules",
      "Push Notifications"
    ]
  }
];

const TimelineItem: React.FC<{ project: Project; index: number; setSelectedProject: (p: Project) => void }> = ({ project, index, setSelectedProject }) => {
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
            onClick={() => setSelectedProject(project)}
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const handleRequestAccess = () => {
    setSelectedProject(null);
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent" aria-label="Portfolio Projects">
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
                  onClick={() => setSelectedProject(project)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <LazyImage 
                      src={project.image} 
                      alt={`Abhijeet Maske Project: ${project.title} - SaaS platform modernization and scaling.`} 
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
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed line-clamp-3 font-medium">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border mb-8">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-accent px-3 py-1.5 rounded-lg border border-border group-hover:bg-background">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProject(project)}
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
                  setSelectedProject={setSelectedProject} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" 
            onClick={() => setSelectedProject(null)}
          />
          
          <div className="relative bg-card md:rounded-2xl w-full max-w-5xl h-full md:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-[fadeIn_0.3s_ease-out]">
            <div className="relative h-96 w-full flex-shrink-0">
               <LazyImage 
                 src={selectedProject.image} 
                 alt={`Detailed Case Study Preview: ${selectedProject.title} by Abhijeet Maske`} 
                 className="w-full h-full"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
               
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2.5 rounded-full transition-all border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>

               <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-10">
                 <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {selectedProject.title}
                 </h2>
                 <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl w-fit">
                    {selectedProject.role && (
                       <div className="flex items-center gap-2">
                         <User className="w-4 h-4 text-blue-300" />
                         {selectedProject.role}
                       </div>
                    )}
                    {selectedProject.client && (
                       <div className="flex items-center gap-2 border-l border-white/20 pl-4 sm:pl-6">
                         <Building2 className="w-4 h-4 text-blue-300" />
                         {selectedProject.client}
                       </div>
                    )}
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors border-l border-white/20 pl-4 sm:pl-6"
                      >
                        <Globe className="w-4 h-4" />
                        Live Link
                      </a>
                    )}
                 </div>
               </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mb-12 border-b border-border pb-10">
                <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-2">Challenge</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.challenge}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-2">Solution</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.solution}</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                  <h4 className="text-lg font-bold text-foreground mb-2">Outcome</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{selectedProject.result}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-foreground mb-6">Key Responsibilities</h3>
                  <ul className="space-y-4">
                    {selectedProject.keyResponsibilities?.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-4 p-4 bg-accent rounded-xl border border-border">
                         <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                         <span className="text-muted-foreground leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-1">
                   <div className="bg-foreground text-background dark:bg-card rounded-2xl p-6 shadow-xl sticky top-8 border border-border">
                      <h3 className="text-lg font-bold mb-6">Execution Path</h3>
                      {selectedProject.link ? (
                         <a 
                           href={selectedProject.link}
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="w-full flex items-center justify-center gap-2 bg-primary hover:brightness-110 text-primary-foreground font-semibold py-3 rounded-xl transition-all shadow-lg"
                         >
                           Visit Project
                           <ArrowUpRight className="w-4 h-4" />
                         </a>
                      ) : (
                        <button 
                          onClick={handleRequestAccess}
                          className="w-full flex items-center justify-center gap-2 bg-primary hover:brightness-110 text-primary-foreground font-semibold py-3 rounded-xl transition-all shadow-lg"
                        >
                          Request Demo
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                      <div className="mt-8 flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-background/10 dark:bg-accent px-2.5 py-1 rounded-md text-foreground dark:text-muted-foreground border border-border uppercase tracking-widest font-black">
                            {tag}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
