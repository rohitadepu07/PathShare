
import React, { useState, useEffect } from 'react';
import MapView from './MapView';
import FeedbackModal from './FeedbackModal';

interface RideDetailsScreenProps {
  ride: any;
  onBack: () => void;
}

type RideStatus = 'Searching' | 'Approaching' | 'Arrived' | 'On the way' | 'Completed';

const RideDetailsScreen: React.FC<RideDetailsScreenProps> = ({ ride, onBack }) => {
  const [status, setStatus] = useState<RideStatus>('Approaching');
  const [isRideFinished, setIsRideFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (status === 'Approaching') {
      const timer = setTimeout(() => setStatus('Arrived'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleStartTrip = () => {
    setStatus('On the way');
  };

  const handleCompleteRide = () => {
    setStatus('Completed');
    setTimeout(() => {
      setIsRideFinished(true);
      setShowFeedback(true);
    }, 2000);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    onBack();
  };

  const stages: RideStatus[] = ['Searching', 'Approaching', 'Arrived', 'On the way', 'Completed'];
  const currentStageIndex = stages.indexOf(status);

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-lg text-gray-700 pointer-events-auto active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d828c] shadow-lg shadow-[#0d828c]/30 text-white pointer-events-auto active:scale-90 transition-transform">
          <i className="fa-solid fa-star"></i>
        </button>
      </div>

      <div className="flex-1 relative">
        <MapView className="h-full rounded-none" showRoute={status === 'On the way'} />
        
        <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/40 p-5 rounded-[32px] shadow-2xl z-30 animate-scale-in">
          <div className="flex justify-between items-center mb-6 px-2">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Live Status</span>
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                {status === 'Completed' ? (
                  <i className="fa-solid fa-circle-check text-green-500"></i>
                ) : (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d828c] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d828c]"></span>
                  </span>
                )}
                {status}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">ETA</span>
              <span className="text-sm font-black text-[#0d828c]">
                {status === 'Approaching' ? '4 mins' : status === 'On the way' ? '12 mins' : '--'}
              </span>
            </div>
          </div>

          <div className="relative flex justify-between items-center px-1">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#0d828c] transition-all duration-700 -z-10"
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            ></div>
            
            {stages.map((s, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={s} className="flex flex-col items-center gap-2">
                  <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    isPast ? 'bg-[#0d828c] border-[#0d828c]' : 
                    isCurrent ? 'bg-white border-[#0d828c] scale-125 shadow-[0_0_10px_rgba(13,130,140,0.4)]' : 
                    'bg-white border-slate-200'
                  }`}></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 px-0 text-center">
             <span className="text-[8px] font-bold text-slate-400 w-12">Search</span>
             <span className="text-[8px] font-bold text-slate-400 w-12">Near</span>
             <span className="text-[8px] font-bold text-slate-400 w-12">Arrived</span>
             <span className="text-[8px] font-bold text-slate-400 w-12">Trip</span>
             <span className="text-[8px] font-bold text-slate-400 w-12">Done</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] p-8 pt-6 relative border-t border-gray-50 z-20">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img 
              src={`https://picsum.photos/seed/${ride.name}/150/150`} 
              className="w-16 h-16 rounded-3xl object-cover shadow-sm ring-4 ring-gray-50" 
              alt={ride.name}
            />
            <div className={`absolute -bottom-2 -right-2 w-5 h-5 rounded-full border-4 border-white transition-colors ${status === 'Completed' ? 'bg-gray-300' : 'bg-green-500'}`}></div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-extrabold text-gray-900">{ride.name}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span className="font-bold text-[#0d828c]">{ride.rating} ★</span>
              <span>•</span>
              <span className="uppercase text-[9px] font-black tracking-widest bg-slate-50 px-2 py-0.5 rounded text-slate-400">Trusted</span>
            </div>
          </div>
          <div className="flex gap-2">
            {status !== 'Completed' && (
              <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0d828c] active:bg-[#0d828c] active:text-white transition-all shadow-sm">
                <i className="fa-solid fa-message"></i>
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#f8fafc] rounded-3xl p-5 mb-6 space-y-4 border border-slate-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Community Contribution</div>
              <div className="text-sm font-black text-slate-900">{ride.points} PathPoints</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Impact</div>
              <div className="text-sm font-black text-green-600">High</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {status === 'Arrived' ? (
            <button 
              onClick={handleStartTrip}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[22px] text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 animate-fade-in"
            >
              Start Impact Trip
            </button>
          ) : (
            <button 
              onClick={status === 'On the way' ? handleCompleteRide : undefined}
              disabled={status !== 'On the way' && status !== 'Completed'}
              className={`w-full font-black py-5 rounded-[22px] text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${
                status === 'Completed' ? 'bg-green-500 text-white' : 
                status === 'On the way' ? 'bg-[#0d828c] text-white shadow-[#0d828c]/20' : 
                'bg-slate-100 text-slate-300'
              }`}
            >
              {status === 'Completed' ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Finalizing Points...
                </>
              ) : status === 'On the way' ? (
                'Finish Trip'
              ) : (
                'Waiting for Companion...'
              )}
            </button>
          )}
          
          {status !== 'Completed' && (
            <button 
              onClick={onBack}
              className="w-full text-slate-400 font-bold py-2 text-xs uppercase tracking-widest hover:text-red-500 transition-colors mt-2"
            >
              Cancel Request
            </button>
          )}
        </div>
      </div>

      {showFeedback && (
        <FeedbackModal
          driverName={ride.name}
          driverAvatar={`https://picsum.photos/seed/${ride.name}/150/150`}
          onClose={() => onBack()}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default RideDetailsScreen;
