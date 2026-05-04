
import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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
      if (username === 'admin' && password === 'admin123') {
        onLogin(true);
      } else {
        setError('Invalid administrator credentials.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100 dark:border-white/5 animate-[fadeIn_0.4s_ease-out]">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl shadow-blue-200 dark:shadow-blue-900/20">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Portal</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm font-medium">Please authenticate to manage your portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="text"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-semibold text-gray-900 dark:text-white"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-semibold text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 animate-[shake_0.4s]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-xl shadow-blue-500/20 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-center gap-2 text-gray-400">
             <Lock className="w-3.5 h-3.5" />
             <p className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Session</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
