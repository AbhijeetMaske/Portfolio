import React from 'react';
import { Compass, ListTodo, Terminal, Handshake } from 'lucide-react';

const skillsData = [
  {
    title: "Product Strategy",
    icon: Compass,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "group-hover:border-blue-200 dark:group-hover:border-blue-900/50",
    skills: ["Roadmap Planning", "Lifecycle Mgmt", "Feature Prioritization", "KPI Definition", "Product Analytics", "A/B Testing"]
  },
  {
    title: "Execution & Delivery",
    icon: ListTodo,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    borderColor: "group-hover:border-emerald-200 dark:group-hover:border-emerald-900/50",
    skills: ["Agile/Scrum", "Backlog Mgmt", "Sprint Planning", "Stakeholder Mgmt", "UAT", "Release Governance"]
  },
  {
    title: "SaaS & AI Capabilities",
    icon: Terminal,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    borderColor: "group-hover:border-purple-200 dark:group-hover:border-purple-900/50",
    skills: ["SaaS Architecture", "API Strategy", "Microservices", "LLM Integration", "Document AI", "Predictive Insights"]
  },
  {
    title: "Tools & Technologies",
    icon: Handshake,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    borderColor: "group-hover:border-orange-200 dark:group-hover:border-orange-900/50",
    skills: ["JIRA", "Confluence", "Postman", "SQL", "UNIX", "System Integration", "Data Workflows"]
  }
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden" aria-label="Core Competencies">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-10" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-50 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Competencies</h2>
          <div className="w-20 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6" aria-hidden="true"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Bridging the gap between technical execution and strategic product vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index} 
                className={`group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1 ${category.borderColor}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${category.color}`} aria-hidden="true" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-100 dark:border-white/5 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm transition-all duration-200 cursor-default hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-100 dark:hover:border-blue-900/50"
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