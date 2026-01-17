
import React from 'react';

interface Notification {
  id: string;
  type: 'ride' | 'points' | 'reward';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ isOpen, onClose }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'ride',
      title: 'Companion Arriving',
      message: 'Karan Sharma is 2 mins away from Indiranagar pickup.',
      time: 'Just now',
      isRead: false
    },
    {
      id: '2',
      type: 'points',
      title: 'Points Awarded!',
      message: '45 PathPoints for your last shared ride were added.',
      time: '1 hour ago',
      isRead: true
    },
    {
      id: '3',
      type: 'reward',
      title: 'Reward Earned!',
      message: 'Your friend Amit completed their first trip. You got 100 Pts.',
      time: '3 hours ago',
      isRead: false
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-sm rounded-[32px] mt-16 shadow-2xl relative z-10 animate-scale-in overflow-hidden border border-slate-100">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">Notifications</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-5 border-b border-slate-50 flex gap-4 transition-colors hover:bg-slate-50 ${!n.isRead ? 'bg-[#0d828c]/5' : ''}`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                n.type === 'ride' ? 'bg-blue-100 text-blue-600' : 
                n.type === 'points' ? 'bg-green-100 text-green-600' : 
                'bg-orange-100 text-orange-600'
              }`}>
                <i className={`fa-solid ${
                  n.type === 'ride' ? 'fa-car' : 
                  n.type === 'points' ? 'fa-star' : 
                  'fa-gift'
                }`}></i>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {n.message}
                </p>
                {!n.isRead && (
                  <div className="w-2 h-2 bg-[#0d828c] rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 text-center">
          <button className="text-xs font-black text-[#0d828c] uppercase tracking-widest hover:opacity-70 transition-opacity">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationOverlay;
