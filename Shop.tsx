import React, { useState } from 'react';
import { Product, SportCategory } from '../types';

interface ShopProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ products, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-16 mt-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-2xl">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Official Performance Store</div>
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase">Elite <br /> Equipment</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">Engineered for the elite. Tested in the field. Our boutique curated collection brings professional-grade gear to every athlete's arsenal, backed by technical performance data.</p>
        </div>
        <div className="relative group w-full lg:w-96">
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search equipment or pro brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-5 pl-14 pr-6 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:outline-none transition-all shadow-sm font-bold placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
        {['All', ...Object.values(SportCategory)].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-slate-900 text-white shadow-2xl scale-105' 
                : 'bg-white text-slate-500 border-2 border-slate-100 hover:border-orange-500 hover:text-orange-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Buying Intelligence Bar */}
      <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
            <i className="fas fa-info-circle"></i>
          </div>
          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Need help choosing your gear? <span className="text-slate-400 font-bold ml-1">Use our Pro Metric filter to find equipment used by Top 100 athletes.</span></p>
        </div>
        <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline">Launch Guide</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {filtered.map(product => (
          <div key={product.id} className="group flex flex-col">
            <div className="relative h-[450px] rounded-[40px] overflow-hidden bg-slate-100 mb-8">
              <img 
                src={product.image} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                alt={product.name}
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <span className="bg-slate-900/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/10 shadow-xl w-fit">
                  {product.brand}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-widest shadow-xl w-fit flex items-center">
                  <i className="fas fa-medal text-orange-500 mr-2"></i> Pro Series
                </span>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="absolute bottom-8 right-8 bg-orange-500 text-white w-16 h-16 rounded-[28px] flex items-center justify-center shadow-2xl shadow-orange-500/40 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-slate-900 hover:shadow-slate-900/40"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
              </button>
            </div>
            <div className="px-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] block mb-1">{product.category}</span>
                  <h3 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-colors line-clamp-1">{product.name}</h3>
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Elite Usage</p>
                  <p className="text-xs font-black text-slate-900">42% of Pro Tour</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Durability</p>
                  <p className="text-xs font-black text-slate-900">9.2 / 10</p>
                </div>
              </div>

              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-2 border-t border-slate-50 pt-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star text-[10px] ${i < Math.floor(product.rating) ? 'text-orange-500' : 'text-slate-200'}`}></i>
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Verification</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-40 text-center bg-white rounded-[50px] border-2 border-dashed border-slate-200">
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No results found</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Try searching for pro brands like "ProDirect" or "HoopCraft"</p>
          </div>
        )}
      </div>
      
      {/* Premium Club Banner */}
      <section className="bg-slate-900 rounded-[50px] p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          <div>
            <h2 className="text-5xl font-black mb-6 leading-tight uppercase tracking-tighter">Elite <span className="text-orange-500">Membership</span></h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">Access exclusive performance metrics, early product drops, and professional athlete consulting. Members get 15% off all "Pro Series" equipment automatically.</p>
            <div className="flex gap-4">
              <input type="email" placeholder="Professional Email" className="bg-white/10 border-2 border-white/10 rounded-[22px] px-8 py-5 flex-grow focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold placeholder:text-slate-500" />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-12 py-5 rounded-[22px] transition-all shadow-2xl shadow-orange-500/30 uppercase tracking-widest text-xs active:scale-95">Upgrade</button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="relative">
               <div className="absolute inset-0 bg-orange-500 blur-[100px] opacity-20"></div>
               <i className="fas fa-medal text-[18rem] text-white/10 rotate-12 relative z-10"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;