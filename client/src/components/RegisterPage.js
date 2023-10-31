import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(''); // Gender info, nb available

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: email, 
        password,
        gender,
      });

      console.log(response.data); // Log server response to the console
    } catch (error) {
      console.error('Sorry! There appears to be an error...', error);
    }
  };

  return (
    <div>
      <h1>Register to see your results quickly upon access</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
