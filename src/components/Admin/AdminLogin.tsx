
import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API check
    setTimeout(() => {
      if (username === 'Abhijeet.maske@yahoo.com' && password === 'Ramsavita@788') {
        onLogin(true);
      } else {
        setError('Invalid administrator credentials.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-2xl p-8 lg:p-10 border border-border animate-[fadeIn_0.4s_ease-out]">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl shadow-primary/20">
              <ShieldCheck className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-3xl font-bold text-foreground tracking-tight">Admin Portal</h3>
            <p className="text-muted-foreground mt-3 text-sm font-medium">Please authenticate to manage your portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-accent border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-card outline-none transition-all font-semibold text-foreground tracking-wider"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-accent border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-card outline-none transition-all font-semibold text-foreground"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-sm font-semibold flex items-center gap-3 animate-[shake_0.4s]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-xl shadow-primary/20 text-base font-bold text-primary-foreground bg-primary hover:brightness-110 active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-border flex items-center justify-center gap-2 text-muted-foreground">
             <Lock className="w-3.5 h-3.5" />
             <p className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Session</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
