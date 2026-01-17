
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-50px] left-[-30px] w-64 h-64 border-[40px] border-[#0d828c] rounded-full opacity-80 rotate-45"></div>
      <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 border-[50px] border-[#0d828c] rounded-[100px] opacity-80"></div>
      
      {/* Logo */}
      <div className="z-10 text-center animate-pulse">
        <h1 className="text-white text-6xl font-extrabold tracking-tighter">
          path<span className="text-[#0d828c]">share</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">Travel Together</p>
      </div>
    </div>
  );
};

export default SplashScreen;
