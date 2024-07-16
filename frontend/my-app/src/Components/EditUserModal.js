import React, { useState } from "react";
import "./EditUserModal.css"; // Assuming you have a separate CSS file for styling

const EditUserModal = ({ user, handleClose, handleEditUser }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUser(editedUser);
    handleClose();
  };

  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for editing user information */}
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={editedUser.username}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={editedUser.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="phone_number">
            Phone Number:
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={editedUser.phone_number}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="address">
            Address:
            <input
              type="text"
              name="address"
              id="address"
              value={editedUser.address}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
