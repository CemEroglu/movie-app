import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Paper,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MovieData } from "../../interfaces/MovieData";
import Filters from "../Filters";
interface MovieTableProps {
  data: MovieData[];
}
interface SortDirection {
  [key: string]: "asc" | "desc";
}

const MovieTable: React.FC<MovieTableProps> = ({
  data,
}) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    title: "asc",
  });
  const [sortedMovies, setSortedMovies] = useState<MovieData[]>(data);
  useEffect(() => {
    setSortedMovies(data);
  }, [data]);

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value.toLowerCase();
  //   setSearchText(value);

  //   const filteredMovies = data.filter(
  //     (movie) => movie.title.toLowerCase().includes(value)
  //     // movie.title.toLowerCase().includes(value) || movie.director.toLowerCase().includes(value)
  //   );

  //   setSortedMovies(filteredMovies);
  // };

  const handleSort = (column: keyof MovieData) => {
    const direction = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ ...sortDirection, [column]: direction });

    const sortedData = [...sortedMovies].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedMovies(sortedData);
  };

  return (
    <Paper sx={{ width: "70%", overflow: "hidden" }}>
      {/* <TextField
        label="Search Movies"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ marginBottom: 2, marginTop: 1 }}
      />
      <DatePicker
        label={'"Year"'}
        views={["year"]}
        sx={{ marginBottom: 2, marginTop: 1 }}
      />

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={(e) => {
            alert(e.target.value);
          }}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <Filters searchText={searchText} setSearchText={setSearchText}/> */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.title}
                  onClick={() => handleSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.director || "asc"}
                  onClick={() => handleSort("director")}
                >
                  Director
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.year || "asc"}
                  onClick={() => handleSort("released")}
                >
                  Released
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.year || "asc"}
                  onClick={() => handleSort("imdbRating")}
                >
                  IMDB Rating
                </TableSortLabel>
              </TableCell>
              <TableCell>IMDB ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMovies.map((movie) => (
              <TableRow
                key={movie.imdbID}
                onClick={() => window.open(movie.poster, "_blank")}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ width: 50, height: "auto" }}
                  />
                </TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.director}</TableCell>
                <TableCell>{movie.released}</TableCell>
                <TableCell>{movie.imdbRating}</TableCell>
                <TableCell>{movie.imdbID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MovieTable;
