import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  price?: string;
  rating?: number;
  onRent?: () => void;
  showRentButton?: boolean;
}

export function BookCard({ 
  title, 
  author, 
  cover, 
  genre, 
  price, 
  rating,
  onRent,
  showRentButton 
}: BookCardProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
        <ImageWithFallback 
          src={cover} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="line-clamp-1">{title}</h3>
        <p className="text-gray-600 line-clamp-1">{author}</p>
        <div className="flex items-center justify-between mt-1">
          <Badge variant="secondary">{genre}</Badge>
          {rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <span>★</span>
              <span className="text-gray-900">{rating}</span>
            </div>
          )}
        </div>
        {showRentButton && price && (
          <Button onClick={onRent} className="mt-2 w-full">
            Rent - {price}
          </Button>
        )}
      </div>
    </div>
  );
}
