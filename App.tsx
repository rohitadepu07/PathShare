
import React, { useState, useEffect } from 'react';
import { NavState } from './types';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import OfferScreen from './components/OfferScreen';
import ProfileSidebar from './components/ProfileSidebar';
import RideDetailsScreen from './components/RideDetailsScreen';
import LocationPermissionScreen from './components/LocationPermissionScreen';
import FreeTripsScreen from './components/FreeTripsScreen';
import RideHistoryScreen from './components/RideHistoryScreen';
import RewardsScreen from './components/RewardsScreen';
import HelpScreen from './components/HelpScreen';
import FrndCirclesScreen from './components/FrndCirclesScreen';
import AccountScreen from './components/AccountScreen';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavState['currentPage']>('splash');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pathshare-theme');
    return saved === 'dark';
  });

  const [user, setUser] = useState({
    name: 'User',
    email: '',
    phone: '',
    gender: 'Prefer not to say',
    avatar: 'https://picsum.photos/seed/pathshare/200/200',
    bio: 'Commuting daily. Eco-warrior and tech enthusiast.',
    isGovVerified: false,
    points: 0,
    rides: 0
  });

  useEffect(() => {
    // Check for initial session (e.g., on page reload or after OAuth redirect)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setIsLoggedIn(true);
        fetchProfile(session);
        if (currentPage === 'splash' || currentPage === 'login') {
          setCurrentPage('home');
        }
      }
    });

    // Listen for auth changes (Login, Logout, Token Refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session);
        if (currentPage === 'login' || currentPage === 'splash') {
          setCurrentPage('home');
        }
      } else {
        setIsLoggedIn(false);
        setCurrentPage('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (currentSession: any) => {
    if (!currentSession?.user) return;
    
    const userId = currentSession.user.id;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUser(prev => ({ ...prev, ...data }));
    } else if (error && error.code === 'PGRST116') {
      // Profile doesn't exist, create it using session metadata (ideal for Google OAuth)
      const userMetadata = currentSession.user.user_metadata;
      const newProfile = {
        id: userId,
        name: userMetadata?.full_name || currentSession.user.email?.split('@')[0] || 'User',
        email: currentSession.user.email || '',
        avatar: userMetadata?.avatar_url || `https://picsum.photos/seed/${userId}/200/200`,
        bio: 'New PathShare member.',
        points: 50 // Welcome bonus points
      };
      
      const { error: upsertError } = await supabase.from('profiles').upsert(newProfile);
      if (!upsertError) {
        setUser(prev => ({ ...prev, ...newProfile }));
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pathshare-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pathshare-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (currentPage === 'splash') {
      const timer = setTimeout(() => {
        // If still splash after 2.5s and not logged in, go to login
        if (currentPage === 'splash' && !isLoggedIn) {
          setCurrentPage('login');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentPage, isLoggedIn]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    setCurrentPage('login');
    setHasLocationPermission(false);
  };

  const handleUpdateProfile = async (newData: Partial<typeof user>) => {
    if (!session) return;
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: session.user.id, ...newData });
    
    if (!error) {
      setUser(prev => ({ ...prev, ...newData }));
    }
  };

  const handleSelectRide = (ride: any) => {
    setSelectedRide(ride);
    setCurrentPage('ride-details');
  };

  const handleFindRideClick = () => {
    if (hasLocationPermission) {
      setCurrentPage('search');
    } else {
      setCurrentPage('location-permission');
    }
  };

  const handleLocationGranted = () => {
    setHasLocationPermission(true);
    setCurrentPage('search');
  };

  const handleGoToFreeTrips = () => {
    setCurrentPage('free-trips');
    setIsSidebarOpen(false);
  };

  const handleGoToRewards = () => {
    setCurrentPage('rewards');
    setIsSidebarOpen(false);
  };

  const handleGoToHelp = () => {
    setCurrentPage('help');
    setIsSidebarOpen(false);
  };

  const handleGoToFrndCircles = () => {
    setCurrentPage('frnd-circles');
    setIsSidebarOpen(false);
  };

  const handleGoToAccount = () => {
    setCurrentPage('account');
    setIsSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'splash':
        return <SplashScreen />;
      case 'location-permission':
        return (
          <LocationPermissionScreen 
            onAllow={handleLocationGranted} 
            onDeny={() => {
              setHasLocationPermission(true); 
              setCurrentPage('search');
            }} 
          />
        );
      case 'login':
        return <LoginScreen onLogin={() => setCurrentPage('home')} />;
      case 'home':
        return (
          <HomeScreen 
            onOpenSidebar={() => setIsSidebarOpen(true)} 
            onSearchClick={handleFindRideClick}
            onOfferClick={() => setCurrentPage('offer')}
            onFreeTripsClick={handleGoToFreeTrips}
            onFrndCirclesClick={handleGoToFrndCircles}
            onAccountClick={handleGoToAccount}
          />
        );
      case 'search':
        return <SearchScreen onBack={() => setCurrentPage('home')} onSelectRide={handleSelectRide} />;
      case 'offer':
        return <OfferScreen onBack={() => setCurrentPage('home')} />;
      case 'ride-details':
        return <RideDetailsScreen ride={selectedRide} onBack={() => setCurrentPage('search')} />;
      case 'free-trips':
        return <FreeTripsScreen onBack={() => setCurrentPage('home')} />;
      case 'ride-history':
        return <RideHistoryScreen onBack={() => setCurrentPage('home')} />;
      case 'rewards':
        return <RewardsScreen onBack={() => setCurrentPage('home')} />;
      case 'help':
        return <HelpScreen onBack={() => setCurrentPage('home')} />;
      case 'frnd-circles':
        return <FrndCirclesScreen onBack={() => setCurrentPage('home')} />;
      case 'account':
        return <AccountScreen user={user} onBack={() => setCurrentPage('home')} onUpdate={handleUpdateProfile} />;
      default:
        return <HomeScreen onOpenSidebar={() => setIsSidebarOpen(true)} onSearchClick={handleFindRideClick} onOfferClick={() => setCurrentPage('offer')} onFreeTripsClick={handleGoToFreeTrips} onFrndCirclesClick={handleGoToFrndCircles} onAccountClick={handleGoToAccount} />;
    }
  };

  return (
    <div className={`relative max-w-md mx-auto min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-white'} shadow-2xl overflow-hidden flex flex-col antialiased transition-colors duration-300`}>
      {renderPage()}
      
      <ProfileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout}
        user={user}
        isLoggedIn={isLoggedIn}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onUpdateProfile={handleUpdateProfile}
        onNavigateToFreeTrips={handleGoToFreeTrips}
        onNavigateToRewards={handleGoToRewards}
        onNavigateToHelp={handleGoToHelp}
        onNavigateToFrndCircles={handleGoToFrndCircles}
        onNavigateToAccount={handleGoToAccount}
        onNavigateToHistory={() => {
          setIsSidebarOpen(false);
          setCurrentPage('ride-history');
        }}
      />
    </div>
  );
};

export default App;
