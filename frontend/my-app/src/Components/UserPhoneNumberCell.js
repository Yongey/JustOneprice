// UserPhoneNumberCell.js

import React from "react";

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ""; // If phoneNumber is falsy, return an empty string

  // Remove all non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  // If the numericPhoneNumber length is less than 8, return it as is
  if (numericPhoneNumber.length < 8) return numericPhoneNumber;

  // Extract the first 4 digits and last 4 digits
  const firstPart = numericPhoneNumber.slice(0, 4);
  const lastPart = numericPhoneNumber.slice(-4);

  // Return the formatted phone number with a space in between
  return `${firstPart} ${lastPart}`;
};

const UserPhoneNumberCell = ({ phoneNumber }) => {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis"
      title={phoneNumber}
    >
      {formatPhoneNumber(phoneNumber)}
    </td>
  );
};

export default UserPhoneNumberCell;
