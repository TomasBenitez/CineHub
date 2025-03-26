export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;       // Se llama "overview" en la API, no "sinopsis"
    genres: {
      id: number;
      name: string;
    }
    
  }
  
  export interface ApiResponse {
    results: Movie[];
  }


  