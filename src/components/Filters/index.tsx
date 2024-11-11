import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Dayjs } from "dayjs";
import './Filters.css'

interface FilterProps {
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
  setPage:React.Dispatch<React.SetStateAction<number>>;
}

const Filters: React.FC<FilterProps> = ({ filterText, setFilterText, setPage }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [type, setType] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search Text:", searchText);
    console.log("Selected Year:", selectedYear ? selectedYear.year() : null);
    console.log("Gender:", type);
    let newFilterText  = `s=${searchText}`
    if(selectedYear){
        newFilterText = `${newFilterText}&y=${selectedYear.year()}`
    }
    if(type){
        newFilterText = `${newFilterText}&type=${type}`
    }
    setPage(1);
    setFilterText(newFilterText)
  };

  return (
    <form className="filter-container" onSubmit={handleSubmit}>
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
          <FormControlLabel
            value="series"
            control={<Radio />}
            label="TV Series"
          />
          <FormControlLabel
            value="episode"
            control={<Radio />}
            label="TV Series Episodes"
          />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default Filters;
