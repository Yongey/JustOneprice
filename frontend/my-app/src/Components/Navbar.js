import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/NavbarStyles.css";
import { FaIdCard } from "react-icons/fa6";

import { AuthContext } from "../routes/AuthContext"; // Import AuthContext

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { token, setToken, isAdmin } = useContext(AuthContext); // Use AuthContext
  const isAuthenticated = !!token;

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    setToken(null); // Clear the token
    localStorage.removeItem("token"); // Clear the token in local storage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully!");
  };
  const MenuItems = [
    {
      title: "Home",
      url: "/",
      cName: "nav-links",
      icon: "fa-solid fa-house",
    },
    {
      title: "WholeSales",
      url: "/wholesale",
      cName: "nav-links",
      icon: "fa-solid fa-shop",
    },
  ];
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">JustOnePrice</h1>
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        <div className="signup-container">
          {isAuthenticated ? (
            <>
              <Link to="/Profile" className="profile-icon">
                <FaIdCard size={45} />
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "1px",
                    marginLeft: "12px",
                  }}
                >
                  Profile
                </span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="nav-button admin-button">
                  Admin
                </Link>
              )}
              <button
                className="nav-button logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/Auth" className="nav-button login-button">
              Sign Up & Login
            </Link>
          )}
        </div>
      </ul>
      <ToastContainer autoClose={5500} />
    </nav>
  );
};

export default Navbar;
