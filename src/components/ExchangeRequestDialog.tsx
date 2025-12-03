import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRightLeft } from 'lucide-react';

interface ExchangeRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  targetBook: {
    id: string;
    title: string;
    author: string;
    cover: string;
    username: string;
  };
  myBooks: Array<{
    id: string;
    title: string;
    cover: string;
  }>;
  onSendRequest: (myBookId: string) => void;
}

export function ExchangeRequestDialog({ 
  isOpen, 
  onClose, 
  targetBook,
  myBooks,
  onSendRequest 
}: ExchangeRequestDialogProps) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleSend = () => {
    if (!selectedBookId) {
      alert('Please select a book to offer');
      return;
    }
    onSendRequest(selectedBookId);
    setSelectedBookId(null);
    onClose();
  };

  const selectedBook = myBooks.find(b => b.id === selectedBookId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Send Exchange Request</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">You want:</p>
            <div className="flex items-center gap-2">
              <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback 
                  src={targetBook.cover}
                  alt={targetBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm line-clamp-2">{targetBook.title}</p>
                <p className="text-xs text-gray-600">by {targetBook.author}</p>
                <p className="text-xs text-blue-600">@{targetBook.username}</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <ArrowRightLeft className="w-5 h-5 text-gray-400 mx-auto" />
          </div>

          <div>
            <p className="text-sm mb-3">Select your book to offer:</p>
            <div className="grid grid-cols-2 gap-3">
              {myBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className={`cursor-pointer transition-all ${
                    selectedBookId === book.id 
                      ? 'ring-2 ring-blue-600 rounded-lg' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                    <ImageWithFallback
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{book.title}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedBookId && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                You will send a request to exchange <span className="font-medium">{selectedBook?.title}</span> for <span className="font-medium">{targetBook.title}</span>
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSend} 
              className="flex-1"
              disabled={!selectedBookId}
            >
              Send Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
