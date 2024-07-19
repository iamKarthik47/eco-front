import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-section">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => setEditingUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <form onSubmit={handleUpdateUser}>
          <input
            type="text"
            value={editingUser.username}
            onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
          />
          <input
            type="text"
            value={editingUser.address}
            onChange={(e) => setEditingUser({...editingUser, address: e.target.value})}
          />
          <button type="submit">Update User</button>
          <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UsersSection;