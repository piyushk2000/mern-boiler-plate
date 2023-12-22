import React from 'react';
import { styled } from '@mui/material/styles';
import Card1 from '../components/Card'
import axios from 'axios';





export default function Home() {
  const [expanded, setExpanded] = React.useState(false);
  const [Data, setData] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // useEffect to make the GET request when the component mounts
  React.useEffect(() => {
    // Function to fetch data using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shikimori.one/api/animes?page=1&&limit=10');
        // Set the data in the state
        setData(response.data);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  console.log(Data)

  return (
<>
      {/* Rendering the data */}
      {Data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Card1 data={Data} />
    </>
  );
}
