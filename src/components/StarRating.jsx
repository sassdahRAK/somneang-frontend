import { useState } from 'react';
import { Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Star rating component — saves rating to localStorage via AppContext
export default function StarRating({ songId }) {
  const { ratings, rateSong, addNotification, songs } = useApp();
  const [hovered, setHovered] = useState(0);
  const current = ratings[songId] || 0;

  const handleRate = (star) => {
    rateSong(songId, star);
    const song = songs.find(s => s.id === songId);
    if (song) addNotification(`You rated "${song.title}" ${star} star${star > 1 ? 's' : ''}!`);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            size={20}
            className={`transition-colors ${
              star <= (hovered || current)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-600 hover:text-yellow-400'
            }`}
          />
        </button>
      ))}
      {current > 0 && (
        <span className="ml-2 text-xs text-slate-400">{current}/5</span>
      )}
    </div>
  );
}
