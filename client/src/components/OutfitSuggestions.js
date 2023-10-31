import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function OutfitSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const weather = 'sunny'; // Replace with actual weather
    const gender = 'female'; // Replace with actual gender

    axios.get(`http://localhost:5000/outfit/${weather}/${gender}`) 
      .then(response => {
        setSuggestions(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>Outfit Suggestions</h1>
      <p>Outfit suggestions based on weather appear here:</p>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}><img src={suggestion} alt={`suggestion ${index}`}/></li> 
        ))}
      </ul>
    </div>
  );
}

export default OutfitSuggestions;
