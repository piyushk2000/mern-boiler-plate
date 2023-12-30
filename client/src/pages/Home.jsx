import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card1 from '../components/Card';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://shikimori.one/api/animes?page=${currentPage}&&limit=${itemsPerPage}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container spacing={3}>
        {data.map((anime) => (
          <Grid item key={anime.id} xs={12} sm={6} md={4} lg={3}>
            <Card1 anime={anime} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <Pagination
          count= {500}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default Home;
