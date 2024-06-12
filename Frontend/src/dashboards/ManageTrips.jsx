import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Navbar from "./admin.navbar";
import Footer from './dashboard.footer';

Modal.setAppElement('#root'); 

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState([]);
  const [editingDestinationId, setEditingDestinationId] = useState(null);
  const [editedDestination, setEditedDestination] = useState({});
  const [isAddingDestination, setIsAddingDestination] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:4001/destination");
        setDestinations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  const handleEditClick = (id) => {
    const destination = destinations.find((destination) => destination._id === id);
    setEditedDestination(destination);
    setEditingDestinationId(id);
    setIsAddingDestination(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDestination({
      ...editedDestination,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAddingDestination) {
        await handleAddNewDestination();
      } else {
        await axios.put(`http://localhost:4001/destination/${editingDestinationId}`, editedDestination);
      }
      const res = await axios.get("http://localhost:4001/destination");
      setDestinations(res.data);
      setEditingDestinationId(null);
      setEditedDestination({});
      setIsAddingDestination(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error during form submission", error.response ? error.response.data : error.message);
    }
  };

  const handleAddNewDestination = async () => {
    try {
      const newDestination = {
        name: editedDestination.name,
        details: editedDestination.details,
        price: editedDestination.price,
        category: editedDestination.category,
        image: editedDestination.image,
      };

      await axios.post("http://localhost:4001/destination", newDestination);
      const res = await axios.get("http://localhost:4001/destination");
      setDestinations(res.data);
      setEditedDestination({});
      setIsAddingDestination(false);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error adding new destination", error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/destination/delete/${id}`);
      const res = await axios.get("http://localhost:4001/destination");
      setDestinations(res.data);
    } catch (error) {
      console.log("Error deleting destination", error.response ? error.response.data : error.message);
    }
  };

  const handleAddDestinationClick = () => {
    setEditedDestination({});
    setEditingDestinationId(null);
    setIsAddingDestination(true);
    setIsModalOpen(true);
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <button onClick={handleAddDestinationClick} style={styles.addButton}>
        Add new destination
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <React.Fragment key={destination._id}>
              <tr>
                <td style={styles.cell}>{destination.destination_id}</td>
                <td style={styles.cell}>{destination.name}</td>
                <td style={styles.cell}>{destination.details}</td>
                <td style={styles.cell}>{destination.price}</td>
                <td style={styles.cell}>{destination.category}</td>
                <td style={styles.cell}><img src={destination.image} alt={destination.name} style={styles.image} /></td>
                <td style={styles.cell}>
                  <button style={styles.editButton} onClick={() => handleEditClick(destination._id)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteClick(destination._id)}>Delete</button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel={isAddingDestination ? "Add new destination" : "Edit destination"}
      >
        <h2>{isAddingDestination ? "Add new destination" : "Edit destination"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Name:
            <input type="text" name="name" value={editedDestination.name || ''} onChange={handleInputChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Details:
            <input type="text" name="details" value={editedDestination.details || ''} onChange={handleInputChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Price:
            <input type="number" name="price" value={editedDestination.price || ''} onChange={handleInputChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Category:
            <input type="text" name="category" value={editedDestination.category || ''} onChange={handleInputChange} style={styles.input} required />
          </label>
          <label style={styles.label}>
            Image:
            <input type="text" name="image" value={editedDestination.image || ''} onChange={handleInputChange} style={styles.input} required />
          </label>
          <button type="submit" style={styles.submitButton}>{isAddingDestination ? "Dodaj novu destinaciju" : "Sačuvaj izmjene"}</button>
        </form>
      </Modal>
    </div>
    <Footer/>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    marginTop: '50px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  cell: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  },
  editButton: {
    backgroundColor: 'pink',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: 'red',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
  editFormContainer: {
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#f0ad4e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  image: {
    width: '100px',
    height: 'auto',
  },
};

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    width: '400px',
  },
};

export default DestinationManagement;
