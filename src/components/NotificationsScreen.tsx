import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRightLeft, X, Check, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { BookExchangeDialog } from './BookExchangeDialog';

interface ExchangeRequest {
  id: string;
  fromUsername: string;
  fromUserAvatar: string;
  fromBook: {
    id: string;
    title: string;
    cover: string;
    author: string;
  };
  toBook: {
    id: string;
    title: string;
    cover: string;
    author: string;
  };
  timestamp: string;
  status: 'pending' | 'accepted' | 'declined';
  fromUserBooks: Array<{
    id: string;
    title: string;
    cover: string;
    author: string;
    genre: string;
  }>;
}

export function NotificationsScreen() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([
    {
      id: '1',
      fromUsername: 'sarahj',
      fromUserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      fromBook: {
        id: 'my1',
        title: 'Digital Nomad Life',
        cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'John Smith',
      },
      toBook: {
        id: '1',
        title: 'The Great Adventure',
        cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Sarah Johnson',
      },
      timestamp: '2 hours ago',
      status: 'pending',
      fromUserBooks: [
        {
          id: 'user1-book1',
          title: 'Digital Nomad Life',
          cover: 'https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjI1NDM3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          author: 'John Smith',
          genre: 'Lifestyle',
        },
        {
          id: 'user1-book2',
          title: 'Art of Cooking',
          cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          author: 'Gordon Ramsey',
          genre: 'Cooking',
        },
      ],
    },
    {
      id: '2',
      fromUsername: 'mikeb',
      fromUserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      fromBook: {
        id: 'user2-book1',
        title: 'Science Fiction Tales',
        cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Michael Brown',
      },
      toBook: {
        id: '3',
        title: 'Modern Wisdom',
        cover: 'https://images.unsplash.com/photo-1725582205484-77377dad63b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjI0Mjg2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        author: 'Emma Davis',
      },
      timestamp: '5 hours ago',
      status: 'pending',
      fromUserBooks: [
        {
          id: 'user2-book1',
          title: 'Science Fiction Tales',
          cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzYyNDg1ODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
          author: 'Michael Brown',
          genre: 'Sci-Fi',
        },
      ],
    },
  ]);

  const [viewingRequest, setViewingRequest] = useState<ExchangeRequest | null>(null);
  const [selectedBookForExchange, setSelectedBookForExchange] = useState<any>(null);
  const [showExchangeDialog, setShowExchangeDialog] = useState(false);

  const handleDecline = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'declined' as const } : req
    ));
    setViewingRequest(null);
  };

  const handleSelectBook = (request: ExchangeRequest, book: any) => {
    setSelectedBookForExchange(book);
    setViewingRequest(null);
    setShowExchangeDialog(true);
  };

  const handleExchangeConfirm = (details: any) => {
    if (viewingRequest) {
      setRequests(requests.map(req => 
        req.id === viewingRequest.id ? { ...req, status: 'accepted' as const } : req
      ));
    }
    setShowExchangeDialog(false);
    setSelectedBookForExchange(null);
    setViewingRequest(null);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const historyRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1>Notifications</h1>
        {pendingRequests.length > 0 && (
          <Badge variant="destructive" className="ml-2">
            {pendingRequests.length}
          </Badge>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div>
              <h3 className="mb-3">New Requests</h3>
              {pendingRequests.map((request) => (
                <Card key={request.id} className="mb-3">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={request.fromUserAvatar}
                        alt={request.fromUsername}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm mb-2">
                          <span className="text-blue-600">@{request.fromUsername}</span> wants to exchange their book for yours
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                              <ImageWithFallback 
                                src={request.fromBook.cover}
                                alt={request.fromBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs line-clamp-2 max-w-[80px]">{request.fromBook.title}</p>
                          </div>
                          <ArrowRightLeft className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                              <ImageWithFallback 
                                src={request.toBook.cover}
                                alt={request.toBook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-xs line-clamp-2 max-w-[80px]">{request.toBook.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Clock className="w-3 h-3" />
                          {request.timestamp}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setViewingRequest(request)}
                            className="flex-1"
                          >
                            View Their Books
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDecline(request.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* History */}
          {historyRequests.length > 0 && (
            <div>
              <h3 className="mb-3">History</h3>
              {historyRequests.map((request) => (
                <Card key={request.id} className="mb-3 opacity-60">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={request.fromUserAvatar}
                        alt={request.fromUsername}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          Request from @{request.fromUsername}
                        </p>
                        <p className="text-xs text-gray-500">{request.timestamp}</p>
                      </div>
                      <Badge variant={request.status === 'accepted' ? 'default' : 'secondary'}>
                        {request.status === 'accepted' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                        {request.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {requests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* View User's Books Dialog */}
      <Dialog open={viewingRequest !== null} onOpenChange={() => setViewingRequest(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>@{viewingRequest?.fromUsername}'s Books</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Select a book you want in exchange for "{viewingRequest?.toBook.title}"
            </p>
            <div className="grid grid-cols-2 gap-3">
              {viewingRequest?.fromUserBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => viewingRequest && handleSelectBook(viewingRequest, book)}
                  className="cursor-pointer hover:opacity-75 transition-opacity"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                    <ImageWithFallback
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{book.title}</p>
                  <p className="text-xs text-gray-600">{book.author}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{book.genre}</Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => viewingRequest && handleDecline(viewingRequest.id)}
            >
              Decline Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exchange Dialog */}
      {viewingRequest && selectedBookForExchange && (
        <BookExchangeDialog
          isOpen={showExchangeDialog}
          onClose={() => {
            setShowExchangeDialog(false);
            setSelectedBookForExchange(null);
          }}
          yourBook={viewingRequest.toBook}
          theirBook={selectedBookForExchange}
          onConfirm={handleExchangeConfirm}
        />
      )}
    </div>
  );
}
