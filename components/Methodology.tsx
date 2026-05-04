import React from 'react';
import { Microscope, Waypoints, GitMerge, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "Deep-dive workshops to understand business needs, stakeholder goals, and technical feasibility.",
    icon: Microscope,
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
  },
  {
    id: 2,
    title: "Planning",
    description: "Creating comprehensive roadmaps, defining scope, and prioritizing backlog items for Agile sprints.",
    icon: Waypoints,
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  },
  {
    id: 3,
    title: "Execution",
    description: "Iterative development with rigorous testing (UAT), CI/CD pipelines, and active stakeholder feedback.",
    icon: GitMerge,
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
  },
  {
    id: 4,
    title: "Delivery",
    description: "Seamless deployment, user onboarding, and continuous monitoring for performance and adoption.",
    icon: Rocket,
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  }
];

const Methodology: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900/50" aria-label="My Methodology">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How I Work</h2>
          <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6" aria-hidden="true"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            A structured, agile-driven approach to turning complex requirements into scalable solutions.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-300 dark:bg-white/10 z-0" aria-hidden="true"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white dark:border-slate-800 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
                
                {/* Mobile Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden my-6 text-gray-300 dark:text-gray-700">
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

export default Methodology;