/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './userNavBar';
import Footer from '../dashboard.footer';

function TravelHistory({ trips }) {
  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Destination</th>
            <th style={styles.header}>Description</th>
            <th style={styles.header}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip._id}>
              <td style={styles.cell}>{trip.destination.name}</td>
              <td style={styles.cell}>{trip.destination.description}</td>
              <td style={styles.cell}>{new Date(trip.endDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
}

TravelHistory.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      destination: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    margintop: '50px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
  },
  cell: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
  },
};

export default TravelHistory;
