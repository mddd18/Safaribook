import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface BookExchangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  yourBook: {
    id: string;
    title: string;
    cover: string;
  };
  theirBook: {
    id: string;
    title: string;
    author: string;
    cover: string;
  };
  onConfirm: (details: { date: string; time: string; location: string }) => void;
}

export function BookExchangeDialog({ 
  isOpen, 
  onClose, 
  yourBook, 
  theirBook,
  onConfirm 
}: BookExchangeDialogProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleConfirm = () => {
    if (!date || !time || !location) {
      alert('Please fill in all fields');
      return;
    }
    onConfirm({ date, time, location });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Exchange Books</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Books Preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback 
                  src={yourBook.cover}
                  alt={yourBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm line-clamp-2">{yourBook.title}</p>
            </div>
            <div className="text-gray-400">⇄</div>
            <div className="flex items-center gap-2 flex-1">
              <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                <ImageWithFallback 
                  src={theirBook.cover}
                  alt={theirBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm line-clamp-2">{theirBook.title}</p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Exchange Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Exchange Time
            </Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="13:00">01:00 PM</SelectItem>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
                <SelectItem value="17:00">05:00 PM</SelectItem>
                <SelectItem value="18:00">06:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location Selection */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Meeting Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="central-library">Central Library</SelectItem>
                <SelectItem value="tashkent-park">Tashkent Park</SelectItem>
                <SelectItem value="magic-city">Magic City</SelectItem>
                <SelectItem value="next-mall">Next Mall</SelectItem>
                <SelectItem value="compass-cafe">Compass Cafe</SelectItem>
                <SelectItem value="other">Other (Custom)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Confirm Exchange
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
