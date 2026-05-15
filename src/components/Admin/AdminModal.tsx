
import React, { useState } from 'react';
import { X, ShieldCheck, LogOut, Terminal, Activity, Monitor } from 'lucide-react';
import Login from '@/components/Admin/Login';
import Dashboard from '@/components/Admin/Dashboard';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      {/* Global Dashboard Header */}
      <div className="bg-foreground text-background px-8 py-4 flex justify-between items-center border-b border-border shrink-0 z-50">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                 <ShieldCheck className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-lg font-black tracking-tight flex items-center gap-3 text-background">
                  Admin Console
                  <span className="text-[10px] bg-background/10 px-2.5 py-1 rounded-full font-black text-background/60 uppercase tracking-widest border border-background/20">Enterprise v2.0</span>
                </h2>
              </div>
           </div>
           
           {isAuthenticated && (
             <div className="hidden md:flex items-center gap-6 pl-6 border-l border-background/10">
                <div className="flex items-center gap-2 text-[10px] font-black text-green-400 uppercase tracking-widest">
                  <Activity className="w-3.5 h-3.5" />
                  System Healthy
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-background/30 uppercase tracking-widest">
                  <Monitor className="w-3.5 h-3.5" />
                  Session: Secure
                </div>
             </div>
           )}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-background/5 hover:bg-destructive/20 text-background/60 hover:text-destructive-foreground rounded-xl transition-all border border-background/10 font-black text-[10px] uppercase tracking-widest group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Close Panel
          </button>
        </div>
      </div>

      {/* Main Interface Router */}
      <div className="flex-1 overflow-hidden relative">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
};

export default AdminModal;
