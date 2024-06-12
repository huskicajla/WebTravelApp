import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./admin.navbar";
import Footer from './dashboard.footer';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [showOriginalPasswords, setShowOriginalPasswords] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4001/user/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (id) => {
    const user = users.find((user) => user._id === id);
    setEditedUser(user);
    setEditingUserId(id);
    setIsAddingUser(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isAddingUser) {
        await handleAddNewUser();
      } else {
        await axios.put(`http://localhost:4001/user/users/${editingUserId}`, editedUser);
      }
      const res = await axios.get("http://localhost:4001/user/users");
      setUsers(res.data);
      setEditingUserId(null);
      setEditedUser({});
      setIsAddingUser(false);
    } catch (error) {
      console.log("Error during submission", error.response ? error.response.data : error.message);
    }
  };

  const handleAddNewUser = async () => {
    try {
      const newUser = {
        fullname: editedUser.fullname,
        email: editedUser.email,
        password: editedUser.originalPassword, 
        isAdmin: editedUser.isAdmin || false,
        isActive: editedUser.isActive || true,
      };

      await axios.post("http://localhost:4001/user/signup", newUser);
      const res = await axios.get("http://localhost:4001/user/users");
      setUsers(res.data);
      setEditedUser({});
      setIsAddingUser(false);
    } catch (error) {
      console.log("Error adding new user", error.response ? error.response.data : error.message);
    }
  };

  const toggleShowOriginalPasswords = () => {
    setShowOriginalPasswords(!showOriginalPasswords);
  };

  const handleAddUserClick = () => {
    setEditedUser({});
    setEditingUserId(null);
    setIsAddingUser(true);
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <button onClick={toggleShowOriginalPasswords} style={styles.toggleButton}>
        {showOriginalPasswords ? "Hide original password" : "Show original password"}
      </button>
      <button onClick={handleAddUserClick} style={styles.addButton}>
        Add user
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Is admin?</th>
            <th>Is active?</th>
            <th>Password</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user._id}>
              <tr>
                <td style={styles.cell}>{user.id}</td>
                <td style={styles.cell}>{user.fullname}</td>
                <td style={styles.cell}>{user.email}</td>
                <td style={styles.cell}>{user.isAdmin ? "Yes" : "No"}</td>
                <td style={styles.cell}>{user.isActive ? "Yes" : "No"}</td>
                <td style={styles.cell}>
                  {showOriginalPasswords ? user.originalPassword : user.hashedPassword}
                </td>
                <td style={styles.cell}>
                  <button style={styles.editButton} onClick={() => handleEditClick(user._id)}>EDIT</button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Edit/Add form */}
      {(editingUserId || isAddingUser) && (
        <div style={styles.editFormContainer}>
          <h2>{isAddingUser ? "Add new user" : "Edit user"}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Fullname:
              <input type="text" name="fullname" value={editedUser.fullname || ''} onChange={handleInputChange} style={styles.input} required />
            </label>
            <label style={styles.label}>
              Email:
              <input type="email" name="email" value={editedUser.email || ''} onChange={handleInputChange} style={styles.input} required />
            </label>
            <label style={styles.label}>
              Is admin?
              <input type="checkbox" name="isAdmin" checked={editedUser.isAdmin || false} onChange={handleInputChange} style={styles.checkbox} />
            </label>
            <label style={styles.label}>
              Is active?
              <input type="checkbox" name="isActive" checked={editedUser.isActive || false} onChange={handleInputChange} style={styles.checkbox} />
            </label>
            <label style={styles.label}>
              Password:
              <input type="password" name="originalPassword" value={editedUser.originalPassword || ''} onChange={handleInputChange} style={styles.input} required />
            </label>
            <button type="submit" style={styles.submitButton}>{isAddingUser ? "Add user" : "Save"}</button>
          </form>
        </div>
      )}
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
  checkbox: {
    marginLeft: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  toggleButton: {
    padding: '10px 20px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#f0ad4e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    marginLeft: '10px',
  },
};

export default UserManagement;
