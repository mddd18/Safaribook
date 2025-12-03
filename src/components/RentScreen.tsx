import { useState } from 'react';
import { BookCard } from './BookCard';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const availableBooks = [
  {
    id: '1',
    title: 'The Great Adventure',
    author: 'Sarah Johnson',
    cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Adventure',
    price: '$2.99/week',
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Classic Tales',
    author: 'Michael Brown',
    cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Classic',
    price: '$1.99/week',
    rating: 4.9,
  },
  {
    id: '3',
    title: 'Modern Wisdom',
    author: 'Emma Davis',
    cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Philosophy',
    price: '$3.49/week',
    rating: 4.7,
  },
  {
    id: '4',
    title: 'The Lost World',
    author: 'James Wilson',
    cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Fiction',
    price: '$2.49/week',
    rating: 4.6,
  },
];

export function RentScreen() {
  const [rentedBooks, setRentedBooks] = useState<string[]>([]);

  const handleRent = (bookId: string, bookTitle: string) => {
    setRentedBooks([...rentedBooks, bookId]);
    alert(`Successfully rented "${bookTitle}"!`);
  };

  const myRentals = availableBooks.filter(book => rentedBooks.includes(book.id));

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-0">
        <h1 className="mb-4">Rent Books</h1>
      </div>
      
      <Tabs defaultValue="available" className="flex-1 flex flex-col">
        <TabsList className="mx-4 grid w-auto grid-cols-2">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="my-rentals">My Rentals ({myRentals.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {availableBooks.map((book) => (
                  <BookCard 
                    key={book.id} 
                    {...book} 
                    showRentButton={!rentedBooks.includes(book.id)}
                    onRent={() => handleRent(book.id, book.title)}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="my-rentals" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {myRentals.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No rented books yet</p>
                  <p className="text-sm mt-2">Browse available books to start reading</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {myRentals.map((book) => (
                    <BookCard key={book.id} {...book} />
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
