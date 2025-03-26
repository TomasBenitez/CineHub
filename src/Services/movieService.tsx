import { ApiResponse, Movie } from './types';

const API_KEY = 'b9d4cb612e6b4a0d7e9b9f3e2483a0cc';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Error al cargar películas');
  const data: ApiResponse = await response.json();
  return data.results;
};
export const searchMovies = async (query: string): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    if (!response.ok) throw new Error('Error en la búsqueda');
    const data: ApiResponse = await response.json();
    return data.results;
  };

  export const fetchMovieDetails = async (id: number): Promise<Movie> => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-MX`);
      if(!response.ok) throw new Error('Error');
      return await response.json();
  };
 