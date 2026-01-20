
import React, { useState } from 'react';
import { Order, User } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  user: User;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, user }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const userOrders = orders.filter(o => o.userId === user.id);

  const toggleOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Order History</h1>
        <p className="text-slate-500 mt-2 text-lg">Manage and track your recent purchases from WorldSporta.</p>
      </header>

      {userOrders.length === 0 ? (
        <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-history text-3xl text-slate-200"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">No orders found</h2>
          <p className="text-slate-400 mt-2">You haven't placed any orders yet. Head over to our shop to get started!</p>
          <a href="#/shop" className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:bg-orange-600 transition">Explore Shop</a>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
              <div 
                className={`p-6 md:p-8 cursor-pointer hover:bg-slate-50 transition flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${expandedOrderId === order.id ? 'bg-slate-50/50' : ''}`}
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</span>
                    <span className="font-mono text-sm font-bold text-slate-900">{order.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Placed on {new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 text-right">Total Amount</p>
                    <p className="text-xl font-black text-slate-900 tracking-tighter">${order.total.toFixed(2)}</p>
                  </div>
                  
                  <div className="min-w-[100px] text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className={`transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down text-slate-300"></i>
                  </div>
                </div>
              </div>

              {expandedOrderId === order.id && (
                <div className="px-8 pb-8 pt-4 border-t border-slate-100 bg-white">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Order Contents</h4>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-50">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-100">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.brand} &bull; Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-[10px] text-slate-400 font-medium">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shipping Address</h5>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {user.username}<br />
                        123 Stadium Way, Sportsville<br />
                        Athlete Heights, SP 54321
                      </p>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-6 text-white text-center flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Need Help?</p>
                      <button className="text-sm font-bold hover:text-orange-500 transition">Contact Support for Order {order.id}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
