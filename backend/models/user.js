const pool = require("../database");

// Function to get all registered users
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

// eslint-disable-next-line no-unused-vars
const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const createUser = async (userData) => {
  const { fullname, username, email, password } = userData;
  const result = await pool.query(
    "INSERT INTO users (username, fullname, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [fullname, username, email, password]
  );
  return result.rows[0];
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return null; // if user with the provided email does not exist
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    return user; // Passwords match, return the user
  }
  return null; // Passwords do not match
};

const updateUserProfile = async (userid, updatedData) => {
  const { fullname, username, email, password } = updatedData;

  try {
    const result = await pool.query(
      "UPDATE users SET fullname = $1, username = $2, email = $3, password = $4 WHERE userid = $5 RETURNING *",
      [fullname, username, email, password, userid]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    throw error;
  }
};

// const forgotPassword = async (email) => {
//   // Implement forgot password query and send email with nodemailer
// };

// const resetPassword = async (userId, newPassword) => {
//   // Implement password reset query
// };

const deleteUser = async (userid) => {
  try {
    await pool.query("DELETE FROM user WHERE userid = $1", [userid]);
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  loginUser,
  updateUserProfile,
  //   forgotPassword,
  //   resetPassword,
  deleteUser,
};
