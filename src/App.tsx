import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { RentScreen } from './components/RentScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AddBookScreen } from './components/AddBookScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { Home, BookMarked, Users, User, Plus, Bell } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';

type Screen = 'home' | 'rent' | 'add' | 'community' | 'profile' | 'notifications';

interface User {
  username: string;
  isPremium: boolean;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [notificationCount, setNotificationCount] = useState(2);

  const handleAuth = (username: string, isPremium: boolean) => {
    // Demo: username "admin" avtomatik premium bo'ladi
    const finalIsPremium = username.toLowerCase() === 'admin' ? true : isPremium;
    setUser({ username, isPremium: finalIsPremium });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Show auth screen if user is not logged in
  if (!user) {
    return <AuthScreen onAuth={handleAuth} />;
  }

  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'rent' as Screen, label: 'Rent', icon: BookMarked },
    { id: 'add' as Screen, label: 'Add', icon: Plus, isCenter: true },
    { id: 'community' as Screen, label: 'Community', icon: Users },
    { id: 'profile' as Screen, label: 'Profile', icon: User },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header with Notifications */}
      {activeScreen !== 'notifications' && (
        <div className="border-b bg-white p-4 flex items-center justify-between">
          <h1 className="text-xl">Safari Book</h1>
          <button 
            onClick={() => setActiveScreen('notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeScreen === 'home' && <HomeScreen />}
        {activeScreen === 'rent' && <RentScreen />}
        {activeScreen === 'add' && <AddBookScreen />}
        {activeScreen === 'community' && <CommunityScreen />}
        {activeScreen === 'profile' && <ProfileScreen user={user} onLogout={handleLogout} />}
        {activeScreen === 'notifications' && <NotificationsScreen />}
      </div>

      {/* Bottom Navigation */}
      <nav className="border-t bg-white">
        <div className="flex items-end justify-around px-4 py-2 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <Toaster />
    </div>
  );
}