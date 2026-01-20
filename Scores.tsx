import React from 'react';
import { MatchScore, SportCategory } from '../types';

interface ScoresProps {
  scores: MatchScore[];
}

const Scores: React.FC<ScoresProps> = ({ scores }) => {
  return (
    <div className="space-y-12 mt-8">
      <header className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Match Center 2.0</div>
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Live <br /> Broadcasts</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">Elite telemetry and tactical breakdowns. Tracking momentum, probability, and environmental factors across every professional arena.</p>
        </div>
        <div className="flex gap-4 mb-2">
           <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Coverage</p>
             <p className="text-xl font-black text-slate-900 tracking-tighter">98.2%</p>
           </div>
           <div className="bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Arenas</p>
             <p className="text-xl font-black text-slate-900 tracking-tighter">14</p>
           </div>
        </div>
      </header>

      {Object.values(SportCategory).map(sport => {
        const sportMatches = scores.filter(m => m.sport === sport);
        if (sportMatches.length === 0) return null;

        return (
          <section key={sport} className="space-y-8">
            <div className="flex items-center space-x-6">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{sport}</h2>
              <div className="h-px bg-slate-100 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {sportMatches.map(match => (
                <div key={match.id} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                        match.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 
                        match.status === 'Finished' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {match.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <i className="fas fa-wind mr-2 text-slate-200"></i> Clear / 22°C
                      </span>
                    </div>
                    <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
                      <i className="fas fa-map-marker-alt mr-2 text-orange-500/40"></i>
                      <span>{match.venue}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className="w-24 h-24 bg-slate-50 rounded-3xl mb-4 flex items-center justify-center border border-slate-100 p-4 group-hover:scale-110 transition-transform">
                        <img src={match.teamALogo} className="w-full h-full object-contain" />
                      </div>
                      <p className="font-black text-slate-900 text-sm uppercase tracking-tight leading-tight mb-2">{match.teamA}</p>
                      <div className="flex gap-1 justify-center">
                        {['W', 'W', 'D'].map((f, i) => <span key={i} className="w-2 h-2 rounded-full bg-green-400"></span>)}
                      </div>
                    </div>
                    
                    <div className="text-center w-1/3">
                      <span className="text-6xl font-black text-slate-900 tracking-tighter italic">
                        {match.scoreA} <span className="text-slate-200 font-light mx-2">:</span> {match.scoreB}
                      </span>
                      <p className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-[0.3em]">{match.status === 'Live' ? "Minute: 72'" : "Full Time"}</p>
                    </div>

                    <div className="flex flex-col items-center text-center w-1/3">
                      <div className="w-24 h-24 bg-slate-50 rounded-3xl mb-4 flex items-center justify-center border border-slate-100 p-4 group-hover:scale-110 transition-transform">
                        <img src={match.teamBLogo} className="w-full h-full object-contain" />
                      </div>
                      <p className="font-black text-slate-900 text-sm uppercase tracking-tight leading-tight mb-2">{match.teamB}</p>
                      <div className="flex gap-1 justify-center">
                        {['L', 'W', 'W'].map((f, i) => <span key={i} className={`w-2 h-2 rounded-full ${f === 'L' ? 'bg-red-400' : 'bg-green-400'}`}></span>)}
                      </div>
                    </div>
                  </div>

                  {match.stats && (
                    <div className="space-y-8 bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Win Probability</p>
                           <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Home Advantage: 62%</p>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                          <div className="bg-orange-500 h-full" style={{ width: '62%' }}></div>
                          <div className="bg-slate-300 h-full w-px"></div>
                          <div className="bg-slate-400 h-full flex-grow"></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Possession</p>
                          <p className="text-lg font-black text-slate-900">{match.stats.possessionA}% / {match.stats.possessionB}%</p>
                        </div>
                        <div className="text-center border-x border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected Goals</p>
                          <p className="text-lg font-black text-slate-900">2.14 / 1.05</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass Accuracy</p>
                          <p className="text-lg font-black text-slate-900">88% / 82%</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button className="w-full mt-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-xl shadow-slate-900/10">
                    Open Tactical Console
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Scores;