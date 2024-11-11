import React , {useState, useEffect} from 'react'
import {getMovies} from '../services/movieService'
import Spinner from '../images/Spinner.svg'
import MovieTable from '../components/MovieTable'
import Filters from '../components/Filters'
import { Pagination } from "@mui/material";
import './Home.css'
import { Dayjs } from "dayjs";
import { MovieData } from '../interfaces/MovieData'
function Home() {
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [filterText, setFilterText] = useState<string>('s=Pokemon');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState<string>("Pokemon");
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [type, setType] = useState<string>("");

  useEffect(() => {
      const fetchUser = async () => {
          setLoading(true);
          setError(null);
          try {
              const movieData: any = await getMovies(filterText, page);
              if (movieData.error) {
                  setError(movieData.error);
              } else {
                  setMovies(movieData.detailedResults);
                  setNumberOfPages(movieData.numberOfPages);
              }
          } catch (err: any) {
              console.error(err.message);
              setError("An error occurred while fetching movies.");
          } finally {
              setLoading(false);
          }
      };
      fetchUser();
  }, [filterText, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
  };
  const applyFilters = () => {
    let newFilterText = `s=${searchText}`;
    if (selectedYear) {
        newFilterText = `${newFilterText}&y=${selectedYear.year()}`;
    }
    if (type) {
        newFilterText = `${newFilterText}&type=${type}`;
    }
    setPage(1);
    setFilterText(newFilterText);
};
const clearFilters = () => {
    setSearchText("");
    setSelectedYear(null);
    setType("");
};
  return (
      <div className='homepage-container'>
          {loading ? (
              <img style={{ marginTop: '15%' }} src={Spinner} alt="Loading..." />
          ) : error ? (
              <span style={{ marginTop: '15%' }}>{error}</span>
          ) : numberOfPages > 0 ? (
              <>
                  <Filters
                      filterText={filterText}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      type={type}
                      setType={setType}
                      applyFilters={applyFilters}
                      clearFilters={clearFilters}
                  />
                  <MovieTable data={movies} />
                  <Pagination
                      count={numberOfPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                      />
                      </>
          ) : (
              <span style={{ marginTop: '15%' }}>No movies found.</span>
          )}
      </div>
  );
}


export default Home