
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error("Full name is required for registration");
        
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        alert('Check your email for verification link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-black relative flex flex-col justify-end min-h-screen">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800')` }}
      ></div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      <div className="p-8 pb-12 z-10 flex flex-col gap-4 animate-fade-in relative">
        <div className="mb-6">
          <h1 className="text-white text-4xl font-extrabold tracking-tighter mb-1">
            path<span className="text-[#0d828c]">share</span>
          </h1>
          <h2 className="text-white text-3xl font-bold mt-4">{isSignUp ? 'Create account.' : 'Welcome back.'}</h2>
          <p className="text-gray-400 mt-2 text-base leading-relaxed">Save fuel, reduce traffic, and meet your community.</p>
        </div>

        <div className="space-y-4">
          {/* Google Sign In Button */}
          <button 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl text-base hover:bg-gray-100 transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-xl disabled:opacity-70"
          >
            {isGoogleLoading ? (
              <i className="fa-solid fa-circle-notch animate-spin text-[#0d828c]"></i>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            )}
            {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-4 my-2">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">or email</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="relative animate-fade-in">
                <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-sm"></i>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 text-white p-4 pl-12 rounded-2xl outline-none focus:border-[#0d828c] focus:bg-white/10 transition-all placeholder:text-white/20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                />
              </div>
            )}
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-sm"></i>
              <input 
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 text-white p-4 pl-12 rounded-2xl outline-none focus:border-[#0d828c] focus:bg-white/10 transition-all placeholder:text-white/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-sm"></i>
              <input 
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 text-white p-4 pl-12 rounded-2xl outline-none focus:border-[#0d828c] focus:bg-white/10 transition-all placeholder:text-white/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <p className="text-red-400 text-sm font-bold px-1 animate-pulse"><i className="fa-solid fa-circle-exclamation mr-2"></i>{error}</p>}

            <button 
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-[#0d828c] text-white font-bold py-4 rounded-2xl text-base hover:bg-[#0b6e77] transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>
        </div>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-white/60 font-semibold py-2 text-sm hover:text-white transition-all mt-2"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New here? Create an account'}
        </button>
        
        <p className="text-gray-500 text-center text-[10px] px-4 mt-8 uppercase tracking-[0.2em] font-black opacity-40">
          Secure Authentication by Supabase
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
