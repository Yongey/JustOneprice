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
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    await JOuser.deleteUserById(userId);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;

    // Check if username or email is provided
    if (!username && !email) {
      return res.status(400).json({ error: "Username or email is required" });
    }

    // Fetch the current user data
    const currentUser = await JOuser.getUserById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user with provided data or keep existing data
    const newUsername = username || currentUser.username;
    const newEmail = email || currentUser.email;

    // Update the user
    const updatedUser = await JOuser.updateUserById(
      userId,
      newUsername,
      newEmail
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
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
    const { token, is_admin } = await JOuser.loginUser(email, password);
    const userData = await JOuser.getUserByEmail(email);
    const {
      email: userEmail,
      username,
      phone_number: userPN,
      address: userAddress,
    } = userData;
    const response = {
      token,
      userEmail,
      username,
      is_admin,
      userPN,
      userAddress,
    };

    if (is_admin) {
      response.adminMessage = "Welcome Admin!";
    } else {
      response.userMessage = "Welcome User!";
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  deleteUserById,
  loginUser,
  updateUser,
  getUserByEmail,
};
