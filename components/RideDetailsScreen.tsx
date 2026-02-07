
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
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);

  useEffect(() => {
    if (status === 'Approaching') {
      const timer = setTimeout(() => setStatus('Arrived'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    let timer: any;
    if (isPanicMode && sosCountdown > 0) {
      timer = setTimeout(() => setSosCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isPanicMode, sosCountdown]);

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

  const triggerSOS = () => {
    setIsPanicMode(true);
    setSosCountdown(3);
    // Real logic would use navigator.geolocation to send coordinates to backend/contacts
  };

  const cancelSOS = () => {
    setIsPanicMode(false);
    setSosCountdown(3);
  };

  const stages: RideStatus[] = ['Searching', 'Approaching', 'Arrived', 'On the way', 'Completed'];
  const currentStageIndex = stages.indexOf(status);

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden relative">
      {/* SOS Overlay */}
      {isPanicMode && (
        <div className="fixed inset-0 z-[200] bg-red-600 flex flex-col items-center justify-center p-8 text-white animate-fade-in">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto animate-ping">
              <i className="fa-solid fa-shield-heart text-5xl"></i>
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tighter uppercase">SOS Active</h2>
            <p className="text-white/80 font-bold">Broadcasting location to Police & Contacts</p>
          </div>

          <div className="mt-20 text-center">
            {sosCountdown > 0 ? (
              <>
                <div className="text-[120px] font-black leading-none mb-4">{sosCountdown}</div>
                <p className="text-xl font-bold">Calling emergency services...</p>
              </>
            ) : (
              <div className="space-y-6 animate-scale-in">
                <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                  <p className="font-bold text-sm uppercase tracking-widest text-white/60 mb-2">Status</p>
                  <p className="text-lg font-black italic">Live location sent to +91 98765 43210 (Sister)</p>
                </div>
                <div className="flex items-center gap-3 justify-center text-green-300 font-bold">
                  <i className="fa-solid fa-check-circle"></i>
                  <span>Police notified of your route</span>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={cancelSOS}
            className="mt-auto mb-12 bg-white text-red-600 px-10 py-5 rounded-[28px] font-black text-xl active:scale-95 shadow-2xl transition-all"
          >
            I AM SAFE (CANCEL)
          </button>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-lg text-gray-700 pointer-events-auto active:scale-90 transition-transform"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        {/* Panic Button */}
        <button 
          onClick={triggerSOS}
          className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500 shadow-xl shadow-red-500/40 text-white pointer-events-auto active:scale-95 transition-all group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fa-solid fa-shield-heart text-xl relative z-10"></i>
          <span className="absolute bottom-1 text-[7px] font-black uppercase tracking-tighter">Panic</span>
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
              <span className="uppercase text-[9px] font-black tracking-widest bg-slate-50 px-2 py-0.5 rounded text-slate-400">Trusted Companion</span>
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
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Shared Contribution</div>
              <div className="text-sm font-black text-slate-900">{ride.points} PathPoints</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Safety Check</div>
              <div className="text-sm font-black text-green-600 flex items-center gap-1">
                <i className="fa-solid fa-shield-check"></i> Verified
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {status === 'Arrived' ? (
            <button 
              onClick={handleStartTrip}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-[22px] text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 animate-fade-in"
            >
              Start Shared Journey
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
                  Finalizing Impact...
                </>
              ) : status === 'On the way' ? (
                'End Trip Safely'
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
