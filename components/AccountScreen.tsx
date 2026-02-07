
import React, { useState, useRef } from 'react';

interface AccountScreenProps {
  user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    avatar: string;
    bio: string;
    isGovVerified: boolean;
    points: number;
    rides: number;
  };
  onBack: () => void;
  onUpdate: (data: any) => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ user, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate(formData);
      setIsSaving(false);
      setIsEditing(false);
    }, 1200);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderInfoRow = (label: string, value: string, icon: string, field?: string, type = 'text', options: string[] = []) => (
    <div key={label} className="flex items-center gap-4 py-4 border-b border-slate-50 dark:border-slate-800/50">
      <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 shrink-0">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        {isEditing && field ? (
          type === 'select' ? (
            <select 
              className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none mt-1"
              value={(formData as any)[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            >
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input 
              type={type}
              className="w-full bg-transparent font-bold text-slate-900 dark:text-white outline-none mt-1"
              value={(formData as any)[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
          )
        ) : (
          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-white dark:bg-slate-950 flex flex-col h-full overflow-hidden transition-colors">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Header */}
      <div className="p-6 bg-white dark:bg-slate-950 shrink-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 active:scale-90 transition-transform">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Account</h2>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          disabled={isSaving}
          className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            isEditing 
              ? 'bg-[#0d828c] text-white shadow-lg shadow-[#0d828c]/20' 
              : 'bg-slate-50 dark:bg-slate-800 text-slate-500'
          }`}
        >
          {isSaving ? <i className="fa-solid fa-circle-notch animate-spin"></i> : isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-12 space-y-8">
        {/* Profile Card */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-[48px] overflow-hidden ring-4 ring-[#0d828c]/10 p-1 bg-white dark:bg-slate-900 shadow-xl relative">
              <img src={isEditing ? formData.avatar : user.avatar} className="w-full h-full object-cover rounded-[42px]" alt="Avatar" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-[42px] pointer-events-none">
                  <i className="fa-solid fa-camera text-white/50 text-xl"></i>
                </div>
              )}
            </div>
            
            {/* Change Photo Button */}
            {isEditing && (
              <button 
                onClick={handlePhotoClick}
                className="absolute -top-1 -right-1 w-11 h-11 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-[#0d828c] active:scale-90 transition-all z-20 group"
                title="Change Photo"
              >
                <i className="fa-solid fa-camera text-lg group-hover:scale-110 transition-transform"></i>
              </button>
            )}

            {user.isGovVerified && (
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-lg animate-scale-in">
                <i className="fa-solid fa-shield-check text-lg"></i>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{isEditing ? formData.name : user.name}</h3>
          <p className="text-[#0d828c] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Impact Member Since 2022</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{user.points}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">PathPoints</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">{user.rides}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider">Trips Shared</span>
          </div>
        </div>

        {/* Info List */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">Personal Details</h4>
          {renderInfoRow("Full Name", user.name, "fa-user", "name")}
          {renderInfoRow("Phone Number", user.phone, "fa-phone", "phone")}
          {renderInfoRow("Email Address", user.email, "fa-envelope", "email", "email")}
          {renderInfoRow("Gender", user.gender, "fa-venus-mars", "gender", "select", ['Male', 'Female', 'Non-binary', 'Prefer not to say'])}
        </div>

        {/* Bio Section */}
        <div className="space-y-4">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Bio</h4>
           {isEditing ? (
             <textarea 
               className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-5 text-sm font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-[#0d828c]/20 min-h-[100px] border border-slate-100 dark:border-slate-800"
               value={formData.bio}
               onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
             />
           ) : (
             <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800">
               <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic">"{user.bio}"</p>
             </div>
           )}
        </div>

        {/* Verification Status */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${user.isGovVerified ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
               <i className={`fa-solid ${user.isGovVerified ? 'fa-id-card' : 'fa-triangle-exclamation'} text-2xl`}></i>
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-slate-900 dark:text-white">Identity Verification</h5>
              <p className="text-xs text-slate-400 mt-0.5">
                {user.isGovVerified ? 'Government ID Verified' : 'Action Required: Verify your identity'}
              </p>
            </div>
            {user.isGovVerified ? (
              <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black px-2 py-1 rounded-lg uppercase">Active</span>
            ) : (
              <button className="text-[#0d828c] text-xs font-black uppercase tracking-widest">Verify Now</button>
            )}
          </div>
          {user.isGovVerified && (
            <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] dark:opacity-[0.1]">
              <i className="fa-solid fa-shield-check text-[100px]"></i>
            </div>
          )}
        </div>

        {/* Preferences / Settings */}
        <div className="pt-4">
           <button className="w-full flex items-center justify-between p-5 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-lock text-slate-400"></i>
                <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Privacy & Security</span>
              </div>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
           </button>
        </div>
      </div>
    </div>
  );
};

export default AccountScreen;
