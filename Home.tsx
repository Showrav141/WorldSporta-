import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle, MatchScore, Product } from '../types';
import { LEAGUE_STANDINGS } from '../constants';

interface HomeProps {
  news: NewsArticle[];
  scores: MatchScore[];
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ news, scores, products }) => {
  const liveMatches = scores.filter(s => s.status === 'Live');

  return (
    <div className="space-y-24 mt-8">
      {/* Dynamic Professional Hero */}
      <section className="relative h-[650px] rounded-[40px] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1600&q=80" 
          alt="Stadium" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-white">
          <div className="inline-flex items-center space-x-2 bg-orange-500/90 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mb-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">Global Live Feed</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] tracking-tighter uppercase max-w-4xl">
            Where the <br /> <span className="text-orange-500">World Plays</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 font-medium leading-relaxed max-w-xl">
            Experience the arena from your screen. Real-time broadcast scores, 
            exclusive gear, and news driven by elite analysis.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link to="/shop" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-orange-500 hover:text-white transition-all duration-300 transform active:scale-95">
              Explore Store
            </Link>
            <Link to="/scores" className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all duration-300">
              Live Scores
            </Link>
          </div>
        </div>
      </section>

      {/* Global Reach Ticker */}
      <section className="bg-white py-12 px-10 rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Scouts', val: '1,240', sub: 'In 45 countries' },
            { label: 'Live Events', val: '42', sub: 'Streaming now' },
            { label: 'Data Points', val: '8.4M', sub: 'Processed daily' },
            { label: 'Elite Members', val: '245k', sub: 'Global athletes' }
          ].map(stat => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{stat.val}</p>
              <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Broadcast & Standings Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <section className="lg:col-span-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Live Broadcast</h2>
              <p className="text-slate-500 font-medium">Real-time tactical feed</p>
            </div>
            <Link to="/scores" className="group flex items-center text-sm font-black text-orange-500 uppercase tracking-widest">
              Full Center <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {liveMatches.slice(0, 2).map(match => (
              <div key={match.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between w-full mb-8">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full">{match.sport}</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Live: 68'</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex flex-col items-center flex-1">
                    <img src={match.teamALogo} className="w-16 h-16 mb-4 object-contain group-hover:scale-110 transition-transform" />
                    <p className="font-extrabold text-slate-900 text-xs uppercase text-center">{match.teamA}</p>
                  </div>
                  <div className="text-center px-4">
                    <span className="text-4xl font-black text-slate-900 italic">{match.scoreA} : {match.scoreB}</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <img src={match.teamBLogo} className="w-16 h-16 mb-4 object-contain group-hover:scale-110 transition-transform" />
                    <p className="font-extrabold text-slate-900 text-xs uppercase text-center">{match.teamB}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm h-full">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight flex items-center">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full mr-3"></span>
              Pro Standings
            </h3>
            <div className="space-y-6">
              {LEAGUE_STANDINGS.map((team) => (
                <div key={team.rank} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-black text-slate-300 group-hover:text-orange-500 transition-colors">0{team.rank}</span>
                    <span className="font-black text-slate-800 text-sm truncate w-32">{team.team}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-black text-slate-900">{team.points} <span className="text-[10px] text-slate-400 font-bold ml-1">pts</span></span>
                    <div className="flex gap-1">
                      {team.form.slice(-3).map((f, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full ${f === 'W' ? 'bg-green-400' : f === 'L' ? 'bg-red-400' : 'bg-slate-300'}`}></span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 text-[10px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-[0.3em] border-t border-slate-50 transition-colors">
              Full League Index
            </button>
          </div>
        </section>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Front Page</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {news.slice(0, 4).map((article, idx) => (
              <Link to="/news" key={article.id} className={`group flex flex-col ${idx === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`overflow-hidden rounded-[32px] bg-slate-100 mb-6 ${idx === 0 ? 'h-[450px]' : 'h-64'}`}>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-orange-500 text-white font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{article.readTime}</span>
                  </div>
                  <h3 className={`font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-colors ${idx === 0 ? 'text-4xl' : 'text-2xl'}`}>
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                    {article.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <aside className="lg:col-span-4 space-y-16">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-4">Interactive Zone</p>
              <h3 className="text-3xl font-black mb-4 leading-tight">Pro Reflex <br /> Challenge</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Test your elite athleticism. Maintain the flow, reach the high score.</p>
              <Link to="/game" className="inline-block bg-white text-slate-900 font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-xl">
                Enter Arena
              </Link>
            </div>
            <i className="fas fa-basketball absolute -right-12 -bottom-12 text-[12rem] text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]"></i>
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center uppercase tracking-tight">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full mr-3"></span>
              Trending Drops
            </h3>
            <div className="space-y-8">
              {products.slice(0, 3).map(p => (
                <Link to="/shop" key={p.id} className="flex items-center group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="ml-5">
                    <h4 className="font-black text-slate-800 text-sm leading-tight group-hover:text-orange-500 transition-colors line-clamp-1">{p.name}</h4>
                    <p className="text-orange-500 font-black text-lg mt-1 tracking-tighter">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/shop" className="block text-center mt-12 text-[10px] font-black text-slate-400 hover:text-orange-500 uppercase tracking-[0.3em] transition-colors">
              Browse Boutique <i className="fas fa-chevron-right ml-1"></i>
            </Link>
          </div>
        </aside>
      </div>

      {/* Athlete Spotlight Section */}
      <section className="bg-slate-900 rounded-[50px] p-20 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="inline-block bg-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest mb-8">Performance Profile</div>
            <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">Evolution of the <br /> <span className="text-orange-500">Elite Midfielder</span></h2>
            <div className="space-y-6 text-slate-400 font-medium leading-relaxed mb-10">
              <p>In the modern era, the midfielder is no longer just a conduit—they are the system. Statistical deep-dives show a 30% increase in high-intensity sprints for Box-to-Box roles compared to 2015.</p>
              <p>We analyze the biomechanics of the world's leading playmakers to understand how rapid decision-making correlates with metabolic efficiency.</p>
            </div>
            <button className="bg-white text-slate-900 font-black px-12 py-5 rounded-2xl uppercase tracking-widest text-xs shadow-2xl hover:bg-orange-500 hover:text-white transition-all">
              Read Deep Analysis
            </button>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
             {[
               { icon: 'fa-heartbeat', label: 'HR Peak', val: '192 BPM' },
               { icon: 'fa-running', label: 'Distance', val: '12.4 KM' },
               { icon: 'fa-brain', label: 'Decisions', val: '1.2s avg' },
               { icon: 'fa-bolt', label: 'Top Speed', val: '34.8 km/h' }
             ].map(stat => (
               <div key={stat.label} className="bg-white/5 border border-white/10 p-8 rounded-[32px] text-center backdrop-blur-md">
                 <i className={`fas ${stat.icon} text-orange-500 text-2xl mb-4`}></i>
                 <p className="text-3xl font-black text-white mb-1 tracking-tighter">{stat.val}</p>
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;