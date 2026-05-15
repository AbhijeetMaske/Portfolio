import React from 'react';
import { Microscope, Waypoints, GitMerge, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "Deep-dive workshops to understand business needs, stakeholder goals, and technical feasibility.",
    icon: Microscope,
    color: "bg-primary/10 text-primary"
  },
  {
    id: 2,
    title: "Planning",
    description: "Creating comprehensive roadmaps, defining scope, and prioritizing backlog items for Agile sprints.",
    icon: Waypoints,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    id: 3,
    title: "Execution",
    description: "Iterative development with rigorous testing (UAT), CI/CD pipelines, and active stakeholder feedback.",
    icon: GitMerge,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    id: 4,
    title: "Delivery",
    description: "Seamless deployment, user onboarding, and continuous monitoring for performance and adoption.",
    icon: Rocket,
    color: "bg-emerald-500/10 text-emerald-500"
  }
];

const SiteMethodology: React.FC = () => {
  return (
    <section className="py-20 bg-transparent" aria-label="My Methodology">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 uppercase tracking-tight">Product Management Philosophy & Methodology</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8" aria-hidden="true"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A structured, agile-driven approach to turning complex requirements into scalable solutions.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 perspective-1000">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" aria-hidden="true"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group card-3d preserve-3d py-4">
                <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-background group-hover:scale-110 transition-transform duration-300 preserve-3d`} style={{ transform: 'translateZ(20px)' }}>
                  <Icon className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
                
                {/* Mobile Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden my-6 text-border">
                    <ArrowRight className="w-6 h-6 mx-auto rotate-90" aria-hidden="true" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SiteMethodology;