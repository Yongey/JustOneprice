/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../routes/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate(); // Get navigate function from useNavigate
  const { userId, username, email, phoneNumber, address } =
    useContext(AuthContext);
  const [updatedUsername, setUpdatedUsername] = useState(username);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(phoneNumber);
  const [updatedAddress, setUpdatedAddress] = useState(address);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateUser = async () => {
    if (
      updatedUsername === username &&
      updatedEmail === email &&
      updatedPhoneNumber === phoneNumber &&
      updatedAddress === address
    ) {
      toast.error("No changes made to the user information.");
      return;
    }

    const updatedUserData = {
      userId,
      username: updatedUsername,
      email: updatedEmail,
      phone_number: updatedPhoneNumber ? updatedPhoneNumber : "",
      address: updatedAddress ? updatedAddress : "",
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/api/JO/users/${userId}`,
        updatedUserData
      );

      if (response.status === 200) {
        toast.success(
          "Personal information updated successfully. Please log out and log in again to see the updated information."
        );
        setIsEditing(false);
      } else {
        toast.error("Error updating user information.");
      }
    } catch (error) {
      toast.error("Error updating user information.");
    }
  };

  const cancelEdit = () => {
    setUpdatedUsername(username);
    setUpdatedEmail(email);
    setUpdatedPhoneNumber(phoneNumber);
    setUpdatedAddress(address);
    setIsEditing(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={updatedUsername}
                  onChange={(e) => setUpdatedUsername(e.target.value)}
                  className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    isEditing ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  disabled={!isEditing}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    isEditing ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  disabled={!isEditing}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={updatedPhoneNumber}
                  onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
                  className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    isEditing ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  disabled={!isEditing}
                />
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-lg font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                    isEditing ? "border-blue-500 bg-blue-50" : ""
                  }`}
                  disabled={!isEditing}
                />
              </dd>
            </div>
          </dl>
          <div className="flex justify-center mt-10 space-x-4">
            {isEditing ? (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdateUser}
                >
                  Update Information
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Back to homepage button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Profile;
