import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../Services/movieService";
import { Movie } from "../Services/types";

interface MovieDetailsProps {
    movieId: number;
    onClose: () => void;
  }
  
  export const MovieDetails = ({ movieId, onClose }: MovieDetailsProps) => {
    const [movie, setMovie] = useState<Movie | null>(null);
  
    useEffect(() => {
      fetchMovieDetails(movieId).then(setMovie);
    }, [movieId]);
  
    if (!movie) return <div>Cargando...</div>;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={onClose}>X</button>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    );
  };