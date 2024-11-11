import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";

import { MovieData } from "../../interfaces/MovieData";

interface MovieTableProps {
  data: MovieData[];
}
interface SortDirection {
  [key: string]: "asc" | "desc";
}

const MovieTable: React.FC<MovieTableProps> = ({ data }) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>({
    title: "asc",
  });
  const [sortedMovies, setSortedMovies] = useState<MovieData[]>(data);
  useEffect(() => {
    setSortedMovies(data);
  }, [data]);

  const handleSort = (column: keyof MovieData) => {
    const direction = sortDirection[column] === "asc" ? "desc" : "asc";
    setSortDirection({ ...sortDirection, [column]: direction });

    const sortedData = [...sortedMovies].sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === "released") {
        // Convert to Date objects only for comparison
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        if (aDate < bDate) return direction === "asc" ? -1 : 1;
        if (aDate > bDate) return direction === "asc" ? 1 : -1;
        return 0;
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortedMovies(sortedData);
  };

  return (
    <Paper sx={{ width: "70%", overflow: "hidden" }}>
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
                  direction={sortDirection.released || "asc"}
                  onClick={() => handleSort("released")}
                >
                  Released
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sortDirection.imdbRating || "asc"}
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
