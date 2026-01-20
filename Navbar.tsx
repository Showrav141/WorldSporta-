import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-sm border-b' : 'bg-white py-5'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-orange-500 transition-colors duration-300">
              <i className="fas fa-bolt text-white text-lg"></i>
            </div>
            <span className="ml-3 text-2xl font-extrabold text-slate-900 tracking-tightest">
              WORLD<span className="text-orange-500">SPORTA</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'News', path: '/news' },
              { name: 'Scores', path: '/scores' },
              { name: 'Shop', path: '/shop' },
              { name: 'Game', path: '/game' },
            ].map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-sm font-bold uppercase tracking-widest transition-all relative py-2 ${
                  isActive(link.path) ? 'text-orange-500' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 group">
              <i className="fas fa-shopping-bag text-xl text-slate-700 group-hover:text-orange-500 transition-colors"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="h-6 w-px bg-slate-200"></div>

            {user ? (
              <div className="flex items-center space-x-5">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed In As</span>
                  <span className="text-sm font-extrabold text-slate-900">{user.username}</span>
                </div>
                <div className="flex items-center gap-3">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition" title="Admin Panel">
                      <i className="fas fa-cog"></i>
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                    title="Logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900">Sign In</Link>
                <Link to="/register" className="px-6 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 transition hover:-translate-y-0.5 active:translate-y-0">
                  Join Free
                </Link>
              </div>
            )}
          </div>

          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[99] bg-white pt-24 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="text-2xl font-black text-slate-900" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/news" className="text-2xl font-black text-slate-900" onClick={() => setIsOpen(false)}>News</Link>
            <Link to="/scores" className="text-2xl font-black text-slate-900" onClick={() => setIsOpen(false)}>Scores</Link>
            <Link to="/shop" className="text-2xl font-black text-slate-900" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/game" className="text-2xl font-black text-slate-900" onClick={() => setIsOpen(false)}>Game</Link>
            <div className="h-px bg-slate-100 my-4"></div>
            {user ? (
              <div className="space-y-4">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Account</p>
                <Link to="/orders" className="block text-xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>My Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className="block text-xl font-bold text-slate-900" onClick={() => setIsOpen(false)}>Admin Center</Link>}
                <button onClick={handleLogout} className="text-xl font-bold text-red-500">Log Out</button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login" className="w-full py-4 text-center font-bold border rounded-2xl" onClick={() => setIsOpen(false)}>Sign In</Link>
                <Link to="/register" className="w-full py-4 text-center font-bold bg-orange-500 text-white rounded-2xl" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;