
import React from 'react';
import { Star, Play } from 'lucide-react';
import { Button } from './ui/button';

const TikTokReviews = () => {
  const reviews = [
    {
      thumbnail: "/placeholder.svg",
      category: "Protection",
      quote: "Perfect for tracking my luggage during travels!",
      author: "@traveler_jane"
    },
    {
      thumbnail: "/placeholder.svg",
      category: "Design",
      quote: "Sleek and elegant, matches everything!",
      author: "@tech_sarah"
    },
    {
      thumbnail: "/placeholder.svg",
      category: "Ease of Use",
      quote: "Setup took less than 2 minutes!",
      author: "@gadget_pro"
    }
  ];

  return (
    <section className="bg-[#FF6F61] py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Customer Reviews</span>
            </div>
            <h2 className="text-5xl font-playfair leading-tight">Track Your Things with Style</h2>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
              <span className="ml-2 text-lg">4.9/5 (2.5k+ reviews)</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="relative aspect-[9/16] mb-4 rounded-lg overflow-hidden bg-black/20">
                  <img 
                    src={review.thumbnail} 
                    alt={`TikTok by ${review.author}`}
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    className="absolute inset-0 w-full h-full hover:bg-black/20 group"
                  >
                    <Play className="w-12 h-12 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium opacity-80">{review.category}</span>
                  <p className="italic">"{review.quote}"</p>
                  <p className="text-sm opacity-80">{review.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TikTokReviews;
