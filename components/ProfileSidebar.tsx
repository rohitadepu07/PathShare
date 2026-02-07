
import React, { useState } from 'react';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
    bio: string;
  };
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdateProfile: (data: any) => void;
  onNavigateToFreeTrips?: () => void;
  onNavigateToRewards?: () => void;
  onNavigateToHistory?: () => void;
  onNavigateToHelp?: () => void;
  onNavigateToFrndCircles?: () => void;
  onNavigateToAccount?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  isOpen, 
  onClose, 
  onLogout, 
  isLoggedIn, 
  user, 
  isDarkMode,
  onToggleDarkMode,
  onUpdateProfile,
  onNavigateToFreeTrips,
  onNavigateToRewards,
  onNavigateToHistory,
  onNavigateToHelp,
  onNavigateToFrndCircles,
  onNavigateToAccount
}) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified'>('verified');

  const menuItems = [
    { label: 'My Full Profile', icon: 'fa-user-gear', action: onNavigateToAccount },
    { label: 'FrndCircles', icon: 'fa-users-between-lines', action: onNavigateToFrndCircles },
    { label: 'Redeem Points', icon: 'fa-star', action: onNavigateToRewards },
    { label: 'Ride History', icon: 'fa-clock-rotate-left', action: onNavigateToHistory },
    { label: 'Referral Rewards', icon: 'fa-gift', action: onNavigateToFreeTrips },
    { label: 'Help & Support', icon: 'fa-circle-question', action: onNavigateToHelp },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[360px] bg-white dark:bg-slate-900 z-50 transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) flex flex-col shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-8 pb-4 flex justify-between items-center">
          <span className="font-extrabold text-2xl tracking-tighter dark:text-white">path<span className="text-[#0d828c]">share</span></span>
          <button onClick={onClose} className="text-gray-400 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {isLoggedIn ? (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar px-6">
            <div 
              onClick={onNavigateToAccount}
              className="bg-[#F8FAFC] dark:bg-slate-800/50 rounded-[40px] p-7 mb-6 border border-gray-100/50 dark:border-slate-800 cursor-pointer group active:scale-[0.98] transition-all"
            >
              <div className="flex items-start gap-5 mb-5">
                <div className="relative">
                  <img src={user.avatar} className="w-20 h-20 rounded-[28px] object-cover shadow-sm ring-4 ring-white dark:ring-slate-800 group-hover:ring-[#0d828c]/30 transition-all" alt="Avatar" />
                  {verificationStatus === 'verified' && (
                    <div className="absolute -bottom-1 -right-1 bg-[#22C55E] text-white w-7 h-7 rounded-full flex items-center justify-center border-4 border-[#F8FAFC] dark:border-slate-800 animate-scale-in">
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[22px] text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-[#0d828c] transition-colors">{user.name}</h3>
                  </div>
                  <p className="text-[#0d828c] text-[10px] font-black uppercase tracking-widest mt-1">Impact Member</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">View and edit your personal details, gender, and verification status.</p>
            </div>

            {/* Dark Mode Toggle */}
            <div className="px-4 py-3 mb-2 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-transparent dark:border-slate-800">
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${isDarkMode ? 'fa-moon text-blue-400' : 'fa-sun text-orange-400'} text-lg`}></i>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-200">Dark Mode</span>
              </div>
              <button 
                onClick={onToggleDarkMode}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${isDarkMode ? 'bg-[#0d828c]' : 'bg-slate-200'}`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {menuItems.map((item, i) => (
                <button key={i} onClick={item.action} className="flex items-center gap-5 p-4 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                  <div className="w-10 h-10 flex items-center justify-center rounded-[16px] bg-[#F8FAFC] dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm transition-all">
                    <i className={`fa-solid ${item.icon} text-lg text-slate-600 dark:text-slate-400`}></i>
                  </div>
                  <span className="font-bold text-[15px] tracking-tight">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 mb-8">
              <button onClick={onLogout} className="w-full flex items-center gap-4 text-slate-400 font-bold p-4 hover:text-red-500 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 text-slate-200 dark:text-slate-700">
              <i className="fa-solid fa-user text-5xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Join the Community</h3>
            <p className="text-sm text-slate-400 mb-10 leading-relaxed">Share seats, earn points, and make your city greener.</p>
            <button onClick={onLogout} className="w-full bg-[#0d828c] text-white py-5 rounded-[22px] font-bold shadow-xl shadow-[#0d828c]/20 active:scale-95 transition-all">Start Your Journey</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSidebar;
