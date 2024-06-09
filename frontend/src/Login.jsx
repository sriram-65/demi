import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', { email, password })
      .then(res => {
        console.log(res);
        setSuccess("Registration successful!");
        setError(null);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          setError(err.response.data.error);
        } else {
          setError("An unexpected error occurred.");
        }
        setSuccess(null);
      });
  };

  return (
    <>
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginLeft: "5px" }}>Register</h3>

          <div className="two">
            <input
              type="email"
              placeholder='Enter an email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="three">
            <input
              type="password"
              placeholder='Enter a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <br />
        <h4>I Don't Have Account Register Here:</h4>
        <div className='bt'>
          <p><Link to="/login" style={{ color: "#fff", textAlign: "center" }}> Click to Log-in </Link></p>
        </div>
      </div>
    </>
  );
};

export default Register;
