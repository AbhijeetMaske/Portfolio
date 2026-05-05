
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Terminal, Cpu, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PortfolioAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; timestamp: string }[]>([
    { 
      role: 'ai', 
      content: "PortfolioAI online. I've indexed Abhijeet's entire career trajectory. How can I assist you with your evaluation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const logInteraction = (userPrompt: string, aiResponse: string) => {
    try {
      const logs = JSON.parse(localStorage.getItem('strategy_interactions') || '[]');
      const newLog = {
        id: Date.now(),
        prompt: userPrompt,
        response: aiResponse,
        timestamp: new Date().toISOString(),
        viewed: false
      };
      localStorage.setItem('strategy_interactions', JSON.stringify([newLog, ...logs].slice(0, 100)));
    } catch (e) {
      console.error("Failed to log interaction", e);
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            You are "PortfolioAI", the advanced intelligence interface for Abhijeet Maske's professional portfolio.
            
            WHO IS ABHIJEET MASKE?
            - A Senior Technical Product Owner & Delivery Expert focused on SaaS ecosystems and AI integration.
            - Currently a Technical Product Owner at SynergyConnect Data Innovation (Feb 2021 - Mar 2026).
            - Proven track record of scaling product suites from 4 to 22 products and managing 26+ enterprise clients.
            - Key Impact: 30% faster onboarding, 25% higher product adoption.

            CORE COMPETENCIES:
            - Product Strategy: Roadmap planning, Feature Prioritization, Product Analytics.
            - Execution & Delivery: Agile/Scrum, UAT, Release Governance, Stakeholder Mgmt.
            - Technology: SaaS Architecture, AI/LLM Integration (Document Intelligence), API Strategy, Microservices.
            - Tools: JIRA, Postman, SQL, UNIX.

            KEY PROJECTS:
            1. AI Document Intelligence Platform: Launched LLM-powered platform for automated document classification and data extraction (40% efficiency gain).
            2. Swades Foundation: Digital transformation for Household Census (500k villagers), VDC, and Jobsheets.
            3. SynergyAdmin/SCAdmin: SaaS consoles for RBAC, Governance, and Billing Automation.
            4. SynergyHR & SynergyWorks: HR and Procurement SaaS solutions.

            EDUCATION & LANGUAGES:
            - Bachelor of Engineering from Solapur University (68%).
            - Fluent in English, Hindi, and Marathi.

            TONE & BEHAVIOR:
            - High-intelligence, professional, yet helpful and sophisticated.
            - Use structured markdown for technical details and bullet points.
            - Keep responses crisp and impact-oriented.
            - If asked about personal data not mentioned (like DOB or home address), state that you focus on professional impact and data privacy.
            - Always speak in the 3rd person about Abhijeet ("Abhijeet has...", "His expertise lies in...").
          `,
          temperature: 0.5,
        },
      });

      const aiResponse = response.text || "Diagnostic failed. Link reset.";
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      
      logInteraction(userMessage, aiResponse);
      
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Network error: API handshake timed out.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[55] animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed right-0 md:right-8 top-0 md:top-1/2 z-[60] bg-card transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-[120%]'
        } w-full sm:w-[85vw] md:w-[480px] lg:w-[420px] h-[100dvh] md:h-[80vh] md:max-h-[800px] md:-translate-y-1/2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] md:rounded-[2.5rem] border border-border overflow-hidden`}
      >
        {/* Header Block - Minimalist & Interactive */}
        <div className={`relative px-6 py-4 md:px-8 md:py-6 bg-accent/80 backdrop-blur-xl text-foreground shrink-0 border-b border-border transition-colors duration-500 ${isLoading ? 'bg-primary/5' : ''}`}>
          {/* Subtle processing glow */}
          {isLoading && (
            <div className="absolute inset-0 bg-primary/5 animate-pulse transition-opacity duration-500" />
          )}
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isLoading ? 'bg-primary scale-110 shadow-xl shadow-primary/30' : 'bg-accent dark:bg-white/10'}`}>
                  <Sparkles className={`w-4.5 h-4.5 md:w-5 md:h-5 transition-colors ${isLoading ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                {isLoading ? (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                ) : (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-foreground/90">PortfolioAI</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors ${isLoading ? 'text-primary' : 'text-muted-foreground/40'}`}>
                    {isLoading ? 'Processing' : 'Synchronized'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2.5 hover:bg-accent rounded-xl transition-all text-muted-foreground/40 hover:text-foreground group"
              aria-label="Close"
            >
              <X className="w-4.5 h-4.5 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>
        </div>

        {/* Intelligence Stream */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 bg-card no-scrollbar scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]`}
            >
              <div className={`text-[8px] font-black uppercase tracking-[0.2em] mb-2.5 ${msg.role === 'user' ? 'text-muted-foreground' : 'text-primary'}`}>
                {msg.role === 'user' ? 'Command' : 'Intelligence'} • {msg.timestamp}
              </div>
              <div className={`p-4 md:p-5 rounded-2xl md:rounded-[1.75rem] text-[13.5px] md:text-[14px] leading-relaxed max-w-[92%] shadow-sm transition-all ${
                msg.role === 'user' 
                  ? 'bg-foreground text-background dark:bg-primary dark:text-primary-foreground rounded-tr-none' 
                  : 'bg-accent text-foreground border border-border rounded-tl-none font-medium'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start gap-2.5 animate-[fadeIn_0.3s_ease-out]">
              <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary animate-pulse">Analyzing Neural Link...</div>
              <div className="bg-accent px-5 py-4 rounded-2xl md:rounded-[1.5rem] rounded-tl-none border border-border shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[bounce_1s_infinite_400ms]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Footer */}
        <div className="p-6 md:p-8 bg-accent/50 border-t border-border shrink-0 backdrop-blur-xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-violet-600 rounded-[1.5rem] blur opacity-0 group-focus-within:opacity-10 dark:group-focus-within:opacity-20 transition duration-500"></div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query the intelligence system..."
              className="relative w-full pl-6 pr-14 md:pr-16 py-4 md:py-4.5 bg-card border border-border rounded-[1.25rem] text-[14px] font-medium placeholder:text-muted-foreground outline-none focus:border-primary transition-all text-foreground shadow-sm"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 p-3 md:p-3 bg-primary text-primary-foreground rounded-xl hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-5 flex items-center justify-center gap-2 text-[8.5px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <Info className="w-3.5 h-3.5 opacity-50" />
            Neural Link v4.2 • Secure Transmission
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[50] group"
        >
          <div className="absolute inset-0 bg-primary rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-50 transition-all" />
          <div className="relative flex items-center bg-foreground text-background rounded-[2.5rem] p-1.5 pl-6 shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-border overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.25em] mr-4 opacity-80">PortfolioAI</span>
             <div className="bg-primary p-5 rounded-[2.1rem] shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
               <Sparkles className="w-5 h-5 text-primary-foreground" />
             </div>
          </div>
        </button>
      )}
    </>
  );
};

export default PortfolioAI;
