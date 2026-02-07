
import React, { useState } from 'react';
import NotificationOverlay from './NotificationOverlay';

interface HomeScreenProps {
  onOpenSidebar: () => void;
  onSearchClick: () => void;
  onOfferClick: () => void;
  onFreeTripsClick?: () => void;
  onFrndCirclesClick?: () => void;
  onAccountClick?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onOpenSidebar, 
  onSearchClick, 
  onOfferClick, 
  onFreeTripsClick, 
  onFrndCirclesClick,
  onAccountClick
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <button onClick={onOpenSidebar} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 active:scale-90 transition-transform">
          <i className="fa-solid fa-bars-staggered text-xl"></i>
        </button>
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-2xl tracking-tighter dark:text-white">path<span className="text-[#0d828c]">share</span></span>
        </div>
        <button 
          onClick={() => setIsNotifOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 active:scale-90 transition-transform relative"
        >
          <i className="fa-solid fa-bell"></i>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
        {/* Banner */}
        <div className="mt-4 bg-gray-900 dark:bg-slate-900 rounded-3xl p-6 relative overflow-hidden text-white shadow-xl">
          <div className="relative z-10 max-w-[75%]">
            <h3 className="text-xl font-bold leading-tight">Don’t just travel, travel together.</h3>
            <p className="text-gray-400 text-sm mt-2">Earn community points for every empty seat you share.</p>
            <button 
              onClick={onOfferClick}
              className="mt-4 px-4 py-2 bg-[#0d828c] rounded-xl text-sm font-semibold active:scale-95 transition-transform"
            >
              Offer Ride
            </button>
          </div>
        </div>

        {/* Quick Actions - 3 Column Grid */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <button 
            onClick={onSearchClick}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-lg"></i>
            </div>
            <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">Find Ride</span>
          </button>
          <button 
            onClick={onOfferClick}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-car text-lg"></i>
            </div>
            <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">Offer Ride</span>
          </button>
          <button 
            onClick={onFrndCirclesClick}
            className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-users-between-lines text-lg"></i>
            </div>
            <span className="font-bold text-[11px] text-slate-800 dark:text-slate-200">Circles</span>
          </button>
        </div>

        {/* FrndCircles Widget */}
        <div className="mt-10 bg-[#0d828c]/5 dark:bg-slate-900/40 p-5 rounded-[32px] border border-[#0d828c]/10 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-bold dark:text-white leading-tight">Your Trusted Circle</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">3 Friends Active Now</p>
            </div>
            <button onClick={onFrndCirclesClick} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#0d828c]">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {[
              { name: 'Rahul', avatar: 'https://picsum.photos/seed/rahul/100/100' },
              { name: 'Sneha', avatar: 'https://picsum.photos/seed/sneha/100/100' },
              { name: 'Amit', avatar: 'https://picsum.photos/seed/amit/100/100' }
            ].map((friend, idx) => (
              <div key={idx} className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-2xl ring-2 ring-white dark:ring-slate-800 overflow-hidden shadow-sm">
                  <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-2">{friend.name}</span>
              </div>
            ))}
            <button onClick={onFrndCirclesClick} className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 shrink-0">
               <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-10 mb-10">
          <h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Popular Routes</h4>
          <div className="space-y-4">
            {[
              { from: 'Indiranagar', to: 'Whitefield', points: '45 Pts', time: '15 mins', user: 'Amit S.' },
              { from: 'HSR Layout', to: 'Electronic City', points: '60 Pts', time: '22 mins', user: 'Priya K.' },
            ].map((route, i) => (
              <div 
                key={i} 
                onClick={onSearchClick}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 active:bg-gray-100 dark:active:bg-slate-800 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-[#0d828c] font-bold group-hover:bg-[#0d828c] group-hover:text-white transition-colors">
                  {route.from[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                    <span>{route.from}</span>
                    <i className="fa-solid fa-arrow-right text-[10px] text-gray-400"></i>
                    <span>{route.to}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Offered by {route.user} • {route.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#0d828c]">{route.points}</div>
                  <div className="text-[10px] text-gray-400 font-bold">contribution</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Bottom Nav */}
      <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-gray-100 dark:border-slate-900 p-4 flex justify-around items-center absolute bottom-0 w-full rounded-t-[32px] shadow-[0_-8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgb(0,0,0,0.3)] z-20">
        <button className="text-[#0d828c] flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <i className="fa-solid fa-house text-xl"></i>
          <span className="text-[11px] font-bold">Home</span>
        </button>
        <button onClick={onFrndCirclesClick} className="text-slate-400 flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <i className="fa-solid fa-users-between-lines text-xl"></i>
          <span className="text-[11px] font-bold">Circles</span>
        </button>
        <button 
          onClick={onOfferClick}
          className="bg-[#0d828c] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-[#0d828c]/30 -mt-10 active:scale-90 transition-transform z-30"
        >
          <i className="fa-solid fa-plus text-xl"></i>
        </button>
        
        <button onClick={onFreeTripsClick} className="text-slate-400 flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <i className="fa-solid fa-gift text-xl"></i>
          <span className="text-[11px] font-bold">Rewards</span>
        </button>

        <button onClick={onAccountClick} className="text-slate-400 flex flex-col items-center gap-1 active:scale-90 transition-transform">
          <i className="fa-solid fa-user text-xl"></i>
          <span className="text-[11px] font-bold">Account</span>
        </button>
      </div>

      <NotificationOverlay isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
};

export default HomeScreen;
