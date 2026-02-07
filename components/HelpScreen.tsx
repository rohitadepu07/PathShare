
import React, { useState } from 'react';
import LiveSupportModal from './LiveSupportModal';

interface HelpScreenProps {
  onBack: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  const [showLiveChat, setShowLiveChat] = useState(false);

  const faqs = [
    { q: "How are points earned?", a: "Points are earned for every ride you offer. The amount depends on the distance and the number of companions you take, reflecting your positive impact on city traffic." },
    { q: "What can I do with PathPoints?", a: "PathPoints can be redeemed in our Marketplace for coffee vouchers, tech accessories, and discounts from our sustainable brand partners." },
    { q: "Is PathShare safe?", a: "Safety is our priority. Every member is verified. You can see community ratings, ride history, and live-track every trip with a built-in SOS button." }
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full overflow-hidden relative">
      <div className="p-6 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Help & Mission</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-20">
        <section className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm">
          <div className="w-12 h-12 bg-teal-50 text-[#0d828c] rounded-2xl flex items-center justify-center mb-4">
            <i className="fa-solid fa-earth-americas text-xl"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3">Our Mission</h3>
          <p className="text-sm text-slate-500 leading-relaxed italic">
            "We believe in a city where every seat is filled, and every commuter is a friend. By sharing rides, we reduce smog and traffic together."
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mt-3">
            At PathShare, we turn environmental impact into community rewards. We connect vehicle owners with companions heading the same way in real-time.
          </p>
        </section>

        <section>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">How it works</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-4 items-start bg-white p-4 rounded-3xl border border-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#0d828c] text-white flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Post or Search</div>
                <p className="text-xs text-slate-400 mt-0.5">Enter your route. We'll find peers on your exact path.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-white p-4 rounded-3xl border border-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#0d828c] text-white flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Coordinate</div>
                <p className="text-xs text-slate-400 mt-0.5">Chat in-app to finalize the pickup spot.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start bg-white p-4 rounded-3xl border border-slate-50">
              <div className="w-8 h-8 rounded-full bg-[#0d828c] text-white flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Earn Points</div>
                <p className="text-xs text-slate-400 mt-0.5">Collect points for sharing seats and redeem them for rewards.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">Frequently Asked</h4>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100">
                <div className="font-bold text-slate-800 text-sm mb-2">{f.q}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-4">
          <div className="bg-slate-900 rounded-[32px] p-6 text-white flex items-center justify-between">
            <div>
              <div className="font-bold">Need more help?</div>
              <p className="text-xs text-slate-400 mt-1">AI Chat support is online</p>
            </div>
            <button 
              onClick={() => setShowLiveChat(true)}
              className="bg-[#0d828c] px-5 py-3 rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-comments"></i>
              Live AI
            </button>
          </div>
        </div>
      </div>

      {showLiveChat && (
        <LiveSupportModal onClose={() => setShowLiveChat(false)} />
      )}
    </div>
  );
};

export default HelpScreen;
