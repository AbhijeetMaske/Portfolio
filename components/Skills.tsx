import { Compass, ListTodo, Terminal, Handshake, Zap } from 'lucide-react';

const skillsData = [
  {
    title: "Product Strategy",
    description: "Orchestrating long-term vision through data-driven decisions and market alignment.",
    icon: Compass,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "group-hover:border-primary/50",
    skills: ["Roadmap Planning", "Lifecycle Mgmt", "Feature Prioritization", "KPI Definition", "Product Analytics", "A/B Testing", "GTM Strategy"],
    highlights: ["Scaled from 4 to 22 products", "Managed 26+ Enterprise Clients"]
  },
  {
    title: "Execution & Delivery",
    description: "Ensuring high-velocity throughput with a focus on quality and stakeholder transparency.",
    icon: ListTodo,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "group-hover:border-emerald-500/50",
    skills: ["Agile/Scrum", "Backlog Mgmt", "Sprint Planning", "Stakeholder Mgmt", "UAT", "Release Governance", "User Story Mapping"],
    highlights: ["30% Faster Client Onboarding", "25% Higher Product Adoption"]
  },
  {
    title: "SaaS & AI Systems",
    description: "Leveraging LLMs and scalable architecture for modern enterprise platform needs.",
    icon: Terminal,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "group-hover:border-purple-500/50",
    skills: ["SaaS Architecture", "API Strategy", "Microservices", "LLM Integration", "Document AI", "RBAC / Governance", "Billing Automation"],
    highlights: ["Launched LLM Intelligence Hub", "40% Data Extraction Efficiency"]
  },
  {
    title: "Leadership & Impact",
    description: "Driving growth through digital transformation and cross-functional team alignment.",
    icon: Handshake,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "group-hover:border-orange-500/50",
    skills: ["Cross-Functional Alignment", "Digital Transformation", "HRTech", "Social Impact Tech", "Client Relations", "Requirement Engineering"],
    highlights: ["Census Digitization (500k villagers)", "Lead 20+ Cross-Functional Syncs"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden" aria-label="Core Competencies">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl animate-blob delay-700"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 uppercase tracking-tight">Core Technical Product Management Skills</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8" aria-label="Section Divider"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg lg:text-xl font-medium">
            A comprehensive stack of strategic, tactical, and technological capabilities refined through 9+ years of leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index} 
                className={`group bg-card/90 rounded-[2.5rem] p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-500 backdrop-blur-xl flex flex-col ${category.borderColor} card-3d preserve-3d`}
              >
                <div className="flex items-start justify-between mb-8 preserve-3d">
                  <div className={`w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-sm`} style={{ transform: 'translateZ(30px)' }}>
                    <Icon className={`w-8 h-8 ${category.color}`} aria-hidden="true" />
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-foreground mb-3 group-hover:text-primary transition-colors uppercase tracking-tight leading-tight">{category.title}</h3>
                
                <p className="text-xs font-medium text-muted-foreground mb-8 leading-relaxed">
                  {category.description}
                </p>

                {/* Impact Highlights */}
                <div className="mb-8 space-y-3">
                  <div className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Key Impacts</div>
                  {category.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-foreground/80">
                      <Zap className="w-3 h-3 text-primary shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3.5 py-1.5 bg-accent text-muted-foreground text-[9px] font-black uppercase tracking-[0.1em] rounded-xl border border-border group-hover:bg-background group-hover:shadow-sm transition-all duration-300 cursor-default hover:text-primary hover:border-primary/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;