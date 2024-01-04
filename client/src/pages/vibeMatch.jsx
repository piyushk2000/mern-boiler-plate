import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./tinderCard.css"
import { useSelector } from 'react-redux';
import axios from 'axios'
import styled from '@emotion/styled';
import CircularProgress from '@mui/material/CircularProgress';

const StyledContainer = styled.div`
  padding: 8px;
  border: 2px solid black;
  border-radius: 8px;
  background-color: white;
`;

const StyledUsername = styled.h3`
  color: black;
`;
function TinderCards() {




  const [peoples, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchrecommendations = async () => {
      setIsLoading(true);
      try {
        const recommendations = await axios.get(`https://fast-api-copy.vercel.app/recommendations/${currentUser._id}`);
        setPeople(recommendations.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setIsLoading(false);
      }
    };

    fetchrecommendations();
  }, [currentUser._id]);


  const swiped = (direction, nameToDelete) => {
    console.log(`i'm in swiped`, nameToDelete);
    // setLastDirection(direction);
  }

  const outOfFrame = (username) => {
    console.log(`enough tinder today`);

  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
             <CircularProgress />
           </div>;
  }
  return (
    <div className="tinderCard_container">
      {peoples.map((person, index) =>
        <TinderCard
          key={index}
          className="swipe"
          preventSwipe={[`up`, `down`]}
          onSwipe={(dir) => swiped(dir, person.username)}
          onCardLeftScreen={() => outOfFrame(person.username)}
        >
          <div className="card"
            style={{
              backgroundImage: "url(" + person.profilePicture + ")"
            }}>
            <h3 style={{ color: 'white', textShadow: '0 0 8px black' }}>{person.username}</h3>

          </div>

        </TinderCard>
      )}

    </div>
  )
}
export default TinderCards;