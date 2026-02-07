
import React from 'react';

interface RideHistoryScreenProps {
  onBack: () => void;
}

const RideHistoryScreen: React.FC<RideHistoryScreenProps> = ({ onBack }) => {
  const history = [
    { id: '1', date: 'Oct 14, 2023', from: 'Indiranagar', to: 'Whitefield', points: '45 Pts', vehicle: 'Royal Enfield Classic', status: 'Completed' },
    { id: '2', date: 'Oct 12, 2023', from: 'HSR Layout', to: 'Koramangala', points: '30 Pts', vehicle: 'Activa 6G', status: 'Completed' },
    { id: '3', date: 'Oct 11, 2023', from: 'Whitefield', to: 'Indiranagar', points: '55 Pts', vehicle: 'Honda City', status: 'Completed' },
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      <div className="p-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Impact History</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
        {history.map((ride) => (
          <div key={ride.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:border-[#0d828c]/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ride.date}</span>
              <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full">Shared</span>
            </div>
            
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col items-center pt-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full border border-blue-500"></div>
                <div className="w-[1px] h-6 border-l border-dashed border-slate-200"></div>
                <div className="w-2 h-2 bg-[#0d828c] rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800">{ride.from}</div>
                <div className="text-sm font-bold text-slate-800 mt-3">{ride.to}</div>
              </div>
              <div className="text-right flex flex-col justify-center">
                <div className="text-lg font-black text-slate-900">{ride.points}</div>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <i className="fa-solid fa-star text-[10px] text-yellow-500"></i>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Awarded</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <i className="fa-solid fa-motorcycle opacity-40"></i>
                {ride.vehicle}
              </div>
              <button className="text-[#0d828c] text-[11px] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Details <i className="fa-solid fa-chevron-right text-[8px]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideHistoryScreen;
