
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, User, Order } from '../types';

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: (order: Order) => void;
  user: User | null;
}

const Cart: React.FC<CartProps> = ({ cart, onRemove, onClear, onCheckout, user }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const newOrder: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user.id,
      items: [...cart],
      total: total,
      status: 'Pending',
      date: new Date().toISOString()
    };
    
    onCheckout(newOrder);
    onClear();
    alert("Order placed successfully!");
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-shopping-bag text-3xl text-slate-300"></i>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any sports gear yet.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-200 transition"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h1 className="text-4xl font-black text-slate-900">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center space-x-6 shadow-sm">
              <img src={item.image} className="w-24 h-24 rounded-2xl object-cover" />
              <div className="flex-grow">
                <h3 className="font-bold text-slate-900 text-lg">{item.name}</h3>
                <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                <p className="text-orange-500 font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button 
                onClick={() => onRemove(item.id)}
                className="text-slate-300 hover:text-red-500 transition"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button 
            onClick={onClear}
            className="text-sm font-bold text-slate-400 hover:text-slate-600"
          >
            Clear Entire Cart
          </button>
        </div>

        <aside className="bg-slate-900 rounded-3xl p-8 text-white h-fit shadow-2xl">
          <h2 className="text-xl font-bold mb-8">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="border-t border-slate-800 pt-4 flex justify-between text-xl font-black">
              <span>Total</span>
              <span className="text-orange-500">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition shadow-xl shadow-orange-900/20"
          >
            Proceed to Checkout
          </button>
          
          <div className="mt-8 flex items-center justify-center space-x-4 opacity-50 grayscale">
            <i className="fab fa-cc-visa text-2xl"></i>
            <i className="fab fa-cc-mastercard text-2xl"></i>
            <i className="fab fa-cc-apple-pay text-2xl"></i>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
