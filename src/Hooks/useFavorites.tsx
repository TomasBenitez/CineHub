import { useState, useEffect } from 'react';
import { Movie } from '../Services/types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites(prev => 
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return { favorites, toggleFavorite };
};