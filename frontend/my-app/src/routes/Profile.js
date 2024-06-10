/* eslint-disable no-unused-vars */
import React, { useContext } from "react";

import { AuthContext } from "../routes/AuthContext";
const Profile = () => {
  const { username, email, phoneNumber, address } = useContext(AuthContext);

  return (
    <div>
      <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h1>
          <p class="mt-5 max-w-2xl  text-lg text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-lg font-medium text-gray-500">Username</dt>
              <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {username}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-lg font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-lg font-medium text-gray-500">
                Phone number:+65
              </dt>
              <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {" "}
                {phoneNumber ? phoneNumber : "N/A"}
              </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-lg font-medium text-gray-500">Address</dt>
              <dd class="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {" "}
                {address ? address : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;
