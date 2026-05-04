
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Terminal, Cpu, Activity, Zap, Command as CommandIcon, ShieldCheck, ChevronUp, Plus, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const StrategyCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; timestamp: string }[]>([
    { 
      role: 'ai', 
      content: "Neural interface initialized. I am synchronized with Abhijeet's career repository. How can I assist your strategic evaluation today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const allSuggestions = [
    "Technical ROI Analysis",
    "Team Scalability Plan",
    "Methodology Breakdown",
    "Product Evolution Data",
    "Architecture Principles",
    "Delivery Pipeline Stats"
  ];

  const visibleSuggestions = showAllSuggestions ? allSuggestions : allSuggestions.slice(0, 3);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, showAllSuggestions]);

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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            You are "Strategy Copilot" for Abhijeet Maske. 
            Senior Technical Product Owner.
            Context: Experienced in scaling products from 4 to 22. 
            Tone: High-intelligence, analytical, direct, elite enterprise persona.
            Style: Use markdown for technical bullet points. Keep it crisp.
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
        className={`fixed top-0 right-0 h-full z-[60] bg-white dark:bg-slate-950 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-[540px] shadow-[-40px_0_80px_rgba(0,0,0,0.1)]`}
      >
        {/* Header Block */}
        <div className="bg-slate-950 text-white pt-10 pb-6 px-8 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/90">Strategy Copilot</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Link Active</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-3 hover:bg-white/10 rounded-2xl transition-all"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white/50" />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20">
              <ShieldCheck className="w-3 h-3" />
              Verified Assets
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
              <Cpu className="w-3 h-3" />
              G-3F Pro
            </div>
          </div>
        </div>

        {/* Intelligence Stream */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-12 bg-white dark:bg-slate-950 no-scrollbar scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-[fadeIn_0.4s_ease-out]`}
            >
              <div className={`text-[9px] font-black uppercase tracking-[0.2em] mb-3 ${msg.role === 'user' ? 'text-slate-400' : 'text-blue-600'}`}>
                {msg.role === 'user' ? 'Command' : 'Intelligence'} • {msg.timestamp}
              </div>
              <div className={`p-6 rounded-3xl text-[14px] leading-relaxed max-w-[90%] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 dark:bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-white/5 rounded-tl-none font-medium'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start gap-3 animate-pulse">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">Syncing...</div>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl rounded-tl-none w-20 flex gap-1.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Tactical Footer */}
        <div className="p-8 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 shrink-0">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Context Nodes</span>
              <button 
                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                {showAllSuggestions ? <ChevronUp className="w-3 h-3"/> : <Plus className="w-3 h-3"/>}
                {showAllSuggestions ? 'Shrink' : 'Expand'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {visibleSuggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="text-left px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-3 group shadow-sm"
                >
                  <CommandIcon className="w-3 h-3 opacity-20 group-hover:opacity-100" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query platform metrics..."
              className="w-full pl-6 pr-16 py-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-white/5 rounded-2xl text-[14px] font-bold placeholder:text-slate-400 outline-none focus:border-blue-600 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-white"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
            <Info className="w-3 h-3" />
            AI Output may vary. Verify mission critical data.
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 z-[50] group"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-50 transition-all" />
          <div className="relative flex items-center bg-slate-950 text-white rounded-[2.5rem] p-1.5 pl-6 shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-white/5">
             <span className="text-[10px] font-black uppercase tracking-[0.25em] mr-4 text-white/60">Strategy Copilot</span>
             <div className="bg-blue-600 p-5 rounded-[2.1rem] shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:rotate-[15deg] transition-transform duration-500">
               <Sparkles className="w-5 h-5 text-white" />
             </div>
          </div>
        </button>
      )}
    </>
  );
};

export default StrategyCopilot;
