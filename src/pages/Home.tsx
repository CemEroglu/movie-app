import React , {useState, useEffect} from 'react'
import {getMovies} from '../services/movieService'
function Home() {
const [movies, setMovies] = useState<any>([]);
const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const movieData:any = await getMovies('userId');
            setMovies(movieData);
          } catch (err:any) {
            console.error(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, []);
      return (
        <div>
          {loading ? (
            <span>Loading...</span>
          ) : movies.length > 0 ? (
            movies.map((movie: any) => (
              <div key={movie.imdbID}>
                {movie['Title']}
              </div>
            ))
          ) : (
            <span>No movies found.</span>
          )}
        </div>
      );
}

export default Home