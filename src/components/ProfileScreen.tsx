import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, Heart, MessageCircle, Settings, LogOut, ArrowRightLeft, Crown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { PremiumBenefitsScreen } from './PremiumBenefitsScreen';

interface ProfileScreenProps {
  user: {
    username: string;
    isPremium: boolean;
  };
  onLogout: () => void;
}

export function ProfileScreen({ user, onLogout }: ProfileScreenProps) {
  const [showPremiumBenefits, setShowPremiumBenefits] = useState(false);

  if (showPremiumBenefits) {
    return <PremiumBenefitsScreen onClose={() => setShowPremiumBenefits(false)} />;
  }

  const stats = [
    { label: 'Books Read', value: '23', icon: BookOpen },
    { label: 'Reviews', value: '12', icon: MessageCircle },
    { label: 'Likes Given', value: '89', icon: Heart },
  ];

  const recentActivity = [
    { book: 'The Great Adventure', action: 'Reviewed', time: '2 hours ago' },
    { book: 'Classic Tales', action: 'Finished reading', time: '1 day ago' },
    { book: 'Modern Wisdom', action: 'Started reading', time: '3 days ago' },
  ];

  const exchangeHistory = [
    { 
      book: 'The Great Adventure', 
      type: 'Exchanged', 
      with: '@sarahj',
      date: 'Nov 6, 2025',
      status: 'Completed'
    },
    { 
      book: 'Silent Echoes', 
      type: 'Exchanged', 
      with: '@mikeb',
      date: 'Nov 3, 2025',
      status: 'Completed'
    },
    { 
      book: 'Journey Through Time', 
      type: 'Exchanged', 
      with: '@lisaa',
      date: 'Nov 1, 2025',
      status: 'Completed'
    },
    { 
      book: 'Classic Tales', 
      type: 'Exchanged', 
      with: '@robt',
      date: 'Oct 28, 2025',
      status: 'Completed'
    },
    { 
      book: 'Modern Wisdom', 
      type: 'Rented', 
      price: '$3.49',
      date: 'Oct 25, 2025',
      status: 'Returned'
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1525451350286-a21d5aef139c?w=150" />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {user.isPremium && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h2>{user.username}</h2>
              {user.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-gray-600">@{user.username.toLowerCase()}</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Book lover and adventure seeker. Always looking for the next great read!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-4 text-center">
                    <Icon className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                    <p className="text-gray-600 text-xs">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Premium Banner */}
          {!user.isPremium && (
            <Card 
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 border-0 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setShowPremiumBenefits(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="text-white mb-1">Premium Imtiyozlar</h3>
                    <p className="text-sm text-white/90">Barcha imkoniyatlarni ko'ring</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </CardContent>
            </Card>
          )}

          {user.isPremium && (
            <Card 
              className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setShowPremiumBenefits(true)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-amber-900 mb-1">Premium Foydalanuvchi</h3>
                    <p className="text-sm text-gray-600">Imtiyozlaringizni ko'ring</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Tabs */}
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="history">Exchange History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      className={`p-4 ${index !== recentActivity.length - 1 ? 'border-b' : ''}`}
                    >
                      <p className="line-clamp-1">{activity.book}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  {exchangeHistory.map((item, index) => (
                    <div 
                      key={index}
                      className={`p-4 ${index !== exchangeHistory.length - 1 ? 'border-b' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="line-clamp-1">{item.book}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                            <p className="text-sm text-gray-600">{item.type}</p>
                            {'with' in item && (
                              <>
                                <span className="text-gray-400">•</span>
                                <p className="text-sm text-blue-600">{item.with}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{item.date}</p>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                              item.status === 'Completed' 
                                ? 'bg-green-100 text-green-700' 
                                : item.status === 'Returned'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Settings */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}