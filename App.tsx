
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import News from './pages/News.tsx';
import Scores from './pages/Scores.tsx';
import Shop from './pages/Shop.tsx';
import Game from './pages/Game.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Cart from './pages/Cart.tsx';
import OrderHistory from './pages/OrderHistory.tsx';
import { User, NewsArticle, MatchScore, Product, Order, CartItem } from './types.ts';
import { INITIAL_NEWS, INITIAL_SCORES, INITIAL_PRODUCTS } from './constants.tsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ws_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error parsing user from localStorage", e);
      return null;
    }
  });

  // Global App State (Simulated Database)
  const [news, setNews] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('ws_news');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_NEWS;
    } catch (e) {
      return INITIAL_NEWS;
    }
  });

  const [scores, setScores] = useState<MatchScore[]>(() => {
    try {
      const saved = localStorage.getItem('ws_scores');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_SCORES;
    } catch (e) {
      return INITIAL_SCORES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ws_products');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ws_orders');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('ws_users');
      const parsed = saved ? JSON.parse(saved) : null;
      const defaultUsers: User[] = [
        { id: '1', username: 'admin', email: 'admin@worldsporta.com', role: 'admin', isBlocked: false, createdAt: new Date().toISOString() }
      ];
      return Array.isArray(parsed) ? parsed : defaultUsers;
    } catch (e) {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('ws_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ws_news', JSON.stringify(news));
    localStorage.setItem('ws_scores', JSON.stringify(scores));
    localStorage.setItem('ws_products', JSON.stringify(products));
    localStorage.setItem('ws_orders', JSON.stringify(orders));
    localStorage.setItem('ws_users', JSON.stringify(users));
  }, [news, scores, products, orders, users]);

  // Auth Handlers
  const login = (user: User) => setCurrentUser(user);
  const logout = () => {
    setCurrentUser(null);
    setCart([]);
  };

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar 
          user={currentUser} 
          onLogout={logout} 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        />
        
        <main className="flex-grow pt-24 container mx-auto px-6 pb-20">
          <Routes>
            <Route path="/" element={<Home news={news} scores={scores} products={products} />} />
            <Route path="/news" element={<News articles={news} setArticles={setNews} currentUser={currentUser} />} />
            <Route path="/scores" element={<Scores scores={scores} />} />
            <Route path="/shop" element={<Shop products={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onClear={clearCart} onCheckout={(order) => setOrders(prev => [order, ...prev])} user={currentUser} />} />
            <Route path="/orders" element={currentUser ? <OrderHistory orders={orders} user={currentUser} /> : <Navigate to="/login" />} />
            <Route path="/game" element={<Game />} />
            
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login users={users} onLogin={login} />} />
            <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register users={users} setUsers={setUsers} onLogin={login} />} />
            
            <Route 
              path="/admin/*" 
              element={currentUser?.role === 'admin' ? (
                <AdminDashboard 
                  news={news} setNews={setNews} 
                  scores={scores} setScores={setScores}
                  products={products} setProducts={setProducts}
                  orders={orders} setOrders={setOrders}
                  users={users} setUsers={setUsers}
                />
              ) : <Navigate to="/" />} 
            />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 text-white py-24">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-3xl font-black mb-8 tracking-tighter">WORLD<span className="text-orange-500">SPORTA</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">The premier destination for the modern athlete. Intelligence-driven news, real-time broadcasts, and elite equipment boutique.</p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <ul className="text-slate-300 text-sm font-bold space-y-4">
                <li><Link to="/" className="hover:text-white transition-colors">Home Base</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">Editorial Feed</Link></li>
                <li><Link to="/scores" className="hover:text-white transition-colors">Live Broadcast</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Support</h4>
              <ul className="text-slate-300 text-sm font-bold space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Concierge</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pro Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Play</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Connect</h4>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"><i className="fab fa-twitter text-lg"></i></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"><i className="fab fa-instagram text-lg"></i></a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-orange-500 transition-all duration-300"><i className="fab fa-youtube text-lg"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 container mx-auto px-6 mt-20 pt-10 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.5em]">
            &copy; 2025 WorldSporta Global Authority. All Rights Reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}
