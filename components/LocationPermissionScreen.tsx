
import React from 'react';

interface LocationPermissionScreenProps {
  onAllow: () => void;
  onDeny: () => void;
}

const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({ onAllow, onDeny }) => {
  const handleAllow = () => {
    // Trigger real browser permission prompt
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => onAllow(),
        () => onAllow() // Proceed anyway for demo purposes
      );
    } else {
      onAllow();
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 text-center">
      {/* Icon Area */}
      <div className="mb-8 relative">
        <div className="w-20 h-8 bg-blue-50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="relative z-10 text-indigo-600">
          <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      </div>

      <h1 className="text-[28px] font-bold text-slate-900 mb-4">Know your location</h1>
      
      <p className="text-slate-500 text-lg leading-relaxed mb-12 px-2">
        PathShare uses your location to find the best ride matches nearby and ensure safety during your commute.
      </p>

      <div className="w-full space-y-4">
        <button 
          onClick={handleAllow}
          className="w-full py-5 px-6 bg-[#E8EDFF] text-[#4F46E5] font-bold rounded-[30px] text-lg active:scale-95 transition-transform"
        >
          Allow while visiting the site
        </button>

        <button 
          onClick={handleAllow}
          className="w-full py-5 px-6 bg-[#F0F4FF] text-[#4F46E5] font-bold rounded-[30px] text-lg active:scale-95 transition-transform"
        >
          Allow this time
        </button>

        <button 
          onClick={onDeny}
          className="w-full py-5 px-6 bg-[#F8FAFC] text-slate-500 font-bold rounded-[30px] text-lg active:scale-95 transition-transform"
        >
          Never allow
        </button>
      </div>

      <div className="mt-auto pt-10">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Secure & Private</span>
      </div>
    </div>
  );
};

export default LocationPermissionScreen;
