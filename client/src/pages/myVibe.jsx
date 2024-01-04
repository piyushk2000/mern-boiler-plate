import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card1 from '../components/Card';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const MyVibe = () => {
  const [userShows, setUserShows] = useState([]);
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserShows = async () => {
      setIsLoading(true); // Set loading to true
      try {
        let url = `https://vibe-vault-backend-git-main-piyushk2000.vercel.app/api/userShow/user/${currentUser._id}/shows`;
        const response = await axios.get(url);
        setUserShows(response.data);
      } catch (error) {
        console.error('Error fetching user shows:', error);
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };

    fetchUserShows();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      if (userShows.length > 0) {
        const showIds = userShows.map(show => show.showId).join(',');
        setIsLoading(true); // Set loading to true
        try {
          const response = await axios.get(`https://shikimori.one/api/animes/?ids=[${showIds}]&&page=1&&limit=10`);
          setAnimeData(response.data);
        } catch (error) {
          console.error('Error fetching anime data:', error);
        } finally {
          setIsLoading(false); // Set loading to false when done
        }
      }
    };

    fetchAnimeData();
  }, [userShows]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
      ) : animeData.length === 0 ? (
        <p>No data found, please add shows to your list</p> 
      ) : (
        <Grid container spacing={3}>
          {animeData.map((anime) => (
            <Grid item key={anime.id} xs={12} sm={6} md={4} lg={3}>
              <Card1 anime={anime} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyVibe;
