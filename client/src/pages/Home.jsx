import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card1 from '../components/Card';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const [data, setData] = useState([]);
  const itemsPerPage = 12;
  const [totalPage, setTotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(parseInt(sessionStorage.getItem('pageNumber')) || 1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('ranked');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTotalPage(currentPage + 9);
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://shikimori.one/api/animes`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          order: sortOption,
          search: searchTerm
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [currentPage, sortOption])

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    sessionStorage.setItem('pageNumber', value.toString());
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchClick = () => {
    fetchData();
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, mt: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
        />
        <FormControl sx={{ marginRight: 2 }}>
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
            sx={{ width: 100 }}
          >
            {/* Add your sorting options here */}
            <MenuItem value="ranked">Ranked</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
            <MenuItem value="aired_on">Release Date</MenuItem>
            <MenuItem value="name">Alphabetical</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </Box>
      <Grid container spacing={3}>
        {data.map((anime) => (
          <Grid item key={anime.id} xs={12} sm={6} md={4} lg={3}>
            <Card1 anime={anime} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, mb: 2 }}>
        <Pagination
          count={totalPage}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default Home;
