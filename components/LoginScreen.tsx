
import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex-1 bg-black relative flex flex-col justify-end">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800')` }}
      ></div>
      
      <div className="p-8 pb-16 z-10 flex flex-col gap-4">
        <div className="mb-8">
          <h2 className="text-white text-4xl font-bold">Welcome.</h2>
          <p className="text-gray-300 mt-2 text-lg">Save fuel, reduce traffic, and meet new people.</p>
        </div>

        <button 
          onClick={onLogin}
          className="w-full bg-[#0d828c] text-white font-semibold py-4 rounded-2xl text-lg hover:bg-[#0b6e77] transition-all transform active:scale-95"
        >
          Create new account
        </button>

        <button 
          onClick={onLogin}
          className="w-full bg-white text-gray-900 font-semibold py-4 rounded-2xl text-lg hover:bg-gray-100 transition-all transform active:scale-95"
        >
          Login with phone number
        </button>
        
        <p className="text-gray-400 text-center text-xs px-4 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
