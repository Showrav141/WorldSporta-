import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { NewsArticle, MatchScore, Product, Order, User, SportCategory, MatchStats } from '../types';

interface AdminProps {
  news: NewsArticle[];
  setNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  scores: MatchScore[];
  setScores: React.Dispatch<React.SetStateAction<MatchScore[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AdminDashboard: React.FC<AdminProps> = ({ 
  news, setNews, 
  scores, setScores, 
  products, setProducts, 
  orders, setOrders, 
  users, setUsers 
}) => {
  const location = useLocation();

  const Stats = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Users', val: users.length, icon: 'fa-users', color: 'bg-blue-500' },
          { label: 'News Feed', val: news.length, icon: 'fa-newspaper', color: 'bg-orange-500' },
          { label: 'Live Events', val: scores.filter(s => s.status === 'Live').length, icon: 'fa-satellite-dish', color: 'bg-green-500' },
          { label: 'Shop Revenue', val: `$${orders.reduce((a, b) => a + b.total, 0).toFixed(0)}`, icon: 'fa-shopping-bag', color: 'bg-purple-500' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center space-x-6">
            <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/10`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NewsManagement = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [cat, setCat] = useState(SportCategory.FOOTBALL);
    const [readTime, setReadTime] = useState('5 min read');
    const [tags, setTags] = useState('');

    const handleAdd = () => {
      if (!title || !content) return;
      
      // Select high-quality Unsplash image based on category
      const sportImages: Record<string, string> = {
        [SportCategory.FOOTBALL]: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
        [SportCategory.BASKETBALL]: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
        [SportCategory.TENNIS]: 'https://images.unsplash.com/photo-1595435063121-657f2084c8a5',
        [SportCategory.CRICKET]: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
        [SportCategory.OTHER]: 'https://images.unsplash.com/photo-1461896756913-6611c851c890'
      };

      const art: NewsArticle = {
        id: Date.now().toString(),
        title, content,
        category: cat,
        image: `${sportImages[cat]}?auto=format&fit=crop&w=1200&q=80`,
        author: 'Chief Administrator',
        date: new Date().toISOString(),
        readTime: readTime,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        comments: []
      };
      setNews([art, ...news]);
      setTitle(''); setContent(''); setTags('');
    };

    return (
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase">Editorial Composer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Headlines</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="Enter powerful headline..." value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Sport Discipline</label>
              <select className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" value={cat} onChange={e => setCat(e.target.value as SportCategory)}>
                {Object.values(SportCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Estimated Read</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="e.g. 10 min read" value={readTime} onChange={e => setReadTime(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Metadata Tags (CSV)</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="PRO, CHAMPIONS, LIVE" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Editorial Body</label>
              <textarea className="w-full border-2 border-slate-50 p-8 rounded-2xl h-64 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="Develop the story..." value={content} onChange={e => setContent(e.target.value)} />
            </div>
          </div>
          <button onClick={handleAdd} className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-orange-500 transition-all shadow-2xl shadow-slate-900/10 uppercase tracking-widest text-sm active:scale-95">Publish to Global Network</button>
        </div>

        <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight uppercase">Editorial Archive</h3>
          <div className="space-y-6">
            {news.map(n => (
              <div key={n.id} className="group flex justify-between items-center p-6 border border-slate-50 rounded-3xl bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                    <img src={n.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 tracking-tight group-hover:text-orange-500 transition-colors">{n.title}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{n.category} &bull; {n.readTime}</p>
                  </div>
                </div>
                <button onClick={() => setNews(news.filter(x => x.id !== n.id))} className="text-slate-300 hover:text-red-500 transition-colors p-4">
                  <i className="fas fa-trash-alt text-xl"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ScoresManagement = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [teamALogo, setTeamALogo] = useState('');
    const [teamBLogo, setTeamBLogo] = useState('');
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [status, setStatus] = useState<'Live' | 'Finished' | 'Upcoming'>('Upcoming');
    const [sport, setSport] = useState(SportCategory.FOOTBALL);
    const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 16));
    const [venue, setVenue] = useState('');

    const resetForm = () => {
      setEditingId(null);
      setTeamA('');
      setTeamB('');
      setTeamALogo('');
      setTeamBLogo('');
      setScoreA(0);
      setScoreB(0);
      setStatus('Upcoming');
      setSport(SportCategory.FOOTBALL);
      setStartTime(new Date().toISOString().slice(0, 16));
      setVenue('');
    };

    const handleSave = () => {
      if (!teamA || !teamB || !venue) return;
      
      const scoreData: MatchScore = {
        id: editingId || Date.now().toString(),
        teamA, teamB,
        teamALogo, teamBLogo,
        scoreA, scoreB,
        status, sport,
        startTime: new Date(startTime).toISOString(),
        venue,
        stats: editingId ? scores.find(s => s.id === editingId)?.stats : {
          possessionA: 50, possessionB: 50, shotsA: 0, shotsB: 0
        }
      };

      if (editingId) {
        setScores(prev => prev.map(s => s.id === editingId ? scoreData : s));
      } else {
        setScores(prev => [scoreData, ...prev]);
      }
      resetForm();
    };

    const handleEdit = (match: MatchScore) => {
      setEditingId(match.id);
      setTeamA(match.teamA);
      setTeamB(match.teamB);
      setTeamALogo(match.teamALogo || '');
      setTeamBLogo(match.teamBLogo || '');
      setScoreA(match.scoreA);
      setScoreB(match.scoreB);
      setStatus(match.status);
      setSport(match.sport);
      setStartTime(new Date(match.startTime).toISOString().slice(0, 16));
      setVenue(match.venue);
    };

    return (
      <div className="space-y-12">
        <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase">{editingId ? 'Edit Event Metadata' : 'Broadcast New Event'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Home Side</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="Enter Home Team..." value={teamA} onChange={e => setTeamA(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Away Side</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="Enter Away Team..." value={teamB} onChange={e => setTeamB(e.target.value)} />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Home Crest CDN</label>
              <div className="flex gap-4">
                <input className="flex-grow border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="https://..." value={teamALogo} onChange={e => setTeamALogo(e.target.value)} />
                <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-3 shadow-inner">
                  {teamALogo ? <img src={teamALogo} className="w-full h-full object-contain" /> : <i className="fas fa-shield-alt text-slate-200"></i>}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Away Crest CDN</label>
              <div className="flex gap-4">
                <input className="flex-grow border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="https://..." value={teamBLogo} onChange={e => setTeamBLogo(e.target.value)} />
                <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-3 shadow-inner">
                  {teamBLogo ? <img src={teamBLogo} className="w-full h-full object-contain" /> : <i className="fas fa-shield-alt text-slate-200"></i>}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Home Score</label>
              <input type="number" className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-black text-2xl transition-all" value={scoreA} onChange={e => setScoreA(parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Away Score</label>
              <input type="number" className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-black text-2xl transition-all" value={scoreB} onChange={e => setScoreB(parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Event Status</label>
              <select className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" value={status} onChange={e => setStatus(e.target.value as any)}>
                <option value="Upcoming">Upcoming Broadcast</option>
                <option value="Live">Live Stream</option>
                <option value="Finished">Event Archive</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Sport Discipline</label>
              <select className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" value={sport} onChange={e => setSport(e.target.value as SportCategory)}>
                {Object.values(SportCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Kickoff Window</label>
              <input type="datetime-local" className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3 block">Arena Venue</label>
              <input className="w-full border-2 border-slate-50 p-5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 bg-slate-50 font-bold transition-all" placeholder="Arena name..." value={venue} onChange={e => setVenue(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={handleSave} className="flex-grow bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-orange-500 transition-all shadow-2xl shadow-slate-900/10 uppercase tracking-widest text-sm active:scale-95">
              {editingId ? 'Update Broadcast' : 'Initiate Broadcast'}
            </button>
            {editingId && (
              <button onClick={resetForm} className="px-12 bg-slate-100 text-slate-600 font-black py-6 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-sm">
                Discard
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight uppercase">Event Registry</h3>
          <div className="space-y-6">
            {scores.map(s => (
              <div key={s.id} className="group flex flex-col md:flex-row justify-between items-center p-8 border border-slate-50 rounded-[32px] bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 gap-8">
                <div className="flex flex-col md:flex-row items-center md:space-x-12 text-center md:text-left flex-grow">
                  <div className="min-w-[120px]">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-xl shadow-sm ${s.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>{s.status}</span>
                    <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.2em]">{s.sport}</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-end space-x-4 w-40">
                      <span className="font-black text-slate-900 tracking-tight truncate">{s.teamA}</span>
                      <div className="w-12 h-12 rounded-xl bg-white p-2 border border-slate-100 shrink-0 flex items-center justify-center shadow-sm">
                        {s.teamALogo ? <img src={s.teamALogo} className="w-full h-full object-contain" /> : <i className="fas fa-shield-alt text-slate-200"></i>}
                      </div>
                    </div>
                    <span className="text-4xl font-black text-slate-900 bg-white px-6 py-2 rounded-2xl border border-slate-100 shadow-inner italic tracking-tighter">{s.scoreA} : {s.scoreB}</span>
                    <div className="flex items-center justify-start space-x-4 w-40">
                      <div className="w-12 h-12 rounded-xl bg-white p-2 border border-slate-100 shrink-0 flex items-center justify-center shadow-sm">
                        {s.teamBLogo ? <img src={s.teamBLogo} className="w-full h-full object-contain" /> : <i className="fas fa-shield-alt text-slate-200"></i>}
                      </div>
                      <span className="font-black text-slate-900 tracking-tight truncate">{s.teamB}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest space-y-1">
                    <p><i className="fas fa-map-marker-alt mr-2 text-orange-500/40"></i> {s.venue}</p>
                    <p><i className="fas fa-clock mr-2 text-orange-500/40"></i> {new Date(s.startTime).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button onClick={() => handleEdit(s)} className="w-14 h-14 bg-white text-slate-900 rounded-2xl border border-slate-100 shadow-sm hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => setScores(scores.filter(x => x.id !== s.id))} className="w-14 h-14 bg-white text-slate-900 rounded-2xl border border-slate-100 shadow-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const UserManagement = () => (
    <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
      <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight uppercase">User Database</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-[0.3em]">
              <th className="pb-8 pl-4">Athlete Identity</th>
              <th className="pb-8">Email Portal</th>
              <th className="pb-8">Access Level</th>
              <th className="pb-8">Clearance</th>
              <th className="pb-8 text-right pr-4">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="py-8 pl-4">
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg">
                      {u.username[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="font-black text-slate-900 tracking-tight text-lg">{u.username}</span>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Joined {new Date(u.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-8 font-bold text-slate-500">{u.email}</td>
                <td className="py-8">
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${u.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-8">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${u.isBlocked ? 'text-red-500' : 'text-green-500'} flex items-center`}>
                    <span className={`w-2 h-2 rounded-full mr-3 ${u.isBlocked ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></span>
                    {u.isBlocked ? 'Access Restricted' : 'Active Clearance'}
                  </span>
                </td>
                <td className="py-8 text-right pr-4">
                  {u.role !== 'admin' && (
                    <button 
                      onClick={() => setUsers(users.map(x => x.id === u.id ? { ...x, isBlocked: !x.isBlocked } : x))}
                      className={`text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl border-2 transition-all ${u.isBlocked ? 'border-green-100 text-green-600 hover:bg-green-600 hover:text-white' : 'border-red-100 text-red-600 hover:bg-red-600 hover:text-white'} active:scale-95`}
                    >
                      {u.isBlocked ? 'Restore Access' : 'Restrict Athlete'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-16 mt-8">
      <aside className="lg:w-80 shrink-0 space-y-4">
        <div className="p-8 bg-slate-900 rounded-[40px] text-white mb-10 shadow-2xl shadow-slate-900/20">
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-2">Systems</p>
          <h4 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Command Center</h4>
        </div>
        <div className="space-y-3">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-5 p-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all duration-300 ${location.pathname === '/admin' ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20 translate-x-2' : 'text-slate-500 hover:bg-white hover:shadow-lg'}`}
          >
            <i className="fas fa-th-large text-lg"></i>
            <span>Overview</span>
          </Link>
          <Link 
            to="/admin/news" 
            className={`flex items-center space-x-5 p-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all duration-300 ${location.pathname === '/admin/news' ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20 translate-x-2' : 'text-slate-500 hover:bg-white hover:shadow-lg'}`}
          >
            <i className="fas fa-edit text-lg"></i>
            <span>Editorial</span>
          </Link>
          <Link 
            to="/admin/scores" 
            className={`flex items-center space-x-5 p-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all duration-300 ${location.pathname === '/admin/scores' ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20 translate-x-2' : 'text-slate-500 hover:bg-white hover:shadow-lg'}`}
          >
            <i className="fas fa-trophy text-lg"></i>
            <span>Events</span>
          </Link>
          <Link 
            to="/admin/users" 
            className={`flex items-center space-x-5 p-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all duration-300 ${location.pathname === '/admin/users' ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/20 translate-x-2' : 'text-slate-500 hover:bg-white hover:shadow-lg'}`}
          >
            <i className="fas fa-id-badge text-lg"></i>
            <span>Roster</span>
          </Link>
        </div>
        <div className="pt-16">
          <Link to="/" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center hover:text-orange-500 px-5 transition-colors">
            <i className="fas fa-arrow-left mr-3"></i> Return to Stadium
          </Link>
        </div>
      </aside>
      
      <div className="flex-grow space-y-16 min-w-0">
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="/news" element={<NewsManagement />} />
          <Route path="/scores" element={<ScoresManagement />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;