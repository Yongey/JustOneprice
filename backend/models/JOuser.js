/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllJOUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT user_id,username, email, password_hash,is_admin,phone_number,address FROM jousers ORDER BY CASE WHEN is_admin THEN 0 ELSE 1 END, user_id ASC;"
    );
    console.log("Checking result", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};
const deleteUserById = async (userId) => {
  try {
    const result = await pool.query(
      "DELETE FROM jousers WHERE user_id = $1 RETURNING *",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
const updateUserById = async (userId, username, email) => {
  try {
    const result = await pool.query(
      "UPDATE jousers SET username = $1, email = $2 WHERE user_id = $3 RETURNING *",
      [username, email, userId]
    );
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const query =
    "SELECT user_id, username, email, password_hash,is_admin,phone_number,address FROM jousers WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the user if found, otherwise return undefined
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};
const getUserById = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM jousers WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return null; // Return null if user not found
    }
    return result.rows[0]; // Return the user data
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
const createUser = async (username, email, passwordHash) => {
  if (!username.trim()) {
    throw new Error("Username cannot be empty or contain only spaces");
  }

  const query = `
    INSERT INTO jousers (username, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING username, email, created_at, updated_at
  `;
  const values = [username, email, passwordHash];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Internal server error");
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    const phone_number = user.phone_number || "EMPTY";
    const address = user.address || "EMPTY";
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin,
        phone_number,
        address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, is_admin: user.is_admin };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

module.exports = {
  getAllJOUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUserById,
  updateUserById,
  loginUser,
};
