import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Dayjs } from "dayjs";
import './Filters.css'

interface FilterProps {
  filterText: string;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  selectedYear: Dayjs | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  applyFilters: () => void;
  clearFilters: () => void;
}

const Filters: React.FC<FilterProps> = ({
  searchText,
  setSearchText,
  selectedYear,
  setSelectedYear,
  type,
  setType,
  applyFilters,
  clearFilters,
}) => {

  return (
    <div className="filter-container">
      <TextField
        required
        label="Search Movies"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ marginBottom: 2, marginTop: 1 }}
      />
      <DatePicker
        label="Year"
        views={["year"]}
        value={selectedYear}
        onChange={(newValue) => setSelectedYear(newValue)}
        sx={{ marginBottom: 2, marginTop: 1 }}
      />
      <FormControl>
        <RadioGroup
          aria-labelledby="type-radio-group-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
          name="type-group"
        >
          <FormControlLabel value="movie" control={<Radio />} label="Movie" />
          <FormControlLabel value="series" control={<Radio />} label="TV Series" />
          <FormControlLabel value="episode" control={<Radio />} label="TV Series Episodes" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={applyFilters}>
        Submit
      </Button>
      <Button variant="outlined" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
