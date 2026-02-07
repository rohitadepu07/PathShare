
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface OfferScreenProps {
  onBack: () => void;
}

const OfferScreen: React.FC<OfferScreenProps> = ({ onBack }) => {
  const [vehicleType, setVehicleType] = useState<'Car' | 'Bike'>('Car');
  const [seats, setSeats] = useState('1 Seat');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [time, setTime] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePostRide = async () => {
    if (!from || !to) return;
    setIsPosting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('rides')
        .insert({
          user_id: user.id,
          from_location: from,
          to_location: to,
          vehicle_type: vehicleType,
          seats_available: parseInt(seats),
          departure_time: time,
          status: 'available'
        });

      if (error) throw error;
      
      setIsSuccess(true);
      setTimeout(() => onBack(), 2000);
    } catch (err: any) {
      alert(err.message || "Failed to post ride");
    } finally {
      setIsPosting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center animate-fade-in transition-colors">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ride Published!</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Your trip is live in the community database.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col h-full overflow-y-auto no-scrollbar transition-colors">
      <div className="px-6 pt-6 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 active:scale-90 transition-transform">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      </div>

      <div className="px-8 pt-4 pb-12">
        <h1 className="text-[32px] font-extrabold text-[#0f172a] dark:text-white tracking-tight">Offer Ride</h1>
        <p className="text-slate-400 text-lg mt-1 mb-8">Share your commute & unlock premium rewards</p>

        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setVehicleType('Car')}
            className={`flex-1 h-36 rounded-[24px] border-2 flex flex-col items-center justify-center gap-3 transition-all ${
              vehicleType === 'Car' ? 'border-[#0d828c] bg-[#f0f9fa] dark:bg-[#0d828c]/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className={`text-3xl ${vehicleType === 'Car' ? 'text-[#0d828c]' : 'text-slate-300'}`}>
              <i className="fa-solid fa-car-side"></i>
            </div>
            <span className={`font-bold text-sm ${vehicleType === 'Car' ? 'text-[#0d828c]' : 'text-slate-400'}`}>Offer Car</span>
          </button>

          <button 
            onClick={() => setVehicleType('Bike')}
            className={`flex-1 h-36 rounded-[24px] border-2 flex flex-col items-center justify-center gap-3 transition-all ${
              vehicleType === 'Bike' ? 'border-[#0d828c] bg-[#f0f9fa] dark:bg-[#0d828c]/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className={`text-3xl ${vehicleType === 'Bike' ? 'text-[#0d828c]' : 'text-slate-300'}`}>
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <span className={`font-bold text-sm ${vehicleType === 'Bike' ? 'text-[#0d828c]' : 'text-slate-400'}`}>Offer Bike</span>
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">FROM</label>
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="text" 
                placeholder="Starting Point"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none py-5 pl-12 pr-6 rounded-[20px] text-base font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">TO</label>
            <div className="relative">
              <i className="fa-solid fa-location-crosshairs absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="text" 
                placeholder="Destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none py-5 pl-12 pr-6 rounded-[20px] text-base font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">TIME</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="--:--"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none py-5 px-6 rounded-[20px] text-base font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none placeholder:text-slate-400"
                />
                <i className="fa-regular fa-clock absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">SEATS</label>
              <select 
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full bg-[#f8fafc] dark:bg-slate-900 border-none py-5 px-6 rounded-[20px] text-base font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0d828c]/20 outline-none appearance-none"
              >
                <option>1 Seat</option>
                <option>2 Seats</option>
                <option>3 Seats</option>
              </select>
            </div>
          </div>

          <div className="bg-[#f0fdf4] dark:bg-green-900/10 rounded-[30px] p-8 flex items-center justify-between border border-green-100 dark:border-green-900/20">
            <div className="flex-1">
              <h4 className="text-green-800 dark:text-green-400 text-lg font-extrabold">Estimated Reward</h4>
              <p className="text-green-600 dark:text-green-500/70 text-[11px] font-bold mt-1">Synced to your profile via Supabase.</p>
            </div>
            <div className="text-right">
              <div className="text-green-700 dark:text-green-400 text-3xl font-black">120 - 200 Pts</div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              onClick={handlePostRide}
              disabled={isPosting || !from || !to}
              className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black py-5 rounded-[22px] text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPosting ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Syncing to DB...
                </>
              ) : 'Publish Ride Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferScreen;
