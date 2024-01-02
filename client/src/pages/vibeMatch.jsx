import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "./tinderCard.css"
import { useSelector } from 'react-redux';
import axios from 'axios'
import styled from '@emotion/styled';

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




  const [peoples, setPeople] = useState([
    // {
    //   username:`Elon Musk`,
    //   profilePicture:`https://media.gettyimages.com/photos/of-tesla-and-space-x-elon-musk-attends-the-2015-vanity-fair-oscar-picture-id464172224?k=6&m=464172224&s=612x612&w=0&h=M9Wf9-mcTJBLRWKFhAX_QGVAPXogzxyvZeCiIV5O3pw=`
    // },
    // {
    //   username:`Jeff Bezos`,
    //   profilePicture:`https://media.gettyimages.com/photos/amazon-ceo-jeff-bezos-founder-of-space-venture-blue-origin-and-owner-picture-id1036094130?k=6&m=1036094130&s=612x612&w=0&h=3tKtZs6_SIXFZ2sdRUB4LjAf_GlfCMekP2Morwkt5EM=`
    // }
  ]);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchrecommendations = async () => {
      try {
        const recommendations = await axios.get(`https://fast-api-kj5i.onrender.com/recommendations/${currentUser._id}`);
        setPeople(recommendations.data)
        console.log(recommendations.data)

      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchrecommendations();

  }, [])


  const swiped = (direction, nameToDelete) => {
    console.log(`i'm in swiped`, nameToDelete);
    // setLastDirection(direction);
  }

  const outOfFrame = (username) => {
    console.log(`enough tinder today`);

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