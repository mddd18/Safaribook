import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { BookOpen, Heart, MessageCircle, Crown, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookCard } from './BookCard';

interface UserProfileScreenProps {
  username: string;
  isPremium: boolean;
  onBack: () => void;
}

export function UserProfileScreen({ username, isPremium, onBack }: UserProfileScreenProps) {
  const userData = {
    fullName: 'Sarah Johnson',
    username: username,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Book enthusiast and avid reader. Love sharing great stories!',
    stats: {
      booksShared: 15,
      reviews: 28,
      likes: 142,
    },
    books: [
      {
        id: '1',
        title: 'The Great Adventure',
        author: 'Sarah Johnson',
        cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        genre: 'Adventure',
        rating: 4.8,
      },
      {
        id: '2',
        title: 'Modern Wisdom',
        author: 'Sarah Johnson',
        cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        genre: 'Philosophy',
        rating: 4.7,
      },
    ],
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2>Profile</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              {isPremium && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h2>{userData.fullName}</h2>
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-gray-600">@{userData.username}</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              {userData.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                <p className="text-xl">{userData.stats.booksShared}</p>
                <p className="text-gray-600 text-xs">Books Shared</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                <p className="text-xl">{userData.stats.reviews}</p>
                <p className="text-gray-600 text-xs">Reviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                <p className="text-xl">{userData.stats.likes}</p>
                <p className="text-gray-600 text-xs">Likes</p>
              </CardContent>
            </Card>
          </div>

          {/* User's Books */}
          <div>
            <h3 className="mb-3">Available Books</h3>
            <div className="grid grid-cols-2 gap-4">
              {userData.books.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
