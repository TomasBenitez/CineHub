import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./Services/movieService";
import { Movie } from "./Services/types";
import LoadingSpinner from "./Components/LoadingSpinner";
import { SearchBar } from "./Components/SearchBar";
import { MovieDetails } from "./Components/MovieDetails";
import { Pagination } from "./Components/Pagination";
import { MovieList } from "./Components/MovieList";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavoritesList } from "./Components/favoritesList";

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
        setLoading(false);
      } catch (error) {
        setError("Error al cargar películas");
        setLoading(false);
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
    <Router>
      <div className="container mx-auto px-4">
        {/* Navbar */}
        <nav className="bg-blue-600 p-4 text-white">
          <Link to="/" className="mr-4">Inicio</Link>
          <Link to="/favoritos">Favoritos</Link>
        </nav>

        {/* Título y SearchBar (solo en la página principal) */}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <h1 className="text-3xl my-4">CineHub</h1>
                <SearchBar onSearch={handleSearch} />
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <MovieList movies={movies} />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(newPage) => setCurrentPage(newPage)}
                    />
                  </>
                )}
              </>
            } 
          />
          <Route 
            path="/favoritos" 
            element={<FavoritesList />} 
          />
        </Routes>

        {/* MovieDetails (compartido en todas las rutas) */}
        {selectedMovieId && (
          <MovieDetails 
            movieId={selectedMovieId} 
            onClose={() => setSelectedMovieId(null)} 
          />
        )}
      </div>
    </Router>
  );
}

export default App;