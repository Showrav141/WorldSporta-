
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  users: User[];
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email === email);
    
    // For demo purposes, any valid existing user with password 'password' works
    if (user && password === 'password') {
      if (user.isBlocked) {
        setError('Your account has been blocked by an administrator.');
        return;
      }
      onLogin(user);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const setAdminCredentials = () => {
    setEmail('admin@worldsporta.com');
    setPassword('password');
    setIsAdminMode(true);
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-user-circle text-3xl text-orange-600"></i>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500 mb-8">Sign in to your WorldSporta account to continue.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm mb-6 border border-red-100 flex items-center space-x-2">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="e.g. alex@example.com"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-slate-50 border-slate-200 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="text-left">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 block">Password</label>
              <a href="#" className="text-[10px] font-bold text-orange-500 uppercase hover:underline">Forgot?</a>
            </div>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-slate-50 border-slate-200 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 transition hover:bg-orange-600 active:scale-[0.98]">
            {isAdminMode ? 'Login as Administrator' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Testing Access</p>
            <button 
              onClick={setAdminCredentials}
              className="text-xs font-bold text-slate-600 hover:text-orange-500 flex items-center justify-center w-full transition"
            >
              <i className="fas fa-lock-open mr-2"></i> Use Admin Demo Credentials
            </button>
          </div>
          
          <p className="text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-orange-500 font-bold hover:underline">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
