/* eslint-disable consistent-return */
const pool = require("../database");
const { EMPTY_RESULT_ERROR } = require("../errors");

const getAllUsers = async () => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT "userID" FROM "Post" order by "userID" asc'
    );
    console.log("Checking result", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
};

const getAllInfo = async () => {
  try {
    const query = `
      SELECT "Posts"."postID", "Posts"."caption","Posts"."imageData", "users".*
      FROM "Posts"
      JOIN "users" ON "Posts"."userID" = "users"."userid" 
      ORDER BY "users"."userid" ASC;
    `;

    const { rows } = await pool.query(query);

    return rows.reduce((acc, row) => {
      let user = acc.find((u) => u.userid === row.userid);
      if (!user) {
        user = {
          userid: row.userid,
          username: row.username,
          fullname: row.fullname,
          email: row.email,
          posts: [],
        };
        acc.push(user);
      }

      user.posts.push({
        postID: row.postid,
        caption: row.caption,
        imagedata: row.imageData,
      });

      return acc;
    }, []);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
};
const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM "Post"');
  console.log("checking result", result.rows);

  return result.rows;
};

const getPostByID = async (id) => {
  const result = await pool.query('SELECT * FROM "Post" WHERE "postID" = $1', [
    id,
  ]);
  return result.rows;
};
const updatePosts = async (postID, caption, image) => {
  try {
    const result = await pool.query(
      'UPDATE "Post" SET "caption" = $2,"image" = $3 WHERE "postID" = $1 RETURNING *',
      [postID, caption, image]
    );

    const { rows } = result;

    if (rows.length === 0) {
      // If no rows were affected, throw an error
      throw new Error("Failed to update post");
    }

    // Successfully updated, return the updated post data
    return {
      success: true,
      message: "Post updated successfully",
      post: rows[0],
    };
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
};
const insertPostNew = async (userID, caption, imageData) => {
  // Assuming 'imageData' is binary data and your database column supports it (e.g., BLOB, bytea)
  const query =
    'INSERT INTO "Posts" ("userID", "caption", "imageData") VALUES ($1, $2, $3) RETURNING *';
  const values = [userID, caption, imageData];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Returns the created post
  } catch (error) {
    console.error("Failed to insert post with image:", error);
    throw new Error("Failed to insert post");
  }
};
const getAllNewPosts = async () => {
  // Assuming 'imageData' is binary data and your database column supports it (e.g., BLOB, bytea)
  const query = 'SELECT * FROM "Posts"';

  try {
    const result = await pool.query(query);
    return result.rows; // Returns an array of all posts
  } catch (error) {
    console.error("Failed to retrieve posts:", error);
    throw new Error("Failed to retrieve posts");
  }
};
const insertPost = async (userID, caption, image) => {
  try {
    const result = await pool.query(
      'INSERT INTO "Post" ("userID", "caption", "image") VALUES ($1, $2, $3) RETURNING *',
      [userID, caption, image]
    );

    if (result.rowCount > 0) {
      // Successfully inserted, return the inserted post data
      const insertedPost = result.rows[0];
      return { message: "Post inserted successfully", result: insertedPost };
    }
  } catch (error) {
    // Handle specific database errors here
    if (error.code === "23505") {
      // Unique constraint violation (example: duplicate key)
      console.error("Error inserting post: Duplicate key violation", error);
      throw new Error("Failed to insert post due to duplicate key");
    } else if (error.code === "23503") {
      // Foreign key constraint violation
      console.error("Error inserting post: Foreign key violation", error);
      throw new Error("Failed to insert post due to foreign key violation");
    } else {
      // Handle other types of errors
      console.error("Error inserting post:", error);
      throw new Error("Failed to insert post");
    }
  }
};

const deletePostsByID = async (postID) => {
  const result = await pool.query(`DELETE FROM "Post" WHERE "postID" = $1`, [
    postID,
  ]);

  const { rowCount } = result;
  if (rowCount === 0) {
    throw new EMPTY_RESULT_ERROR(`No post with ID ${postID} found!`);
  }
  return { message: `User with ID ${postID} deleted successfully` };
};

module.exports = {
  getAllInfo,
  getAllUsers,
  getAllPosts,
  deletePostsByID,
  getPostByID,
  insertPost,
  insertPostNew,
  getAllNewPosts,
  updatePosts,
};
