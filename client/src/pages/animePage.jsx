import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';

const AnimeDetails = () => {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://shikimori.one/api/animes/?id=${id}`);
        setAnimeDetails(response.data[0]);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    fetchAnimeDetails();
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
                {/* Add other details as needed */}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
};

export default AnimeDetails;
