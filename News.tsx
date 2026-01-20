
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle, SportCategory, User } from '../types.ts';
import { generateSportsNews } from '../services/geminiService.ts';

interface NewsProps {
  articles: NewsArticle[];
  setArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  currentUser: User | null;
}

const News: React.FC<NewsProps> = ({ articles, setArticles, currentUser }) => {
  const [filter, setFilter] = useState<string>('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [commentText, setCommentText] = useState('');

  const filtered = filter === 'All' ? articles : articles.filter(a => a.category === filter);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const category = SportCategory.FOOTBALL;
    const data = await generateSportsNews(category);
    
    const imageUrl = `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80&sig=${Date.now()}`;
    
    const newArticle: NewsArticle = {
      id: Date.now().toString(),
      title: data.title || "Elite Performance Update",
      content: data.content || "Fresh tactical insights and professional updates just arrived from our AI desk.",
      image: imageUrl,
      category: category,
      author: "Gemini Intelligence",
      date: new Date().toISOString(),
      readTime: '3 min read',
      tags: ['AI-Driven', 'Strategic'],
      comments: []
    };
    
    setArticles([newArticle, ...articles]);
    setIsGenerating(false);
  };

  const addComment = (articleId: string) => {
    if (!commentText.trim() || !currentUser) return;
    
    const newComment = {
      id: Date.now().toString(),
      username: currentUser.username,
      text: commentText,
      date: new Date().toISOString()
    };
    
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, comments: [newComment, ...a.comments] } : a
    ));
    setCommentText('');
  };

  return (
    <div className="space-y-16 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="max-w-2xl">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Global Editorial</div>
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Breaking <br /> Headlines</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">Deep analysis and high-fidelity reporting. Powered by a global intelligence network and tactical AI evaluation.</p>
        </div>
        
        <button 
          onClick={handleGenerateAI}
          disabled={isGenerating}
          className="flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl disabled:opacity-50"
        >
          {isGenerating ? <i className="fas fa-spinner fa-spin mr-3"></i> : <i className="fas fa-microchip mr-3 text-orange-400"></i>}
          AI Analysis Desk
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4 custom-scrollbar">
            {['All', ...Object.values(SportCategory)].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  filter === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-400 border border-slate-100 hover:text-orange-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filtered.map(article => (
              <div key={article.id} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={article.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest">Verfied Editorial</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{article.category}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight mb-6 group-hover:text-orange-500 transition-colors">{article.title}</h3>
                  <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-orange-500 mb-6">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expert Verdict</p>
                     <p className="text-xs text-slate-600 italic font-medium">"A pivotal moment for tactical evolution in this league."</p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">{article.content}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-8 border-t border-slate-50">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{article.author}</span>
                    <button onClick={() => setSelectedArticle(article)} className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">Full Analysis</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Market Trends</h3>
            <div className="space-y-6">
              {[
                { topic: '#TransferRumors', volume: '14.2k mentions', trend: 'up' },
                { topic: '#GrandSlamDraft', volume: '8.1k mentions', trend: 'up' },
                { topic: '#OlympicPrep', volume: '22k mentions', trend: 'neutral' },
                { topic: '#VARMetics', volume: '4.5k mentions', trend: 'down' }
              ].map(trend => (
                <div key={trend.topic} className="flex justify-between items-center">
                   <div>
                     <p className="text-sm font-black text-slate-800">{trend.topic}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{trend.volume}</p>
                   </div>
                   <i className={`fas fa-caret-${trend.trend} ${trend.trend === 'up' ? 'text-green-500' : trend.trend === 'down' ? 'text-red-500' : 'text-slate-300'}`}></i>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[40px] text-white">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Pro Digest</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">Get the weekly tactical intelligence report delivered to your inbox every Monday at 08:00 UTC.</p>
            <input type="email" placeholder="Professional Email" className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 mb-4 text-sm font-bold placeholder:text-slate-500 focus:outline-none" />
            <button className="w-full bg-orange-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-colors">Subscribe</button>
          </div>
        </aside>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[50px] overflow-hidden flex flex-col shadow-2xl">
            <div className="relative h-[450px] shrink-0">
              <img src={selectedArticle.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <button onClick={() => setSelectedArticle(null)} className="absolute top-8 right-8 bg-white/10 backdrop-blur-md text-white w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20"><i className="fas fa-times text-xl"></i></button>
              <div className="absolute bottom-12 left-12 right-12">
                <h2 className="text-5xl font-black text-white leading-tight tracking-tighter uppercase">{selectedArticle.title}</h2>
              </div>
            </div>
            <div className="p-12 overflow-y-auto custom-scrollbar bg-white">
              <div className="prose prose-slate max-w-none text-slate-600 text-xl leading-relaxed mb-20 font-medium">
                {selectedArticle.content.split('\n').map((para, i) => <p key={i} className="mb-8">{para}</p>)}
              </div>
              <div className="bg-slate-50 rounded-[40px] p-12">
                 <h3 className="text-3xl font-black mb-10 tracking-tighter uppercase">Athlete Discussion</h3>
                 {currentUser ? (
                    <div className="mb-12 flex gap-4">
                       <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add your tactical view..."
                        className="flex-grow bg-white border border-slate-200 rounded-3xl p-6 focus:outline-none h-32 font-bold"
                       ></textarea>
                       <button onClick={() => addComment(selectedArticle.id)} className="bg-slate-900 text-white px-10 rounded-3xl font-black uppercase tracking-widest text-[10px] h-32 hover:bg-orange-500 transition-colors">Post</button>
                    </div>
                 ) : null}
                 <div className="space-y-6">
                    {selectedArticle.comments.map(c => (
                      <div key={c.id} className="bg-white p-8 rounded-[32px] border border-slate-100 flex gap-6">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black shrink-0">{c.username[0]}</div>
                        <div>
                           <p className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1">{c.username}</p>
                           <p className="text-slate-500 font-medium leading-relaxed">{c.text}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
