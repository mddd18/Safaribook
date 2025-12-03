import { useState } from 'react';
import { BookCard } from './BookCard';
import { Input } from './ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UserProfileScreen } from './UserProfileScreen';
import { ExchangeRequestDialog } from './ExchangeRequestDialog';
import { toast } from 'sonner';

const books = [
  {
    id: '1',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    username: 'sarahj',
    cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Adventure',
    rating: 4.8,
    isPremium: true,
  },
  {
    id: '2',
    title: 'Classic Tales',
    author: 'Michael Brown',
    username: 'mikeb',
    cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Classic',
    rating: 4.9,
    isPremium: false,
  },
  {
    id: '3',
    title: 'Modern Wisdom',
    author: 'Emma Davis',
    username: 'emmad',
    cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Philosophy',
    rating: 4.7,
    isPremium: true,
  },
  {
    id: '4',
    title: 'The Lost World',
    author: 'James Wilson',
    username: 'jamesw',
    cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Fiction',
    rating: 4.6,
    isPremium: false,
  },
  {
    id: '5',
    title: 'Journey Through Time',
    author: 'Lisa Anderson',
    username: 'lisaa',
    cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Sci-Fi',
    rating: 4.5,
    isPremium: false,
  },
  {
    id: '6',
    title: 'Silent Echoes',
    author: 'Robert Taylor',
    username: 'robt',
    cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Mystery',
    rating: 4.4,
    isPremium: true,
  },
];

const myBooks = [
  {
    id: 'my1',
    title: 'Digital Nomad Life',
    cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'my2',
    title: 'Art of Cooking',
    cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [viewingUserProfile, setViewingUserProfile] = useState<string | null>(null);

  const genres = ['All', 'Adventure', 'Classic', 'Philosophy', 'Fiction', 'Sci-Fi', 'Mystery'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleBookClick = (book: any) => {
    setSelectedBook(book);
    setShowRequestDialog(true);
  };

  const handleSendRequest = (myBookId: string) => {
    const myBook = myBooks.find(b => b.id === myBookId);
    toast.success(`Exchange request sent to @${selectedBook.username}!`, {
      description: `You offered "${myBook?.title}" for "${selectedBook.title}"`,
    });
    setSelectedBook(null);
  };

  const handleViewProfile = (username: string) => {
    setViewingUserProfile(username);
  };

  if (viewingUserProfile) {
    const user = books.find(b => b.username === viewingUserProfile);
    return (
      <UserProfileScreen 
        username={viewingUserProfile}
        isPremium={user?.isPremium || false}
        onBack={() => setViewingUserProfile(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-0">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search books or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        {showFilters && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenre === genre ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <div key={book.id} onClick={() => handleBookClick(book)} className="cursor-pointer">
                <BookCard {...book} />
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(book.username);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    @{book.username}
                  </button>
                  {book.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs px-1.5 py-0">
                      Premium
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Exchange Request Dialog */}
      {selectedBook && (
        <ExchangeRequestDialog
          isOpen={showRequestDialog}
          onClose={() => {
            setShowRequestDialog(false);
            setSelectedBook(null);
          }}
          targetBook={selectedBook}
          myBooks={myBooks}
          onSendRequest={handleSendRequest}
        />
      )}
    </div>
  );
}
