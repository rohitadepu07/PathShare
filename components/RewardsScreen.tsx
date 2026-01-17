
import React from 'react';

interface RewardsScreenProps {
  onBack: () => void;
}

const RewardsScreen: React.FC<RewardsScreenProps> = ({ onBack }) => {
  const products = [
    { id: 'p1', name: 'Starbucks Coffee', points: 400, image: 'https://images.unsplash.com/photo-1544787210-2211d44b565a?auto=format&fit=crop&q=80&w=200', tag: 'Limited Time' },
    { id: 'p2', name: 'Eco-Friendly Bottle', points: 800, image: 'https://images.unsplash.com/photo-1602143307185-84487493375e?auto=format&fit=crop&q=80&w=200', tag: 'Staff Pick' },
    { id: 'p3', name: 'Amazon 20% Off', points: 300, image: 'https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?auto=format&fit=crop&q=80&w=200', tag: 'Hot Deal' },
    { id: 'p4', name: 'PathShare T-Shirt', points: 1200, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200', tag: 'Exclusive' }
  ];

  const activity = [
    { id: '1', title: 'Ride with Karan', points: '+35', date: 'Today' },
    { id: '2', title: 'Referral Bonus', points: '+100', date: 'Yesterday' },
    { id: '3', title: 'Coffee Voucher', points: '-400', date: '2 days ago' }
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-950 flex flex-col h-full overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-slate-950 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Rewards</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        {/* Points Balance Card */}
        <div className="bg-gradient-to-br from-[#0d828c] to-[#0b6e77] rounded-[32px] p-8 text-white shadow-xl shadow-[#0d828c]/20 relative overflow-hidden">
           <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[#e0f2f1] text-xs font-bold uppercase tracking-widest opacity-80">Total PathPoints</p>
              <h3 className="text-4xl font-black mt-1">1,245</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-star text-xl text-yellow-300"></i>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 flex items-center justify-between relative z-10">
            <span className="text-xs font-medium">Next Milestone: Gold Member</span>
            <span className="text-xs font-bold">255 to go</span>
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Marketplace</h4>
            <button className="text-[#0d828c] text-[10px] font-bold">VIEW ALL</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-100 dark:border-slate-800 flex flex-col group active:scale-95 transition-all">
                <div className="relative mb-3">
                  <img src={p.image} className="w-full h-28 object-cover rounded-2xl" alt={p.name} />
                  <span className="absolute top-2 left-2 bg-[#0d828c] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    {p.tag}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{p.name}</h5>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#0d828c]">{p.points} Pts</span>
                  <button className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#0d828c] hover:text-white transition-colors">
                    <i className="fa-solid fa-plus text-[8px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4 pb-10">
          <div className="flex justify-between items-center px-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recent Activity</h4>
          </div>

          <div className="space-y-3">
            {activity.map((a) => (
              <div key={a.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.points.startsWith('+') ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                  <i className={`fa-solid ${a.points.startsWith('+') ? 'fa-arrow-trend-up' : 'fa-tag'}`}></i>
                </div>
                <div className="flex-1">
                  <span className="font-bold text-slate-900 dark:text-slate-200 block text-sm">{a.title}</span>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">{a.date}</p>
                </div>
                <span className={`font-black text-sm ${a.points.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {a.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsScreen;
