import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/NavbarStyles.css";
import { AuthContext } from "../routes/AuthContext"; // Import AuthContext

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { token, setToken } = useContext(AuthContext); // Use AuthContext
  const isAuthenticated = !!token;

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    setToken(null); // Clear the token
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
            <button className="login" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/Auth">
              <button className="login">Sign Up & Login</button>
            </Link>
          )}
        </div>
      </ul>
      <ToastContainer autoClose={5500} />
    </nav>
  );
};

export default Navbar;
