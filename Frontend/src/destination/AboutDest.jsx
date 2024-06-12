/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { bool } from 'prop-types';

function AboutDest() {
    const [destination, setDestination] = useState(null);
    const [authUser] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedDestinationId = JSON.parse(localStorage.getItem('destinationData'))._id;
  
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:4001/destination/destination/${storedDestinationId}`);
                setDestination(response.data); 
            } catch (error) {
                console.error('Error fetching destination:', error);
            }
        };
        fetchDestination(); 
    }, []);

    const openModal = () => {
        document.getElementById('form_modal').showModal();
    };

    const closeModal = () => {
        document.getElementById('form_modal').close();
    };

    const handleBookingClick = () => {
        if (authUser) {
            openModal();
        } else {
            navigate("/login");
        }
    };

    if (!destination) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div style={styles.container}>
                <a href="/" style={styles.homeLink}>Home</a>
                <img 
                    src={destination.image}
                    alt="Photo"
                    style={styles.image}
                />
                <div style={styles.detailsContainer}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>{destination.name}</h2>
                        <div style={styles.priceCategoryContainer}>
                            <div style={styles.price}>${destination.price}</div>
                            <button style={styles.category}>{destination.category}</button>
                        </div>
                    </div>
                    <p style={styles.description}>{destination.details}</p>
                    <div style={styles.bookButtonContainer}>
                        <button onClick={handleBookingClick} style={styles.bookButton}>Book Now</button>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    homeLink: {
        display: 'block',
        marginBottom: '20px',
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '18px',
    },
    image: {
        width: '100%',
        height: '350px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    detailsContainer: {
        background: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    title: {
        fontSize: '24px',
        color: '#333',
    },
    priceCategoryContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px',
    },
    category: {
        backgroundColor: '#e91e63', 
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    price: {
        color: '#4caf50', 
        border: '1px solid #4caf50',
        padding: '5px 10px',
        borderRadius: '5px',
        fontSize: '16px',
    },
    description: {
        fontSize: '16px',
        lineHeight: '1.6',
        marginTop: '10px',
    },
    bookButtonContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    bookButton: {
        backgroundColor: '#e91e63',
        color: 'white',
        textDecoration: 'bold',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AboutDest;
