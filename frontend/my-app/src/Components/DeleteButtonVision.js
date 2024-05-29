import React, { useState } from "react";
import "./deleteButton.css";

const DeleteButtonVision = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteButtonClick = () => {
    // If not already deleting, start the deletion animation
    if (!isDeleting) {
      setIsDeleting(true);
      setTimeout(() => setIsDeleting(false), 3200);
    }
  };

  return (
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
        <span>Delete Item</span>
      </button>
    </div>
  );
};

export default DeleteButtonVision;
