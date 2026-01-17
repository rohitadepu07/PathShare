
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavState['currentPage']>('splash');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('pathshare-theme');
    return saved === 'dark';
  });

  const [user, setUser] = useState({
    name: 'Aravind Sanka',
    email: 'aravinds6@gmail.com',
    avatar: 'https://picsum.photos/seed/pathshare/200/200',
    bio: 'Commuting to Whitefield daily. Eco-warrior and tech enthusiast.'
  });

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
      const timer = setTimeout(() => setCurrentPage('login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    setCurrentPage('login');
    setHasLocationPermission(false);
  };

  const handleUpdateProfile = (newData: Partial<typeof user>) => {
    setUser(prev => ({ ...prev, ...newData }));
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
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return (
          <HomeScreen 
            onOpenSidebar={() => setIsSidebarOpen(true)} 
            onSearchClick={handleFindRideClick}
            onOfferClick={() => setCurrentPage('offer')}
            onFreeTripsClick={handleGoToFreeTrips}
            onFrndCirclesClick={handleGoToFrndCircles}
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
      default:
        return <HomeScreen onOpenSidebar={() => setIsSidebarOpen(true)} onSearchClick={handleFindRideClick} onOfferClick={() => setCurrentPage('offer')} onFreeTripsClick={handleGoToFreeTrips} onFrndCirclesClick={handleGoToFrndCircles} />;
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
        onNavigateToHistory={() => {
          setIsSidebarOpen(false);
          setCurrentPage('ride-history');
        }}
      />
    </div>
  );
};

export default App;
