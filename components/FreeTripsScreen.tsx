
import React, { useState } from 'react';

interface FreeTripsScreenProps {
  onBack: () => void;
}

const FreeTripsScreen: React.FC<FreeTripsScreenProps> = ({ onBack }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const inviteCode = "PATH-ARAV-2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join PathShare',
          text: `Use my code ${inviteCode} to get your first ride free!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Free Trips</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
        {/* Main Banner */}
        <div className="bg-[#0d828c] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#0d828c]/20">
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <i className="fa-solid fa-gift text-xl"></i>
            </div>
            <h3 className="text-3xl font-extrabold leading-tight tracking-tight mb-2">Share the joy, <br/>ride for free.</h3>
            <p className="text-[#e0f2f1] text-sm font-medium opacity-90 max-w-[80%]">Invite your friends to PathShare. Once they complete their first ride, you both get a free trip credit up to ₹100.</p>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
             <i className="fa-solid fa-motorcycle text-[180px] -rotate-12"></i>
          </div>
        </div>

        {/* Invite Code Box */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Your Invite Code</label>
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-wider">{inviteCode}</span>
            </div>
            <button 
              onClick={handleCopy}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}
            >
              <i className={`fa-solid ${copySuccess ? 'fa-check' : 'fa-copy'}`}></i>
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-900">Invite Progress</h4>
            <span className="text-sm font-black text-[#0d828c]">1 / 3</span>
          </div>
          
          <div className="relative h-4 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[#0d828c] rounded-full w-[33.3%] transition-all duration-1000 shadow-[0_0_10px_rgba(13,130,140,0.5)]"></div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 p-4 bg-orange-50 rounded-2xl border border-orange-100">
              <div className="text-[10px] font-black text-orange-400 uppercase mb-1">Status</div>
              <p className="text-xs font-bold text-orange-700">2 more friends to go for your next free trip!</p>
            </div>
          </div>
        </div>

        {/* Free Trip History / Available */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Active Rewards</h4>
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-5 flex items-center gap-5 border border-slate-100 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
               <i className="fa-solid fa-ticket text-2xl"></i>
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">Welcome Credit</div>
              <p className="text-xs text-slate-400">Valid for next 15 days</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-[#0d828c]">₹100</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase">Available</div>
            </div>
          </div>

          {/* Card 2 - Claimed */}
          <div className="bg-slate-50 rounded-3xl p-5 flex items-center gap-5 border border-slate-100 opacity-60">
            <div className="w-14 h-14 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center shrink-0">
               <i className="fa-solid fa-circle-check text-2xl"></i>
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900">Friend Referral</div>
              <p className="text-xs text-slate-400">Used on 12 Oct 2023</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-slate-400">₹100</div>
              <div className="text-[9px] font-bold text-slate-400 uppercase">Redeemed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 bg-white border-t border-slate-100 sticky bottom-0">
        <button 
          onClick={handleShare}
          className="w-full bg-[#0d828c] text-white py-5 rounded-[28px] font-black text-lg shadow-xl shadow-[#0d828c]/20 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-paper-plane"></i>
          Invite Friends
        </button>
      </div>
    </div>
  );
};

export default FreeTripsScreen;
