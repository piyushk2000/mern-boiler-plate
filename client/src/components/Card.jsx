import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Accordion, AccordionDetails, AccordionSummary, Box, Rating } from '@mui/material';

const Card1 = ({ anime }) => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToWatchlist = () => {
    // You can call your API here
    console.log('Added to watchlist:', anime.name);
  };

  const handleCardClick = () => {
    // Redirect to anime details page using navigate
    navigate(`/anime/${anime.id}`);
  };

  return (
    <div style={{ marginLeft: 10, padding: 5 }} onClick={handleCardClick}>
      <Card sx={{ maxWidth: 345, maxHeight: 300, p: 1, m: 2, minHeight: 300 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" noWrap>
              {anime.name}
            </Typography>
          }
          subheader={`Released on: ${anime.released_on}`}
        />
        <CardMedia
          sx={{ maxWidth: 345, maxHeight: 200, minHeight: 200, borderRadius: 4 }}
          component="img"
          height="10"
          image={`https://shikimori.one${anime.image.original}`}
          alt={anime.name}
        />
        <CardActions disableSpacing>

        </CardActions>
      </Card>
    </div>
  );
};

export default Card1;
