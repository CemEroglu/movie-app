import React , {useState, useEffect} from 'react'
import {getMovies} from '../services/movieService'
import Spinner from '../images/Spinner.svg'
import MovieTable from '../components/MovieTable'
function Home() {
const [movies, setMovies] = useState<any>([]);
const [searchText, setSearchText] = useState<string>('');
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
            <img style={{marginLeft:'45%', marginTop:'15%'}} src={Spinner} alt="Loading..."/>
          ) : movies.length > 0 ? (
            <MovieTable data={movies} searchText={searchText} setSearchText={setSearchText}/>
            // movies.map((movie: any) => (
            //   <div key={movie.imdbID}>
            //     {movie['Title']}
            //   </div>
            // ))
          ) : (
            <span>No movies found.</span>
          )}
        </div>
      );
}

export default Home