
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface RegisterProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onLogin: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ users, setUsers, onLogin }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (users.find(u => u.email === form.email)) {
      alert("User already exists.");
      return;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: form.username,
      email: form.email,
      role: 'user',
      isBlocked: false,
      createdAt: new Date().toISOString()
    };
    
    setUsers([...users, newUser]);
    onLogin(newUser);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Join the Club</h1>
        <p className="text-slate-500 mb-8">Create your free WorldSporta account.</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Username</label>
            <input 
              type="text" required
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
            />
          </div>
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
            <input 
              type="email" required
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div className="text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
            <input 
              type="password" required
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 transition hover:bg-orange-600 mt-4">Get Started</button>
        </form>
        
        <p className="mt-8 text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-orange-500 font-bold hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
