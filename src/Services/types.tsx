export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    overview: string;       
    genres: {
      id: number;
      name: string;
    }
    
  }
  
  export interface ApiResponse {
    results: Movie[];
  }


  