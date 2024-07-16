import React, { useState } from "react";

const UserAddressCell = ({ address }) => {
  const maxLength = 0; // Define the maximum length of the address before truncating
  const [showMore, setShowMore] = useState(false); // State to track whether to show more or not

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Add a null check for the address before accessing its length property
  if (address === null || address === undefined) {
    return (
      <td className="px-3 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        No address provided
      </td>
    );
  }

  return (
    <td className="px-3 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
      {address.length > maxLength && !showMore ? (
        <>
          {address.slice(0, maxLength)}{" "}
          <span
            onClick={toggleShowMore}
            className="text-blue-500 cursor-pointer"
          >
            Show More
          </span>
        </>
      ) : (
        <>
          {address}{" "}
          {address.length > maxLength && (
            <span
              onClick={toggleShowMore}
              className="text-blue-500 cursor-pointer"
            >
              Show Less
            </span>
          )}
        </>
      )}
    </td>
  );
};

export default UserAddressCell;
