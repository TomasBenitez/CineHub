import { useFavorites } from '../Hooks/useFavorites';
import { MovieList } from './MovieList'; 

export const FavoritesList = () => {
  const { favorites } = useFavorites(); 

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tus películas favoritas</h2>
      {favorites.length > 0 ? (
        <MovieList movies={favorites} /> 
      ) : (
        <p className="text-gray-500">Aún no tienes películas favoritas. ¡Agrega algunas!</p>
      )}
    </div>
  );
};