// TODO: Jing Ru - Controller for users

// const nodemailer = require('nodemailer');
// import { getUserByEmail, createUser } from '../models/user';
const userModel = require("../models/user");

// eslint-disable-next-line consistent-return
const registerUser = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // check if the email exist
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "This email has been used!!!" });
    }
    // hash password before store it in database
    // const hashedPassword = await bcrypt.hash(password,10);

    // create new user in database
    const newUser = await userModel.createUser({
      username,
      fullname,
      email,
      password,
    });

    res.json({ message: "Account registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// eslint-disable-next-line consistent-return
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exist
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found!!" });
    }

    // compare password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // set user session
    req.session.userid = user.userid;

    res.json({
      message: "Login Successfully",
      user: { userID: user.userid, email: user.email },
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserIDFromSession = (req) => req.session.userid;

// eslint-disable-next-line consistent-return
// const updateUserProfile = async (req, res) => {
//   try {
//     const userID = getUserIDFromSession(req);

//     if (!userID) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const { bio, profilePicture } = req.body;

//     // Update user profile in the database
//     const updatedUser = await userModel.updateUserProfile(userID, { bio, profilePicture });

//     res.json({ message: 'User profile updated successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error in updateProfile:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// eslint-disable-next-line consistent-return
const updateProfile = async (req, res) => {
  try {
    const userid = getUserIDFromSession(req);

    if (!userid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { fullname, username, email, newPassword } = req.body;

    // Retrieve the current user data
    const currentUser = await userModel.getUserByID(userID);

    // Update user profile in the database
    const updatedUser = await userModel.updateUserProfile(userid, {
      fullname: fullname || currentUser.fullname,
      username: username || currentUser.username,
      email: email || currentUser.email,
      password: newPassword || currentUser.password,
    });

    res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// const forgotPassword = async (req, res) => {
//   // Implement forgot password logic using nodemailer and userModel
// };

// const resetPassword = async (req, res) => {
//   // Implement password reset logic using userModel
// };

const logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userid = getUserIDFromSession(req);

    if (!userid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await userModel.deleteUser(userid);

    req.session.destroy();

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAccount:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  //   forgotPassword,
  //   resetPassword,
  logoutUser,
  deleteAccount,
};
