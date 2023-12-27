// pages/Home.js
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card1 from '../components/Card';
import axios from 'axios';

const Home = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shikimori.one/api/animes?page=1&&limit=12');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {Data.map(anime => (
        <Grid item key={anime.id} xs={12} sm={6} md={4} lg={3}>
          <Card1 anime={anime} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
