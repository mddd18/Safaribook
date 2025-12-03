import { CommunityPost } from './CommunityPost';
import { ScrollArea } from './ui/scroll-area';

const communityPosts = [
  {
    id: '1',
    userName: 'Alice Cooper',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bookTitle: 'The Great Adventure',
    bookCover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bookAuthor: 'Sarah Johnson',
    review: 'An absolutely thrilling read! The plot twists kept me on the edge of my seat. Highly recommend this to anyone who loves adventure stories.',
    rating: 5,
    likes: 24,
    timestamp: '2 hours ago',
    feedbacks: [
      {
        id: 'f1',
        userName: 'Bob Smith',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
        comment: 'Thanks for the recommendation! Just added it to my reading list.',
        timestamp: '1h',
      },
      {
        id: 'f2',
        userName: 'Carol White',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        comment: 'I agree! The character development was amazing too.',
        timestamp: '45m',
      },
    ],
  },
  {
    id: '2',
    userName: 'David Martinez',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    bookTitle: 'Classic Tales',
    bookCover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bookAuthor: 'Michael Brown',
    review: 'A timeless masterpiece. The writing style is beautiful and the themes are still relevant today.',
    rating: 5,
    likes: 18,
    timestamp: '5 hours ago',
    feedbacks: [
      {
        id: 'f3',
        userName: 'Emma Davis',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        comment: 'One of my all-time favorites!',
        timestamp: '3h',
      },
    ],
  },
  {
    id: '3',
    userName: 'Sophia Lee',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bookTitle: 'Modern Wisdom',
    bookCover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bookAuthor: 'Emma Davis',
    review: 'This book changed my perspective on life. Deep, thoughtful, and beautifully written.',
    rating: 4,
    likes: 31,
    timestamp: '1 day ago',
    feedbacks: [
      {
        id: 'f4',
        userName: 'John Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
        comment: 'I need to read this! Your review convinced me.',
        timestamp: '12h',
      },
      {
        id: 'f5',
        userName: 'Lisa Anderson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        comment: 'Just finished it yesterday. Absolutely loved it!',
        timestamp: '8h',
      },
    ],
  },
];

export function CommunityScreen() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-3">
        <h1>Community</h1>
        <p className="text-gray-600 mt-1">See what others are reading</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 pt-0 space-y-4">
          {communityPosts.map((post) => (
            <CommunityPost key={post.id} {...post} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
