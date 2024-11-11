import React , {useState, useEffect} from 'react'
import {getMovies} from '../services/movieService'
import Spinner from '../images/Spinner.svg'
import MovieTable from '../components/MovieTable'
import Filters from '../components/Filters'
import { Pagination } from "@mui/material";
import './Home.css'
function Home() {
const [movies, setMovies] = useState<any>([]);
const [page, setPage] = useState<number>(1);
const [numberOfPages, setNumberOfPages] = useState<number>(1);
const [filterText, setFilterText] = useState<string>('s=game');
const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchUser = async () => {
          setLoading(true)
          try {
            const movieData:any = await getMovies(filterText, page);
            setMovies(movieData.detailedResults);
            setNumberOfPages(movieData.numberOfPages);
          } catch (err:any) {
            console.error(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, [filterText, page]);
      const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
      return (
        <div>
          {loading ? (
            <img style={{marginLeft:'45%', marginTop:'15%'}} src={Spinner} alt="Loading..."/>
          ) : numberOfPages > 0 ? (
            <div className='homepage-container'>
            <Filters filterText={filterText} setFilterText={setFilterText} setPage={setPage}/>
            <MovieTable data={movies}/>
            <Pagination
            count={numberOfPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
          />
            </div>
          ) : (
            <span>No movies found.</span>
          )}
        </div>
      );
}

export default Home