/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllJOUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT username, email, password_hash FROM jousers"
    );
    console.log("Checking result", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};
const getUserByEmail = async (email) => {
  const query =
    "SELECT user_id, username, email, password_hash  FROM jousers WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the user if found, otherwise return undefined
  } catch (error) {
    console.error("Error fetching user by email:", error);
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

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

module.exports = { getAllJOUsers, getUserByEmail, createUser, loginUser };
