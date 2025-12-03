import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { MessageCircle, Heart } from 'lucide-react';

interface Feedback {
  id: string;
  userName: string;
  userAvatar: string;
  comment: string;
  timestamp: string;
}

interface CommunityPostProps {
  id: string;
  userName: string;
  userAvatar: string;
  bookTitle: string;
  bookCover: string;
  bookAuthor: string;
  review: string;
  rating: number;
  likes: number;
  timestamp: string;
  feedbacks: Feedback[];
}

export function CommunityPost({ 
  userName, 
  userAvatar, 
  bookTitle, 
  bookCover,
  bookAuthor,
  review, 
  rating, 
  likes, 
  timestamp,
  feedbacks 
}: CommunityPostProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {/* User header */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p>{userName}</p>
            <p className="text-gray-500 text-sm">{timestamp}</p>
          </div>
        </div>

        {/* Book and review */}
        <div className="flex gap-3 mb-3">
          <div className="w-20 h-28 rounded-md overflow-hidden flex-shrink-0">
            <ImageWithFallback 
              src={bookCover} 
              alt={bookTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4>{bookTitle}</h4>
            <p className="text-gray-600 text-sm mb-2">{bookAuthor}</p>
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < rating ? '★' : '☆'}</span>
              ))}
            </div>
            <p className="text-gray-700 line-clamp-3">{review}</p>
          </div>
        </div>

        {/* Likes and comments count */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mb-3 pt-3 border-t">
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{feedbacks.length}</span>
          </button>
        </div>

        {/* Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="space-y-3 pt-3 border-t">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={feedback.userAvatar} />
                  <AvatarFallback>{feedback.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm">{feedback.userName}</p>
                    <span className="text-gray-500 text-xs">{feedback.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
