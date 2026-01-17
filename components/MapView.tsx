
import React, { useEffect, useState } from 'react';

interface MapViewProps {
  className?: string;
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number };
}

const MapView: React.FC<MapViewProps> = ({ className = "h-48", showRoute = false }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [eta, setEta] = useState<number>(18); // Default 18 mins

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Simulate ETA reduction when route is shown
  useEffect(() => {
    if (showRoute) {
      const interval = setInterval(() => {
        setEta((prev) => (prev > 1 ? prev - 1 : 1));
      }, 30000); // Reduce ETA every 30 seconds for simulation
      return () => clearInterval(interval);
    }
  }, [showRoute]);

  return (
    <div className={`relative w-full overflow-hidden bg-[#e5ebee] ${className} rounded-3xl border border-gray-100 shadow-inner`}>
      {/* Simulated Map Background with improved grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#64748b 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }}></div>
      
      {/* Map Arterial Roads */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/3 w-full h-8 bg-white rotate-2"></div>
        <div className="absolute left-1/4 h-full w-8 bg-white -rotate-12"></div>
        <div className="absolute right-1/3 h-full w-10 bg-white rotate-6"></div>
      </div>

      {coords ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* User Location Pulse */}
          <div className="relative z-30 transform translate-x-4 -translate-y-2">
            <div className="absolute -inset-6 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>

          {showRoute && (
            <>
              {/* Pickup Point - Indiranagar */}
              <div className="absolute top-[20%] left-[20%] flex flex-col items-center z-20 scale-90">
                <div className="bg-white px-2 py-1 rounded-lg shadow-md text-[9px] font-bold mb-1 border border-blue-100 flex items-center gap-1">
                  <i className="fa-solid fa-person-walking text-blue-500"></i>
                  Indiranagar
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              {/* Landmark: Metro Station */}
              <div className="absolute top-[45%] left-[45%] flex flex-col items-center z-10 opacity-60">
                <div className="bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-gray-200 text-[8px] font-medium mb-1">
                  <i className="fa-solid fa-train-subway mr-1 text-gray-500"></i>
                  Metro St.
                </div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>

              {/* Landmark: Traffic Spot */}
              <div className="absolute bottom-[40%] right-[35%] z-20">
                <div className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full border border-red-100 text-[8px] font-bold flex items-center gap-1 animate-pulse">
                  <i className="fa-solid fa-car-side"></i> Slow
                </div>
              </div>

              {/* Drop-off Pin - Whitefield */}
              <div className="absolute bottom-[20%] right-[15%] flex flex-col items-center z-20">
                <div className="bg-gray-900 text-white px-2 py-1 rounded-lg shadow-xl text-[9px] font-bold mb-1 flex items-center gap-1">
                  <i className="fa-solid fa-flag-checkered"></i>
                  ITPL
                </div>
                <div className="w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              {/* Complex Path Visualization */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#0d828c" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                </defs>
                
                {/* Main Route Shadow/Glow */}
                <path 
                  d="M 80 80 L 200 80 L 200 200 L 320 200 L 320 320" 
                  fill="none" 
                  stroke="#000" 
                  strokeWidth="6" 
                  strokeOpacity="0.05"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Main Detailed Route */}
                <path 
                  d="M 80 80 L 200 80 L 200 200 L 320 200 L 320 320" 
                  fill="none" 
                  stroke="url(#routeGradient)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Animated Direction Chevrons */}
                <path 
                  d="M 80 80 L 200 80 L 200 200 L 320 200 L 320 320" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeDasharray="1, 15" 
                  className="animate-dash"
                  strokeLinecap="round"
                />
                
                {/* Traffic Highlight (Red segment) */}
                <path 
                  d="M 240 200 L 290 200" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>

              {/* Dynamic ETA Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
                <div className="bg-white/90 backdrop-blur-xl border border-white/50 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-scale-in">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">Estimated Arrival</span>
                    <span className="text-sm font-black text-slate-900 leading-none">{eta} <span className="text-[10px]">mins</span></span>
                  </div>
                  <div className="w-[1px] h-6 bg-slate-100 mx-1"></div>
                  <div className="text-right">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">Distance</span>
                     <span className="text-sm font-black text-[#0d828c] leading-none">4.2 <span className="text-[10px]">km</span></span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Map Controls */}
          {!showRoute && (
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-gray-100 shadow-sm text-[8px] font-mono text-gray-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                GPS Active: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-xs font-medium bg-gray-50/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-[#0d828c]/20 border-t-[#0d828c] rounded-full animate-spin mb-3"></div>
          Calculating optimized route...
        </div>
      )}

      {/* Floating UI Elements */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-30">
        <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-[#0d828c] active:scale-90 transition-all border border-gray-50">
          <i className="fa-solid fa-layer-group text-xs"></i>
        </button>
        <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-[#0d828c] active:scale-90 transition-all border border-gray-50">
          <i className="fa-solid fa-location-arrow text-xs"></i>
        </button>
      </div>
    </div>
  );
};

export default MapView;
