
import React, { useState } from 'react';
import MapView from './MapView';

interface SearchScreenProps {
  onBack: () => void;
  onSelectRide: (ride: any) => void;
}

type VehicleFilter = 'All' | 'Bike' | 'Car';

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onSelectRide }) => {
  const [isWomenOnly, setIsWomenOnly] = useState(false);
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('All');
  
  const mockMatches = [
    { id: '1', name: 'Sneha Kapur', vehicle: 'Vespa VXL 150', rating: 4.9, points: 35, time: '4 mins', type: 'Bike', isFriend: true, isWoman: true },
    { id: '2', name: 'Ayesha Gupta', vehicle: 'Honda City', rating: 4.9, points: 85, time: '12 mins', type: 'Car', isFriend: false, isWoman: true },
    { id: '3', name: 'Priya Sharma', vehicle: 'TVS iQube', rating: 4.7, points: 30, time: '8 mins', type: 'Bike', isFriend: true, isMutual: true, isWoman: true },
    { id: '4', name: 'Karan Sharma', vehicle: 'Royal Enfield Classic', rating: 4.8, points: 35, time: '5 mins', type: 'Bike', isFriend: true, isWoman: false },
    { id: '5', name: 'Sameer V.', vehicle: 'Yamaha FZ', rating: 4.5, points: 30, time: '3 mins', type: 'Bike', isFriend: true, isMutual: true, isWoman: false },
    { id: '6', name: 'Aditya Raj', vehicle: 'Maruti Swift', rating: 4.6, points: 70, time: '15 mins', type: 'Car', isFriend: false, isWoman: false },
    { id: '7', name: 'Meera Das', vehicle: 'Hyundai i20', rating: 4.8, points: 75, time: '10 mins', type: 'Car', isFriend: true, isWoman: true },
  ];

  const filteredMatches = mockMatches.filter(match => {
    const genderPass = isWomenOnly ? match.isWoman : true;
    const vehiclePass = vehicleFilter === 'All' ? true : match.type === vehicleFilter;
    return genderPass && vehiclePass;
  });

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col h-full overflow-hidden transition-colors">
      <div className="p-6 bg-white dark:bg-slate-950 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 active:scale-90 transition-transform">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="text-xl font-bold tracking-tight dark:text-white">Find Ride</h2>
          </div>
          
          {/* Women Safety Toggle */}
          <button 
            onClick={() => setIsWomenOnly(!isWomenOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all active:scale-95 ${
              isWomenOnly 
                ? 'bg-pink-50 border-pink-200 text-pink-600 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
            }`}
          >
            <i className="fa-solid fa-person-dress text-sm"></i>
            <span className="text-[10px] font-black uppercase tracking-wider">Women Only</span>
          </button>
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

        {/* Vehicle Type Filters */}
        <div className="mt-6 flex items-center gap-3">
          {[
            { id: 'All', icon: 'fa-border-all', label: 'All' },
            { id: 'Bike', icon: 'fa-motorcycle', label: 'Bikes' },
            { id: 'Car', icon: 'fa-car-side', label: 'Cars' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setVehicleFilter(f.id as VehicleFilter)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border transition-all active:scale-95 ${
                vehicleFilter === f.id
                  ? 'bg-[#0d828c] border-[#0d828c] text-white shadow-lg shadow-[#0d828c]/20'
                  : 'bg-white border-slate-100 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              <i className={`fa-solid ${f.icon} text-xs`}></i>
              <span className="text-[10px] font-black uppercase tracking-wider">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-4 shrink-0">
        <MapView className="h-44 shadow-inner" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            {isWomenOnly ? 'Verified Women Companions' : `${vehicleFilter === 'All' ? 'Available' : vehicleFilter} Matches`}
          </h3>
          <div className="text-[10px] bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-full font-bold text-gray-500 flex items-center gap-1">
            <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span> Live
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredMatches.length > 0 ? filteredMatches.map((match) => (
            <div 
              key={match.id} 
              onClick={() => onSelectRide(match)}
              className={`bg-white dark:bg-slate-900 border p-4 rounded-3xl shadow-sm flex items-center gap-4 transition-all cursor-pointer group active:scale-[0.98] ${
                match.isWoman && isWomenOnly ? 'border-pink-200 shadow-pink-100/20' : 
                match.isFriend ? 'border-[#0d828c]/30' : 'border-gray-100 dark:border-slate-800'
              }`}
            >
              <div className="relative shrink-0">
                <img 
                  src={`https://picsum.photos/seed/${match.name}/100/100`} 
                  className="w-14 h-14 rounded-2xl object-cover" 
                  alt={match.name}
                />
                <div className={`absolute -bottom-1 -right-1 text-white text-[9px] px-1.5 py-0.5 rounded-lg font-bold shadow-sm ${match.isWoman ? 'bg-pink-500' : 'bg-[#0d828c]'}`}>
                  {match.rating} ★
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
                  {match.name}
                  {match.isWoman && <i className="fa-solid fa-certificate text-pink-400 text-[10px]" title="Woman Verified"></i>}
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
                  className={`text-white text-[10px] px-3 py-1.5 rounded-xl font-bold transition-colors active:scale-90 ${
                    match.isWoman && isWomenOnly ? 'bg-pink-600 hover:bg-pink-700' : 'bg-black dark:bg-slate-700 hover:bg-gray-800 dark:hover:bg-slate-600'
                  }`}
                >
                  Join Ride
                </button>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <i className="fa-solid fa-magnifying-glass text-2xl"></i>
              </div>
              <p className="text-slate-400 text-sm font-medium px-8">No {isWomenOnly ? 'women-only' : ''} {vehicleFilter === 'All' ? '' : vehicleFilter.toLowerCase()} matches found nearby.</p>
              <button 
                onClick={() => { setVehicleFilter('All'); setIsWomenOnly(false); }}
                className="mt-4 text-[#0d828c] text-xs font-bold uppercase tracking-widest underline underline-offset-4"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
