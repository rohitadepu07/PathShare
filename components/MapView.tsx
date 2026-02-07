
import React, { useEffect, useState } from 'react';

interface MapViewProps {
  className?: string;
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number };
}

interface Landmark {
  id: string;
  name: string;
  icon: string;
  x: string;
  y: string;
  color: string;
}

const MapView: React.FC<MapViewProps> = ({ className = "h-48", showRoute = false }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [eta, setEta] = useState<number>(18);

  const landmarks: Landmark[] = [
    { id: 'l1', name: 'Central Metro', icon: 'fa-train-subway', x: '45%', y: '40%', color: 'text-blue-500' },
    { id: 'l2', name: 'Starbucks', icon: 'fa-mug-hot', x: '65%', y: '55%', color: 'text-orange-500' },
    { id: 'l3', name: 'Apollo Hospital', icon: 'fa-hospital', x: '25%', y: '65%', color: 'text-red-500' },
    { id: 'l4', name: 'City Mall', icon: 'fa-bag-shopping', x: '75%', y: '25%', color: 'text-purple-500' },
  ];

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

  useEffect(() => {
    if (showRoute) {
      const interval = setInterval(() => {
        setEta((prev) => (prev > 1 ? prev - 1 : 1));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [showRoute]);

  return (
    <div className={`relative w-full overflow-hidden bg-[#eef2f5] dark:bg-slate-900 ${className} rounded-3xl border border-gray-100 dark:border-slate-800 shadow-inner transition-colors duration-500`}>
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ 
        backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
      
      {/* Building Blocks / Urban Layout Simulation */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-16 bg-slate-400 rounded-lg rotate-3"></div>
        <div className="absolute top-40 left-32 w-20 h-32 bg-slate-400 rounded-lg -rotate-6"></div>
        <div className="absolute bottom-10 right-20 w-40 h-12 bg-slate-400 rounded-lg rotate-12"></div>
        <div className="absolute top-1/2 right-10 w-16 h-24 bg-slate-400 rounded-lg"></div>
      </div>

      {coords ? (
        <div className="absolute inset-0">
          {/* User Location with Heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <div className="relative">
              <div className="absolute -inset-8 bg-blue-500/10 rounded-full animate-pulse"></div>
              {/* Heading Cone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[25px] border-b-blue-500/30 -rotate-[30deg]"></div>
              <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center relative z-10">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Render Landmarks */}
          {landmarks.map(landmark => (
            <div key={landmark.id} className="absolute flex flex-col items-center z-20 group" style={{ left: landmark.x, top: landmark.y }}>
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 text-[9px] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap dark:text-white">
                {landmark.name}
              </div>
              <div className={`w-8 h-8 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center ${landmark.color} border border-slate-50 dark:border-slate-700`}>
                <i className={`fa-solid ${landmark.icon} text-xs`}></i>
              </div>
            </div>
          ))}

          {showRoute && (
            <>
              {/* Pickup Indicator */}
              <div className="absolute top-[18%] left-[18%] z-30 flex flex-col items-center">
                <div className="bg-[#0d828c] text-white px-2.5 py-1.5 rounded-2xl shadow-xl text-[10px] font-black mb-1.5 animate-bounce">
                  PICKUP
                </div>
                <div className="w-4 h-4 bg-[#0d828c] rounded-full border-4 border-white dark:border-slate-900 shadow-xl"></div>
              </div>

              {/* Destination Indicator */}
              <div className="absolute bottom-[18%] right-[12%] z-30 flex flex-col items-center">
                <div className="bg-slate-900 dark:bg-slate-700 text-white px-2.5 py-1.5 rounded-2xl shadow-xl text-[10px] font-black mb-1.5">
                  DROP-OFF
                </div>
                <div className="w-5 h-5 bg-slate-900 dark:bg-slate-600 rounded-full border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Advanced Route SVG Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" preserveAspectRatio="none">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background Shadow Road */}
                <path 
                  d="M 72 72 L 180 72 L 180 180 L 300 180 L 300 328" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="10" 
                  className="dark:stroke-slate-800"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Main Route Line */}
                <path 
                  d="M 72 72 L 180 72 L 180 180 L 300 180 L 300 328" 
                  fill="none" 
                  stroke="#0d828c" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                />

                {/* Traffic Congestion Highlight */}
                <path 
                  d="M 180 120 L 180 180 L 240 180" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                />

                {/* Turn Indicators (Arrows) */}
                <g fill="#ffffff" stroke="#0d828c" strokeWidth="1">
                  {/* Turn 1 */}
                  <circle cx="180" cy="72" r="5" fill="#0d828c" />
                  <path d="M 177 69 L 183 72 L 177 75" fill="white" transform="rotate(90, 180, 72)" />
                  
                  {/* Turn 2 */}
                  <circle cx="180" cy="180" r="5" fill="#0d828c" />
                  <path d="M 177 177 L 183 180 L 177 183" fill="white" transform="rotate(0, 180, 180)" />
                  
                  {/* Turn 3 */}
                  <circle cx="300" cy="180" r="5" fill="#0d828c" />
                  <path d="M 297 177 L 303 180 L 297 183" fill="white" transform="rotate(90, 300, 180)" />
                </g>

                {/* Animated Navigation Dots */}
                <path 
                  d="M 72 72 L 180 72 L 180 180 L 300 180 L 300 328" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeDasharray="1, 15" 
                  className="animate-dash"
                  strokeLinecap="round"
                />
              </svg>

              {/* Navigation Status Card */}
              <div className="absolute bottom-4 left-4 right-4 z-50">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/40 dark:border-slate-800 p-4 rounded-[28px] shadow-2xl flex items-center gap-4 animate-scale-in">
                  <div className="w-12 h-12 bg-[#0d828c] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0d828c]/20">
                    <i className="fa-solid fa-location-arrow animate-pulse"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#0d828c] uppercase tracking-widest">Next Turn</span>
                      <span className="text-[10px] font-bold text-slate-400">in 400m</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">Turn Left onto 100ft Road</h4>
                  </div>
                  <div className="text-right">
                     <div className="text-lg font-black text-slate-900 dark:text-white">{eta}<span className="text-xs ml-0.5 opacity-50">m</span></div>
                     <div className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">On Time</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Simple GPS status when no route active */}
          {!showRoute && (
            <div className="absolute top-4 left-4 z-30">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200">System Ready • Bengaluru</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-xs font-medium bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-[#0d828c]/20 border-t-[#0d828c] rounded-full animate-spin mb-3"></div>
          <span className="font-bold tracking-tight dark:text-slate-500">Initializing Precision Map...</span>
        </div>
      )}

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0d828c] active:scale-90 transition-all border border-white dark:border-slate-700">
          <i className="fa-solid fa-compass text-sm"></i>
        </button>
        <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#0d828c] active:scale-90 transition-all border border-white dark:border-slate-700">
          <i className="fa-solid fa-plus text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default MapView;
