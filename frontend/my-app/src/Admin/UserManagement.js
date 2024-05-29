import React, { useState } from "react";
import "../Components/deleteButton.css";
import "./UM.css";
import { FaUserClock } from "react-icons/fa";
const UserManagement = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDeleteButtonClick = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      setTimeout(() => {
        setIsDeleting(false);
        setTimeout(() => {
          setShowToast(true);
          // Automatically hide the toast after 3 seconds
          setTimeout(() => setShowToast(false), 5000);
        }, 1000); // Delay before showing the toast (e.g., 2 seconds)
      }, 3500); // Duration of the delete animation
    }
  };

  return (
    <div>
      <button
        type="button"
        class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 h-11 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
        </svg>
        <span>Add User</span>
      </button>

      <div class="flex items-center gap-4 mt-10">
        <div class="relative overflow-x-auto">
          <table class="w-full border-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Profile
                </th>
                <th scope="col" class="px-6 py-3">
                  Username
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://p16.tiktokcdn-us.com/tos-useast5-avt-0068-tx/bf0258425c86c0d6461a311929f53927~c5_720x720.jpeg"
                    alt=""
                  ></img>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Fred Liu
                </th>
                <td class="px-6 py-4">wafwafha@gmail.com</td>
                <td class="px-6 py-4">
                  <div class="grid gap-4 grid-cols-3 my-auto">
                    <div>
                      <button
                        className={`Deletebutton ${isDeleting ? "delete" : ""}`}
                        onClick={handleDeleteButtonClick}
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
                      class="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 h-11 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <FaUserClock className="text-xl mr-2" />
                      <span>Edit User</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
