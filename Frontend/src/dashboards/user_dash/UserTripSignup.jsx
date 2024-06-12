/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Navbar from './userNavBar';
import Footer from '../dashboard.footer';

function UserTripSignup({ destination }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userData'))._id;

    try {
      await axios.post('http://localhost:4001/api/user-trips', {
        userId,
        destinationId: destination._id,
        startDate,
        endDate,
        status: 'booked',
      });
      navigate('/user-trips');
    } catch (error) {
      console.error('Error signing up for trip:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <label style={styles.label}>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.row}>
        <label style={styles.label}>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>Submit</button>
    </form>
    </div>
    <Footer/>
    </>
  );
}

UserTripSignup.propTypes = {
  destination: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = {
  container: {
    padding: '20px',
    marginTop: '50px',
  },
  form: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  row: {
    display: 'flex',
    marginBottom: '15px',
  },
  label: {
    flex: '1',
    fontWeight: 'bold',
    paddingRight: '10px',
    textAlign: 'right',
    alignSelf: 'center',
  },
  input: {
    flex: '2',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default UserTripSignup;
