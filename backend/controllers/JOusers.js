/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");
const JOuser = require("../models/JOuser");

const getAllUsers = async (req, res) => {
  try {
    const users = await JOuser.getAllJOUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getUserByEmail = async (req, res) => {
  const { email } = req.params; // Assuming the email is passed as a route parameter

  try {
    const user = await JOuser.getUserByEmail(email);
    if (user) {
      // If user is found, send it in the response
      res.status(200).json(user);
    } else {
      // If user is not found, send an appropriate error response
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // If an error occurs during database operation, send an error response
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await JOuser.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await JOuser.createUser(username, email, passwordHash);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { token } = await JOuser.loginUser(email, password);
    const userData = await JOuser.getUserByEmail(email);
    const userEmail = userData.email;
    const username = userData.username;
    res.status(200).json({ token, userEmail, username });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserByEmail,
};
