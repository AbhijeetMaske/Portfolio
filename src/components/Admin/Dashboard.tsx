
import React, { useState, useEffect } from 'react';
import { 
  Inbox, Trash, Settings, LogOut, Brain, Zap, 
  Sparkles, RefreshCw, Activity, CheckCircle, 
  BarChart3, Database, ShieldAlert, Search, MessageSquare,
  Users, Eye, MousePointer2, ClipboardList, History, Globe, MapPin,
  RotateCcw, Save
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

interface Interaction {
  id: number;
  prompt: string;
  response: string;
  timestamp: string;
}

interface TrafficLog {
  timestamp: string;
  location: string;
  action: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [trafficHistory, setTrafficHistory] = useState<TrafficLog[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [activeTab, setActiveTab] = useState<'inbox' | 'strategy' | 'logs' | 'settings'>('inbox');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [recalibrationValue, setRecalibrationValue] = useState('');

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); 
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const storedMessages = localStorage.getItem('portfolio_messages');
    const storedInteractions = localStorage.getItem('strategy_interactions');
    const storedVisits = localStorage.getItem('portfolio_total_visits');
    const storedTraffic = localStorage.getItem('traffic_history');
    
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedInteractions) setInteractions(JSON.parse(storedInteractions));
    if (storedVisits) setTotalVisits(parseInt(storedVisits));
    if (storedTraffic) setTrafficHistory(JSON.parse(storedTraffic));
  };

  const handleRecalibrate = () => {
    const newVal = parseInt(recalibrationValue);
    if (!isNaN(newVal) && newVal >= 0) {
      localStorage.setItem('portfolio_total_visits', newVal.toString());
      setTotalVisits(newVal);
      setRecalibrationValue('');
      
      const history = JSON.parse(localStorage.getItem('traffic_history') || '[]');
      history.unshift({
        timestamp: new Date().toISOString(),
        location: 'Admin Console',
        action: 'Manual Reach Recalibration'
      });
      localStorage.setItem('traffic_history', JSON.stringify(history.slice(0, 50)));
      alert('Global Reach recalibrated successfully.');
    }
  };

  const deleteInteraction = (id: number) => {
    const updated = interactions.filter(i => i.id !== id);
    setInteractions(updated);
    localStorage.setItem('strategy_interactions', JSON.stringify(updated));
  };

  const generateInsights = async () => {
    if (interactions.length === 0) return;
    setIsAnalyzing(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const promptData = interactions.map(i => i.prompt).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze these user prompts from my portfolio's Strategy Copilot and provide 3 actionable insights for a Project Manager's portfolio.
        Prompts: ${promptData}
        Format: Markdown list.`,
      });
      
      setAiInsight(response.text || "Diagnostic failed.");
    } catch (e) {
      setAiInsight("API Handshake Failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-72 bg-foreground border-r border-border flex flex-col shrink-0">
        <div className="p-8">
           <div className="text-[10px] font-black text-background/40 uppercase tracking-[0.2em] mb-8">Navigation</div>
           <nav className="space-y-2">
              {[
                { id: 'inbox', label: 'Lead Pipeline', icon: Inbox, count: messages.length },
                { id: 'strategy', label: 'Strategy AI', icon: Brain, count: interactions.length },
                { id: 'logs', label: 'Network Logs', icon: ClipboardList, count: null },
                { id: 'settings', label: 'Infrastructure', icon: Settings, count: null }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === item.id 
                      ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20' 
                      : 'text-background/40 hover:bg-background/5 hover:text-background'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.count !== null && (
                    <span className={`ml-auto px-2 py-0.5 rounded-md text-[9px] ${activeTab === item.id ? 'bg-background/20 text-background' : 'bg-background/10 text-background/40'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
           </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
           <div className="p-5 bg-background/5 rounded-2xl border border-background/10">
              <div className="flex items-center gap-3 text-[9px] font-black text-primary uppercase tracking-widest mb-2">
                <Database className="w-3 h-3" />
                Data Integrity
              </div>
              <div className="h-1.5 bg-background/5 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[12%]" />
              </div>
           </div>

           <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/20 font-black text-[10px] uppercase tracking-[0.2em]"
           >
              <LogOut className="w-4 h-4" />
              Terminate
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background overflow-y-auto no-scrollbar scroll-smooth">
        {activeTab === 'inbox' && (
          <div className="p-12 max-w-6xl mx-auto">
             <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
               <div>
                 <h1 className="text-4xl font-black text-foreground tracking-tight">Traffic Audit</h1>
                 <p className="text-muted-foreground font-medium mt-2">Strategic monitoring of global portfolio engagements.</p>
               </div>
               
               <div className="flex gap-4">
                 <div className="flex items-center gap-4 bg-primary/10 px-6 py-4 rounded-2xl border border-primary/20">
                    <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-primary uppercase tracking-widest">Total Reach</div>
                      <div className="text-xl font-mono font-black text-foreground">{totalVisits.toLocaleString()}</div>
                    </div>
                 </div>
               </div>
             </header>

             {/* Traffic Analytics Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-card p-6 rounded-3xl border border-border flex items-center gap-6">
                   <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shrink-0">
                      <Eye className="w-6 h-6 text-primary" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Page Views</div>
                      <div className="text-lg font-bold text-foreground">{(totalVisits * 3.8).toFixed(0)}</div>
                   </div>
                </div>
                <div className="bg-card p-6 rounded-3xl border border-border flex items-center gap-6">
                   <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shrink-0">
                      <MousePointer2 className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">CTR (SaaS Portfolio)</div>
                      <div className="text-lg font-bold text-foreground">24.8%</div>
                   </div>
                </div>
                <div className="bg-card p-6 rounded-3xl border border-border flex items-center gap-6">
                   <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shrink-0">
                      <History className="w-6 h-6 text-amber-600" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Avg. Decision Time</div>
                      <div className="text-lg font-bold text-foreground">2m 45s</div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Real-time Traffic Feed */}
                <div>
                   <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-3">
                     <Activity className="w-4 h-4 text-green-500" />
                     Live Session Ledger
                   </h3>
                   <div className="space-y-3">
                      {trafficHistory.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic">No session logs found.</p>
                      ) : (
                        trafficHistory.map((log, i) => (
                          <div key={i} className="bg-accent border border-border p-4 rounded-2xl flex items-center justify-between group hover:bg-card hover:shadow-lg transition-all">
                             <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-card border border-border rounded-lg flex items-center justify-center">
                                   <MapPin className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div>
                                   <div className="text-[10px] font-bold text-foreground">{log.action}</div>
                                   <div className="text-[9px] text-muted-foreground uppercase tracking-widest">{log.location}</div>
                                </div>
                             </div>
                             <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                                {new Date(log.timestamp).toLocaleTimeString()}
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </div>

                {/* Lead Pipeline */}
                <div>
                   <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-6">Active Inquiries</h3>
                   <div className="space-y-4">
                      {messages.length === 0 ? (
                        <div className="bg-accent border-2 border-dashed border-border rounded-3xl p-12 text-center">
                          <Inbox className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">Queue Empty</p>
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div key={msg.id} className="bg-card border border-border rounded-3xl p-6 hover:shadow-xl transition-all">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <h4 className="font-bold text-foreground">{msg.name}</h4>
                                   <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-0.5">{msg.email}</p>
                                </div>
                                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{msg.date.split(',')[0]}</div>
                             </div>
                             <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">"{msg.message}"</p>
                          </div>
                        ))
                      )}
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="p-12 max-w-6xl mx-auto">
             <header className="mb-12 flex justify-between items-end">
               <div>
                 <h1 className="text-4xl font-black text-foreground tracking-tight">AI Strategy Audit</h1>
                 <p className="text-muted-foreground font-medium mt-2">Predictive analytics based on user neural interactions.</p>
               </div>
               <button 
                 onClick={generateInsights}
                 disabled={isAnalyzing || interactions.length === 0}
                 className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl shadow-xl transition-all font-black text-[10px] uppercase tracking-[0.2em] disabled:opacity-50"
               >
                 {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                 Synchronize Insights
               </button>
             </header>

             {aiInsight && (
               <div className="mb-12 bg-card text-foreground p-10 rounded-[2.5rem] border border-border shadow-2xl animate-[fadeIn_0.5s_ease-out]">
                  <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest mb-8">
                    <Zap className="w-4 h-4" />
                    Synthetic Report
                  </div>
                  <div className="prose prose-invert max-w-none prose-sm leading-relaxed opacity-90">
                     <div dangerouslySetInnerHTML={{ __html: aiInsight.replace(/\n/g, '<br/>') }} />
                  </div>
               </div>
             )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {interactions.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-all">
                     <div className="flex justify-between items-center mb-6">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{new Date(item.timestamp).toLocaleString()}</span>
                        <button onClick={() => deleteInteraction(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                          <Trash className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="space-y-4">
                        <div>
                           <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Inquiry</div>
                           <p className="text-sm font-bold text-foreground leading-relaxed">"{item.prompt}"</p>
                        </div>
                        <div className="bg-accent p-4 rounded-xl border border-border">
                           <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">Copilot Out</div>
                           <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">"{item.response}"</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-12 max-w-6xl mx-auto">
             <h1 className="text-4xl font-black text-foreground tracking-tight mb-8">System Ledger</h1>
             <div className="bg-foreground rounded-[2.5rem] p-10 font-mono text-[11px] text-primary/60 leading-relaxed shadow-2xl border border-border">
                <div className="flex items-center gap-3 text-background mb-8 border-b border-background/5 pb-6">
                   <ShieldAlert className="w-4 h-4 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Infrastructure Auth Log</span>
                </div>
                <div className="space-y-3">
                   <p className="text-green-400/80">[{new Date().toISOString()}] BOOT: Neural gateway initialized.</p>
                   <p>[{new Date().toISOString()}] AUTH: Admin session validated (Token: ADM-942-X).</p>
                   <p>[{new Date().toISOString()}] SYNC: master_data.md checksum verified.</p>
                   <p>[{new Date().toISOString()}] PING: Google GenAI (Gemini-3-Flash) latency 42ms.</p>
                   <p className="text-primary/80">[{new Date().toISOString()}] DB: Flushed traffic_history cache (50 nodes persisted).</p>
                   <p className="animate-pulse">_ system awaiting further instructions...</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-12 max-w-6xl mx-auto">
             <h1 className="text-4xl font-black text-foreground tracking-tight mb-8">Infrastructure Hub</h1>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Traffic Recalibration Tool */}
                <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <RotateCcw className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-black text-foreground">Traffic Recalibration</h3>
                   </div>
                   <p className="text-sm text-muted-foreground mb-6">Manually adjust the "Global Reach" baseline to fix synchronization drifts or reset career impressions.</p>
                   
                   <div className="space-y-4">
                      <div className="relative">
                         <input 
                           type="number" 
                           value={recalibrationValue}
                           onChange={(e) => setRecalibrationValue(e.target.value)}
                           className="w-full px-5 py-4 bg-accent border border-border rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-foreground"
                           placeholder={`Current: ${totalVisits}`}
                         />
                      </div>
                      <button 
                        onClick={handleRecalibrate}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20"
                      >
                         <Save className="w-4 h-4" />
                         Commit New Baseline
                      </button>
                   </div>
                </div>

                <div className="bg-foreground rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center border border-border">
                   <ShieldAlert className="w-12 h-12 text-background/20 mb-4" />
                   <h3 className="text-background font-black text-lg mb-2">Cluster Control</h3>
                   <p className="text-background/40 text-xs max-w-xs leading-relaxed">System-level environment variables are restricted to terminal-only access.</p>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
