/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios library
import "../Components/deleteButton.css";
import "./UM.css";
import { FaUserClock } from "react-icons/fa";
import UserPhoneNumberCell from "../Components/UserPhoneNumberCell";
import UserAddressCell from "../Components/UserAddressCell";
const UserManagement = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [users, setUsers] = useState([]); // State to store user data
  const [userToDelete, setUserToDelete] = useState(null);
  useEffect(() => {
    getAllUsers(); // Fetch all users when the component mounts
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/JO/getJOusers"
      );
      setUsers(response.data); // Update users state with retrieved data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/JO/users/${userId}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleDeleteButtonClick = async (userId) => {
    if (!isDeleting) {
      setIsDeleting(true);
      setUserToDelete(userId); // Set the user to delete
      try {
        await handleDeleteUser(userId);
        setTimeout(() => {
          setIsDeleting(false);
          setUserToDelete(null); // Reset user to delete
        }, 3500); // Duration of the delete animation
      } catch (error) {
        console.error("Error handling delete:", error);
        setIsDeleting(false);
        setUserToDelete(null); // Reset user to delete
      }
    }
  };
  return (
    <div>
      {/* Render users */}
      <h1 style={{ fontSize: "2rem", marginTop: "20px" }}>User Management</h1>
      {users.map((user, index) => (
        <div key={index} className="flex items-center gap-4 mt-10">
          <div className="relative overflow-x-auto">
            <table className="w-full border-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      Profile
                    </th>
                  )}
                  {!user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      UserID
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  {!user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      Password
                    </th>
                  )}
                  {!user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                  )}
                  {!user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                  )}
                  {!user.is_admin && (
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {user.is_admin && (
                    <td className="px-6 py-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                      />
                    </td>
                  )}
                  {!user.is_admin && (
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      title={user.user_id}
                    >
                      {user.user_id}
                    </td>
                  )}
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.username}
                  </th>

                  <td className="px-6 py-4">{user.email}</td>
                  {!user.is_admin && (
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      title={user.password_hash}
                    >
                      {user.password_hash}
                    </td>
                  )}
                  {!user.is_admin && (
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      title={user.phone_number}
                    >
                      <UserPhoneNumberCell phoneNumber={user.phone_number} />
                    </td>
                  )}
                  {!user.is_admin && (
                    <td
                      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
                      title={user.address}
                    >
                      <UserAddressCell address={user.address} />
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="grid gap-4 grid-cols-1 my-auto">
                      {user.is_admin ? (
                        <div className="col-span-2"></div>
                      ) : (
                        <>
                          <div>
                            <button
                              className={`Deletebutton ${
                                isDeleting && userToDelete === user.user_id
                                  ? "delete"
                                  : ""
                              }`}
                              onClick={() =>
                                handleDeleteButtonClick(user.user_id)
                              }
                            >
                              <div className="trash">
                                <div className="top">
                                  <div className="paper"></div>
                                </div>
                                <div className="box"></div>
                                <div className="check">
                                  <svg viewBox="0 0 8 6">
                                    <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                                  </svg>
                                </div>
                              </div>
                              <span>Delete User</span>
                            </button>
                          </div>
                          <button
                            type="button"
                            className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 h-11 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            <FaUserClock className="text-xl mr-2" />
                            <span>Edit User</span>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {showToast && (
        <div
          id="toast-danger"
          className={`toast ${showToast ? "drop-down-animation show" : ""}`}
          role="alert"
        >
          <div className="toast-icon">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">User has been deleted.</div>
          <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
