import React from 'react';
import { MessageSquareQuote, Star, Award } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Recognized for outstanding leadership in delivering critical projects and driving end-to-end product lifecycles in high-pressure environments.",
    source: "Management Review",
    context: "Outstanding Leadership Award (2024)",
    role: "SynergyConnect Data Innovation"
  },
  {
    id: 2,
    text: "Instrumental in improving platform adaptability, streamlining documentation practices, and significantly enhancing delivery efficiency.",
    source: "Performance Citation",
    context: "Special Contribution Award (2024)",
    role: "Internal Recognition"
  },
  {
    id: 3,
    text: "Abhijeet successfully transformed complex enterprise requirements into scalable solutions, improving system uptime and reducing defects.",
    source: "Client Feedback",
    context: "Enterprise Delivery",
    role: "Banking & Govt Sector Clients"
  }
];

const SiteTestimonials: React.FC = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden" aria-label="Endorsements">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20" aria-hidden="true">
        <svg className="h-full w-full text-blue-600 dark:text-blue-400" fill="currentColor">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black mb-6 text-foreground uppercase tracking-tight">Strategic Endorsements & Recognition</h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8" aria-hidden="true"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Feedback and awards reflecting my commitment to delivery excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl p-8 shadow-sm flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 border border-border">
              <div className="mb-6">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                  <MessageSquareQuote className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div className="flex text-yellow-400 mb-2" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-foreground text-lg leading-relaxed italic mb-8 flex-1">
                "{item.text}"
              </blockquote>
              
              <div className="mt-auto border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{item.context}</div>
                    <div className="text-sm text-muted-foreground">{item.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteTestimonials;