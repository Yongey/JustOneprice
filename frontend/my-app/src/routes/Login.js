import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../login.css";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../routes/AuthContext"; // Correct import path
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    setToken,
    setUsername,
    setEmail,
    setIsAdmin,
    setAddress,
    setPhoneNumber,
    setUserId,
  } = useContext(AuthContext); // Get setToken from AuthContext
  const [authMode, setAuthMode] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", // Use username instead of fullName
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (authMode === "signin") {
        response = await axios.post("http://localhost:3000/api/JO/login", {
          email: formData.email,
          password: formData.password,
        });
        const {
          token,
          username,
          userEmail,
          is_admin,
          userPN,
          userAddress,
          userId,
        } = response.data;
        setToken(token); // Set the token
        setUsername(username); // Set the user's full name
        setEmail(userEmail);
        setIsAdmin(is_admin);
        setAddress(userAddress); // Corrected
        setPhoneNumber(userPN); // Corrected
        setUserId(userId); // Set the user_id
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("isAdmin", is_admin);
        localStorage.setItem("userPN", userPN); // Corrected
        localStorage.setItem("user_id", userId);
        localStorage.setItem("address", userAddress); // Corrected
        toast.success("Logged in successfully!");
        setTimeout(() => {
          if (is_admin) {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        response = await axios.post("http://localhost:3000/api/JO/register", {
          email: formData.email,
          password: formData.password,
          username: formData.username,
        });
        toast.success("Account created successfully!");
        setAuthMode("signin");
      }
      setFormData({ email: "", password: "", username: "" });
    } catch (error) {
      setError("Invalid email or password");
      setTimeout(() => setError(""), 2000);
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
    setError("");
  };

  return (
    <div>
      <Navbar />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              {authMode === "signin" ? (
                <>
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign In
                  </span>
                </>
              )}
            </div>
            {authMode === "signup" && (
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
