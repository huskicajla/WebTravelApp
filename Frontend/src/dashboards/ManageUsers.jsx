/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./admin.navbar";
import Footer from './dashboard.footer';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [isAddingUser, setIsAddingUser] = useState(false);

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

  const handleAddUserClick = () => {
    setEditedUser({});
    setEditingUserId(null);
    setIsAddingUser(true);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
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
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td style={styles.cell}>{user._id}</td>
                  <td style={styles.cell}>{user.fullname}</td>
                  <td style={styles.cell}>{user.email}</td>
                  <td style={styles.cell}>{user.isAdmin ? "Yes" : "No"}</td>
                  <td style={styles.cell}>{user.isActive ? "Yes" : "No"}</td>
                  <td style={styles.cell}>
                    <button style={styles.editButton} onClick={() => handleEditClick(user._id)}>EDIT</button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {(editingUserId || isAddingUser) && (
          <div style={styles.editFormContainer}>
            <h2 style={styles.formTitle}>{isAddingUser ? "Add new user" : "Edit user"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.inlineLabel}>Fullname:</label>
                <input
                  type="text"
                  name="fullname"
                  value={editedUser.fullname || ''}
                  onChange={handleInputChange}
                  style={styles.inlineInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.inlineLabel}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email || ''}
                  onChange={handleInputChange}
                  style={styles.inlineInput}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.inlineLabel}>Password:</label>
                <input
                  type="password"
                  name="originalPassword"
                  value={editedUser.originalPassword || ''}
                  onChange={handleInputChange}
                  style={styles.inlineInput}
                  required
                />
              </div>
              <div style={styles.formGroupCheckbox}>
                <label style={styles.checkboxLabel}>Is admin?</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={editedUser.isAdmin || false}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
              </div>
              <div style={styles.formGroupCheckbox}>
                <label style={styles.checkboxLabel}>Is active?</label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editedUser.isActive || false}
                  onChange={handleInputChange}
                  style={styles.checkbox}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                {isAddingUser ? "Add user" : "Save"}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
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
    marginTop: '40px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    marginLeft: '0',
  },
  formTitle: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  inlineLabel: {
    minWidth: '120px',
    textAlign: 'right',
    marginRight: '10px',
  },
  inlineInput: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  formGroupCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  checkboxLabel: {
    minWidth: '120px',
    textAlign: 'right',
    marginRight: '10px',
  },
  checkbox: {
    marginLeft: '10px',
  },
  submitButton: {
    padding: '8px 16px',
    backgroundColor: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#e91e63',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default UserManagement;
