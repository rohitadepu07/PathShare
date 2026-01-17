
import React, { useState } from 'react';

interface FrndCirclesScreenProps {
  onBack: () => void;
}

const FrndCirclesScreen: React.FC<FrndCirclesScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Feed' | 'Circles' | 'Privacy'>('Feed');
  const [pingSent, setPingSent] = useState(false);

  const friendsOnRoad = [
    { id: 'f1', name: 'Rahul V.', relation: 'Contact', avatar: 'https://picsum.photos/seed/rahul/100/100', route: 'Indiranagar → HSR', time: 'Active Now', degree: '1st' },
    { id: 'f2', name: 'Sneha K.', relation: 'Mutual (via Priya)', avatar: 'https://picsum.photos/seed/sneha/100/100', route: 'Koramangala → Embassy Tech Village', time: '10 mins ago', degree: '2nd' },
    { id: 'f3', name: 'Amit Singh', relation: 'Contact', avatar: 'https://picsum.photos/seed/amit/100/100', route: 'Hebbal → Manyata', time: 'Active Now', degree: '1st' },
  ];

  const handleQuickPing = () => {
    setPingSent(true);
    setTimeout(() => setPingSent(false), 3000);
  };

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col h-full overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-slate-950 shrink-0 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-90 transition-transform">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">FrndCircles</h2>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d828c]/10 text-[#0d828c] active:scale-90 transition-transform">
            <i className="fa-solid fa-user-plus"></i>
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-slate-50 dark:bg-slate-900/50 p-1 rounded-2xl mt-6 border border-slate-100 dark:border-slate-800">
          {['Feed', 'Circles', 'Privacy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-white dark:bg-slate-800 text-[#0d828c] shadow-sm' 
                  : 'text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        {activeTab === 'Feed' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#0d828c] to-[#0b6e77] rounded-[32px] p-6 text-white shadow-xl shadow-[#0d828c]/20 relative overflow-hidden">
               <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               <div className="relative z-10">
                 <h4 className="font-bold text-lg mb-1">Stranger Danger? 0%.</h4>
                 <p className="text-[#e0f2f1] text-xs font-medium opacity-90 leading-relaxed">
                   Only see rides from people you know or their mutual friends. 
                 </p>
                 <button 
                  onClick={handleQuickPing}
                  className={`mt-4 w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    pingSent ? 'bg-white text-green-600' : 'bg-white text-[#0d828c]'
                  }`}
                 >
                   {pingSent ? (
                     <><i className="fa-solid fa-check"></i> Ping Broadcasted!</>
                   ) : (
                     <><i className="fa-solid fa-bullhorn"></i> Emergency Quick-Ping</>
                   )}
                 </button>
               </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Friends On The Road</h5>
              {friendsOnRoad.map((friend) => (
                <div key={friend.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-4 hover:border-[#0d828c] transition-all group active:scale-[0.98]">
                  <div className="relative">
                    <img src={friend.avatar} className="w-14 h-14 rounded-2xl object-cover" alt={friend.name} />
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
                       <span className={`text-[8px] font-black px-1 rounded ${friend.degree === '1st' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                         {friend.degree}
                       </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">{friend.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold mb-1">{friend.relation}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#0d828c] font-black">
                      <i className="fa-solid fa-route opacity-70"></i>
                      {friend.route}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-green-500 mb-2">{friend.time}</div>
                    <button className="w-9 h-9 rounded-xl bg-[#0d828c] text-white flex items-center justify-center shadow-lg shadow-[#0d828c]/20">
                      <i className="fa-solid fa-paper-plane text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Circles' && (
          <div className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center">
                 <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <i className="fa-solid fa-address-book text-xl"></i>
                 </div>
                 <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">142</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">1st Degree</div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center">
                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                   <i className="fa-solid fa-network-wired text-xl"></i>
                 </div>
                 <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">850+</div>
                 <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Mutuals</div>
               </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Circle Safety Stats</h5>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Identity Verified</span>
                    <span className="text-sm font-black text-green-600">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Avg. Community Rating</span>
                    <span className="text-sm font-black text-orange-500">4.9/5</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-orange-400 rounded-full"></div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'Privacy' && (
          <div className="space-y-4 animate-fade-in">
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Visibility Settings</h5>
             <div className="space-y-2">
               {[
                 { label: 'Visible to Everyone', sub: 'Verified PathShare community can see you.', icon: 'fa-earth-asia' },
                 { label: 'Visible to Contacts Only', sub: 'Only your phone contacts can see your rides.', icon: 'fa-users', active: true },
                 { label: 'Invisible', sub: 'You won\'t appear in search results.', icon: 'fa-eye-slash' },
               ].map((setting, i) => (
                 <button key={i} className={`w-full p-5 rounded-3xl border text-left flex items-center gap-4 transition-all ${
                   setting.active 
                    ? 'bg-[#0d828c]/5 border-[#0d828c]' 
                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                 }`}>
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${setting.active ? 'bg-[#0d828c] text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                     <i className={`fa-solid ${setting.icon}`}></i>
                   </div>
                   <div className="flex-1">
                     <div className={`font-bold text-sm ${setting.active ? 'text-[#0d828c]' : 'text-slate-700 dark:text-slate-300'}`}>{setting.label}</div>
                     <div className="text-[10px] text-slate-400 mt-0.5">{setting.sub}</div>
                   </div>
                   {setting.active && <i className="fa-solid fa-circle-check text-[#0d828c]"></i>}
                 </button>
               ))}
             </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 sticky bottom-0">
        <button className="w-full bg-[#0d828c] text-white py-5 rounded-[28px] font-black text-lg shadow-xl shadow-[#0d828c]/20 active:scale-95 transition-all flex items-center justify-center gap-3">
          <i className="fa-solid fa-sync"></i>
          Sync Contacts
        </button>
      </div>
    </div>
  );
};

export default FrndCirclesScreen;
