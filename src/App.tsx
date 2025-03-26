import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./Services/movieService";
import { Movie } from "./Services/types";
import LoadingSpinner from "./Components/LoadingSpinner";
import { SearchBar } from "./Components/SearchBar";
import { MovieDetails } from "./Components/MovieDetails";
import { Pagination } from "./Components/Pagination";
import { MovieList } from "./Components/MovieList";


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const { movies, totalPages } = await getPopularMovies(currentPage); 
        setMovies(movies);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    loadMovies();
  }, [currentPage]); 
  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
   
      <h1>CineHub</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
     
     

      
      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>

  )
}
<div className="container mx-auto px-4">
    <MovieList movies={movies} />
    
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(newPage) => setCurrentPage(newPage)}
    />
  </div>
</>
  )}

  export default App


   
 
