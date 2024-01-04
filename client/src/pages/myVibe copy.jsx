import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card1 from '../components/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const MyVibe = () => {
  const [userShows, setUserShows] = useState([]);
  const [animeData, setAnimeData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch User Shows
    const fetchUserShows = async () => {
        try {
          let url = `https://vibe-vault-backend-git-main-piyushk2000.vercel.app/api/userShow/user/${currentUser._id}/shows`;
          const params = new URLSearchParams();
      
        //   // Add status filter if selected
        //   if (statusFilter) {
        //     params.append('status', statusFilter);
        //   }
      
        //   // Add favorite filter if toggled
        //   if (isFavorited !== undefined) {
        //     params.append('favorite', isFavorited);
        //   }
      
        //   // If there are any filters, append them to the URL
        //   if (params.toString()) {
        //     url += `?${params.toString()}`;
        //   }
      
          const response = await axios.get(url);
          console.log(url)
          setUserShows(response.data);
        } catch (error) {
          console.error('Error fetching user shows:', error);
        }
      };

    fetchUserShows();
  }, [currentUser._id ]);

  useEffect(() => {
    // Fetch Anime Data from Shikimori API
    const fetchAnimeData = async () => {
      const showIds = userShows.map(show => show.showId).join(',');
      try {
        const response = await axios.get(`https://shikimori.one/api/animes/?ids=[${showIds}]&&page=1&&limit=10`);
        setAnimeData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    if (userShows.length > 0) {
      fetchAnimeData();
    }
  }, [userShows]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const toggleFavorited = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <>
    
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, mt: 2 }}>
        <FormControl sx={{ marginRight: 2 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={statusFilter}
            label="Status"
            onChange={handleStatusChange}
            sx={{minWidth:100}}
          >
            
            <MenuItem value="watched">Watched</MenuItem>
            <MenuItem value="toWatch">To Watch</MenuItem>
            <MenuItem value="dropped">Dropped</MenuItem>
            <MenuItem value="watching">Watching</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch checked={isFavorited} onChange={toggleFavorited} />}
          label="Favorited"
        />
      </Box>
       */}
      <Grid container spacing={3}>
        {animeData.map((anime) => (
          <Grid item key={anime.id} xs={12} sm={6} md={4} lg={3}>
            <Card1 anime={anime} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MyVibe;
