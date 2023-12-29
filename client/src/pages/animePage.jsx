import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AnimeDetails = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);
  const [userShowDetails, setUserShowDetails] = useState({});
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  // Assuming you have Redux actions to update user details
  const updateUserShowDetails = (field, value) => {
    setUserShowDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const saveUserShowDetails = async () => {
    // Call the API to save user's relationship with the show
    try {
      alert('Done')
      console.log({
        userId: currentUser._id,
        showId: id,
        status: userShowDetails.status,
        episode: userShowDetails.episode,
        favorite: userShowDetails.favorite,
        rating: userShowDetails.rating,
      })
      await axios.post('/api/userShow/user/shows', {
        userId: currentUser._id,
        showId: id,
        status: userShowDetails.status,
        episode: userShowDetails.episode,
        favorite: userShowDetails.favorite,
        rating: userShowDetails.rating,
      });
      // Optionally, update the Redux store with the latest user details
      // dispatch(/* Your Redux action to update user details */);
    } catch (error) {
      console.error('Error saving user show details:', error);
    }
  };

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://shikimori.one/api/animes/${id}`);
        setAnimeDetails(response.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    const fetchUserShowDetails = async () => {
      // Call the API to get user's relationship details with the show
      try {
        const response = await axios.get(`/api/userShow/user/${currentUser._id}/show/${id}`);
        setUserShowDetails(response.data || {});
      } catch (error) {
        console.error('Error fetching user show details:', error);
      }
    };

    fetchAnimeDetails();
    fetchUserShowDetails();
  }, [id]);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {animeDetails && (
        <Card>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="auto"
                image={`https://shikimori.one${animeDetails.image.original}`}
                alt={animeDetails.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {animeDetails.name}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Kind: {animeDetails.kind}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Score: {animeDetails.score}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Status: {animeDetails.status}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Episodes: {animeDetails.episodes}
                </Typography>
                {/* Add more details as needed */}
                {/* Dropdown for status */}
                <FormControl fullWidth>
                  <Select
                    label="Status"
                    value={userShowDetails.status || 'toWatch'}
                    onChange={(e) => updateUserShowDetails('status', e.target.value)}
                  >
                    <MenuItem value="toWatch">To Watch</MenuItem>
                    <MenuItem value="watched">Watched</MenuItem>
                    <MenuItem value="watching">Watching</MenuItem>
                    <MenuItem value="dropped">Dropped</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="subtitle1" paragraph>
                  Episode:
                  <input
                    type="number"
                    value={userShowDetails.episode || 0}
                    onChange={(e) => updateUserShowDetails('episode', e.target.value)}
                  />
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Rating:
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={userShowDetails.rating || 0}
                    onChange={(e) => updateUserShowDetails('rating', e.target.value)}
                  />
                </Typography>
                {/* FavoriteIcon to indicate whether it's in favorites or not */}
                <IconButton
                  onClick={() => updateUserShowDetails('favorite', !userShowDetails.favorite)}
                >
                  <FavoriteIcon color={userShowDetails.favorite ? 'error' : 'disabled'} />
                </IconButton>
                {/* Save button */}
                <Button variant="outlined" onClick={saveUserShowDetails}>
                  Save
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default AnimeDetails;
