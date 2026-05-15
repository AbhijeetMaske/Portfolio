
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, Download, Briefcase, Award, GraduationCap, 
  Terminal, Layers, Users, Zap, CheckCircle2, 
  Target, TrendingUp, Globe, Mail, Phone, MapPin, 
  ExternalLink, ChevronRight, Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '@/data/projects';

const Resume: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Update SEO meta tags
    document.title = "Abhijeet Maske | Resume | Technical Product Owner & SaaS Leader";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Executive resume of Abhijeet Maske, a Technical Product Owner specializing in SaaS platforms, AI integration, and enterprise scaling. 9+ years of measurable product impact.");
    }
  }, []);

  const metrics = [
    { label: "Products Delivered", value: "22+", icon: Layers },
    { label: "User Scaling", value: "500k+", icon: Users },
    { label: "Efficiency Gain", value: "40%", icon: Zap },
    { label: "Exp. Years", value: "9+", icon: Briefcase },
  ];

  const coreCompetencies = [
    "Product Strategy & Roadmap",
    "SaaS Architecture & Scaling",
    "AI/LLM Integration (RAG)",
    "API-First Development",
    "Agile Leadership (Scrum/SAFe)",
    "Stakeholder Management",
    "GTM & Product Analytics",
    "Enterprise UX Governance"
  ];

  const tools = [
    { category: "Management", items: ["JIRA", "Confluence", "Miro", "Productboard"] },
    { category: "Technical", items: ["SQL", "Postman", "GraphQL", "Python", "Vero"] },
    { category: "Analytics", items: ["Mixpanel", "Google Analytics", "Hotjar"] },
    { category: "AI/ML", items: ["OpenAI API", "LangChain", "Vector DBs"] },
  ];

  const experience = [
    {
      role: "Technical Product Owner",
      company: "SynergyConnect Data Innovation Pvt. Ltd.",
      period: "Feb 2021 - Mar 2026",
      impact: [
        "Architected and led the 1→N scaling of a multi-product SaaS ecosystem, managing a **30+ member cross-functional team**.",
        "Launched an **AI-powered Document Intelligence platform**, reducing manual processing time by **60%** through LLM classification.",
        "Engineered a centralized **Governance & SSO layer**, reducing cross-product friction and improving adoption by **25%**.",
        "Managed the migration of legacy monoliths to **microservices architecture**, slashing deployment cycles from quarterly to weekly."
      ]
    },
    {
      role: "Senior Associate Consultant",
      company: "SCOPE T&M Pvt. Ltd.",
      period: "July 2016 - Oct 2020",
      impact: [
        "Led functional validation and requirement engineering for Tier-1 enterprise SaaS implementations.",
        "Designed and executed complex **UAT and API testing frameworks**, ensuring zero-defect production releases.",
        "Bridged communication between executive stakeholders and engineering to align platform capabilities with business KPIs.",
        "Optimized data sync workflows between ERP systems and proprietary SaaS modules."
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background pt-24 pb-20"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header / Hero */}
        <header className="mb-16 border-b border-border pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tighter uppercase">
                Abhijeet <span className="text-primary">Maske</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-muted-foreground mb-6 uppercase tracking-widest bg-accent w-fit px-4 py-1 rounded-lg">
                Technical Product Owner / Platform Strategist
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Results-driven product leader with 9+ years of experience in orchestrating complex SaaS ecosystems and AI-powered solutions. Specialized in scaling legacy systems for enterprise demand and leading high-performance cross-functional teams.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a 
                href="/Asset/Resume/Abhijeet_Maske_Technical_Product_Owner_Product_Manager_05_05_2026.pdf"
                download
                className="flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-black rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/20 shrink-0"
              >
                <Download className="w-5 h-5" />
                Download Full PDF
              </a>
              <div className="grid grid-cols-1 gap-2 text-sm font-bold text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> abhijeet.msk@gmail.com</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Mumbai/Pune, India</div>
                <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> synergyconnect.in</div>
              </div>
            </div>
          </div>
        </header>

        {/* Impact Snapshot */}
        <section className="mb-20">
          <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-8">Executive Impact Snapshot</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="bg-accent/30 border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
                <m.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-foreground mb-1">{m.value}</span>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-20">
            {/* Work Experience */}
            <section>
              <h3 className="text-2xl font-black text-foreground mb-10 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" />
                Professional Experience
              </h3>
              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-border group">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
                    <div className="mb-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="text-xl font-black text-foreground">{exp.role}</h4>
                        <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{exp.period}</span>
                      </div>
                      <div className="text-lg font-bold text-muted-foreground">{exp.company}</div>
                    </div>
                    <ul className="space-y-4">
                      {exp.impact.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary/60 shrink-0 mt-0.5" />
                          <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Case Studies Snapshot */}
            <section>
              <h3 className="text-2xl font-black text-foreground mb-10 flex items-center gap-3">
                <Layout className="w-6 h-6 text-primary" />
                Featured Case Studies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectsData.slice(0, 4).map((p) => (
                  <Link 
                    key={p.id} 
                    to={`/project/${p.id}`}
                    className="p-6 bg-accent/20 border border-border rounded-2xl hover:border-primary transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.category}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-16">
            {/* Core Competencies */}
            <section>
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {coreCompetencies.map((skill, i) => (
                  <span key={i} className="px-3 py-2 bg-accent/50 border border-border rounded-xl text-xs font-bold text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section className="bg-card border border-border p-8 rounded-3xl shadow-sm">
              <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-8">Technical Arsenal</h3>
              <div className="space-y-8">
                {tools.map((group, i) => (
                  <div key={i}>
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1.5 bg-background border border-border rounded-lg text-[11px] font-black text-foreground uppercase tracking-tight">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Certs */}
            <section className="space-y-8">
              <div>
                <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6">Education</h3>
                <div className="p-6 bg-accent/20 border border-border rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-black text-foreground">Bachelor of Engineering</h4>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Solapur University</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-6">Honors</h3>
                <div className="space-y-3">
                  {["Aspiring Leader Award", "Outstanding Leadership (2024)", "SaaS Excellence Award"].map((award, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-accent/10 border border-border rounded-xl text-xs font-bold text-foreground">
                      <Award className="w-4 h-4 text-primary" />
                      {award}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* Final CTA */}
        <section className="mt-20 p-10 md:p-20 bg-foreground text-background rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Ready to scale your product ecosystem?</h3>
            <p className="text-lg md:text-xl opacity-70 mb-10 max-w-2xl mx-auto">
              I am currently open to strategic leadership roles in high-growth SaaS environments. Let's discuss how my expertise can drive your next platform milestone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/#contact" className="px-10 py-5 bg-primary text-primary-foreground font-black rounded-2xl hover:brightness-110 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest text-sm">
                Initiate Contact
              </Link>
              <a 
                href="/Asset/Resume/Abhijeet_Maske_Technical_Product_Owner_Product_Manager_05_05_2026.pdf" 
                download
                className="px-10 py-5 bg-background text-foreground font-black rounded-2xl hover:bg-accent transition-all uppercase tracking-widest text-sm"
              >
                Get PDF Resume
              </a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Resume;
