
import React, { useState } from 'react';
import MapView from './MapView';

interface SearchScreenProps {
  onBack: () => void;
  onSelectRide: (ride: any) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onSelectRide }) => {
  const mockMatches = [
    { id: '1', name: 'Karan Sharma', vehicle: 'Royal Enfield Classic', rating: 4.8, points: 35, time: '5 mins', type: 'Bike', isFriend: true },
    { id: '2', name: 'Ayesha Gupta', vehicle: 'Honda City', rating: 4.9, points: 85, time: '12 mins', type: 'Car', isFriend: false },
    { id: '3', name: 'Sameer V.', vehicle: 'Yamaha FZ', rating: 4.5, points: 30, time: '3 mins', type: 'Bike', isFriend: true, isMutual: true },
  ];

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col h-full overflow-hidden transition-colors">
      <div className="p-6 bg-white dark:bg-slate-950 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold tracking-tight dark:text-white">Find Ride</h2>
        </div>

        <div className="mt-6 flex flex-col gap-3 relative z-10">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <input 
              type="text" 
              placeholder="Your current location" 
              defaultValue="Current Location"
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 py-3.5 pl-10 pr-4 rounded-2xl text-sm font-semibold dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-black dark:bg-white rounded-sm rotate-45"></div>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 py-3.5 pl-10 pr-4 rounded-2xl text-sm font-semibold dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none placeholder:text-gray-400"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-4 shrink-0">
        <MapView className="h-44 shadow-inner" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Available Matches</h3>
          <div className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full font-bold text-gray-500">Live Updates</div>
        </div>
        
        <div className="space-y-4">
          {mockMatches.map((match) => (
            <div 
              key={match.id} 
              onClick={() => onSelectRide(match)}
              className={`bg-white dark:bg-slate-900 border p-4 rounded-3xl shadow-sm flex items-center gap-4 transition-all cursor-pointer group active:scale-[0.98] ${match.isFriend ? 'border-[#0d828c]/30' : 'border-gray-100 dark:border-slate-800'}`}
            >
              <div className="relative shrink-0">
                <img 
                  src={`https://picsum.photos/seed/${match.name}/100/100`} 
                  className="w-14 h-14 rounded-2xl object-cover" 
                  alt={match.name}
                />
                <div className="absolute -bottom-1 -right-1 bg-[#0d828c] text-white text-[9px] px-1.5 py-0.5 rounded-lg font-bold shadow-sm">
                  {match.rating} ★
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
                  {match.name}
                  {match.isFriend && (
                    <i className="fa-solid fa-users-between-lines text-[#0d828c] text-[10px]" title="Friend Circle"></i>
                  )}
                </div>
                <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <i className={`fa-solid ${match.type === 'Bike' ? 'fa-motorcycle' : 'fa-car'} opacity-70`}></i>
                  {match.vehicle}
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[#0d828c] text-[10px] font-bold bg-[#0d828c]/5 dark:bg-[#0d828c]/10 px-2 py-0.5 rounded-full">
                    {match.time} away
                  </span>
                  {match.isFriend && (
                    <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                      {match.isMutual ? 'Mutual' : 'Contact'}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-extrabold text-gray-900 dark:text-white leading-tight">{match.points}</div>
                <div className="text-[9px] text-gray-400 mb-2 uppercase">points</div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRide(match);
                  }}
                  className="bg-black dark:bg-slate-700 text-white text-[10px] px-3 py-1.5 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-slate-600 transition-colors active:scale-90"
                >
                  Join Ride
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
