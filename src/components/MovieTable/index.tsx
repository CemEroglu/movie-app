import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {MovieData} from '../../interfaces/MovieData'
interface MovieTableProps{
  data:MovieData[];
  searchText:string;
  setSearchText:React.Dispatch<React.SetStateAction<string>>;
}
interface SortDirection {
  [key: string]: 'asc' | 'desc';
}

const MovieTable: React.FC<MovieTableProps> =({data,searchText,setSearchText})=> {
  const [sortDirection, setSortDirection] = useState<SortDirection>({ title: 'asc' });
  const [sortedMovies, setSortedMovies] = useState<MovieData[]>(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredMovies = data.filter(
      (movie) =>
        movie.title.toLowerCase().includes(value)
        // movie.title.toLowerCase().includes(value) || movie.director.toLowerCase().includes(value)
    );

    setSortedMovies(filteredMovies);
  };

  const handleSort = (column: keyof MovieData) => {
    const direction = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    setSortDirection({ ...sortDirection, [column]: direction });

    const sortedData = [...sortedMovies].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedMovies(sortedData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
        sx={{ marginBottom: 2, marginTop:1 }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.title}
                  onClick={() => handleSort('title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.director || 'asc'}
                  onClick={() => handleSort('title')}
                >
                  Director
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.year || 'asc'}
                  onClick={() => handleSort('title')}
                >
                  Year
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMovies.map((movie) => (
              <TableRow key={movie.title}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MovieTable;