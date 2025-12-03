import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Upload } from 'lucide-react';

export function AddBookScreen() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    price: '',
    coverUrl: '',
  });

  const [previewImage, setPreviewImage] = useState('');

  const genres = [
    'Adventure',
    'Classic',
    'Fiction',
    'Mystery',
    'Philosophy',
    'Sci-Fi',
    'Romance',
    'Thriller',
    'Fantasy',
    'Biography',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.genre) {
      alert('Please fill in all required fields');
      return;
    }

    alert(`Book "${formData.title}" added successfully!`);
    
    // Reset form
    setFormData({
      title: '',
      author: '',
      genre: '',
      description: '',
      price: '',
      coverUrl: '',
    });
    setPreviewImage('');
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, coverUrl: url });
    setPreviewImage(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pb-3">
        <h1>Add New Book</h1>
        <p className="text-gray-600 mt-1">Share a book with the community</p>
      </div>
      
      <ScrollArea className="flex-1">
        <form onSubmit={handleSubmit} className="p-4 pt-0 space-y-4">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Book Cover</Label>
            <div className="flex flex-col gap-3">
              {previewImage ? (
                <div className="w-full aspect-[3/4] max-w-[200px] mx-auto rounded-lg overflow-hidden shadow-md">
                  <ImageWithFallback 
                    src={previewImage}
                    alt="Book cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] max-w-[200px] mx-auto rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Cover Preview</p>
                  </div>
                </div>
              )}
              <Input
                placeholder="Enter image URL"
                value={formData.coverUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter book title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
            />
          </div>

          {/* Genre */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genre *</Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => setFormData({ ...formData, genre: value })}
            >
              <SelectTrigger id="genre">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter book description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Rental Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Rental Price (per week)</Label>
            <Input
              id="price"
              placeholder="e.g., $2.99"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Add Book
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
}
