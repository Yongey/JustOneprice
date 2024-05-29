const pool = require("../database");

const getPostsComments = async (postId) => {
  console.log("checking id", postId);
  const result = await pool.query(
    'SELECT comment, "commentID" FROM "postComments" WHERE "postID" = $1',
    [postId]
  );
  console.log("checking result", result.rows);

  return result.rows;
};

const likePost = async (postId, userId, like) => {
  try {
    console.log("Before database query execution:", postId, like, userId);
    if (like == 1) {
      like = true;
    }
    if (like == 0) {
      like = false;
    }

    console.log("checking database query execution:", postId, like, userId);
    if (like != true && like != false) {
      throw new Error("Like should be either true or false");
    } else {
      const existingLike = await pool.query(
        'SELECT * FROM "postLikes" WHERE "postID" = $1 AND "userID" = $2',
        [postId, userId]
      );

      if (existingLike.rows.length > 0) {
        await pool.query(
          'UPDATE "postLikes" SET "likes" = $3 WHERE "postID" = $1 AND "userID" = $2',
          [postId, userId, like]
        );
        console.log("Update database query executed:", postId, like, userId);
      } else {
        await pool.query(
          'INSERT INTO "postLikes" ("postID", "userID", "likes") VALUES ($1, $2, $3)',
          [postId, userId, like]
        );
        console.log("Insert database query executed:", postId, like, userId);
      }

      console.log("After database query execution");
    }
  } catch (error) {
    console.error("Error in likePost:", error.message);
    throw error; // Re-throw the error to propagate it further
  }
};

const commentOnPost = async (postId, comment, userId) => {
  console.log("Before database query execution:", postId, comment, userId);

  await pool.query(
    'INSERT INTO "postComments" ("postID", "comment", "userID") VALUES ($1, $2, $3)',
    [postId, userId, comment]
  );

  console.log("After database query execution");
};

const deleteComment = async (postId, userId, commentID, multipleDelete) => {
//  console.log(commentID+"LOOK RIGHT HERE RIGHT NOW OR REGRET IT AT 4AM")
  const result = await pool.query(
    'DELETE FROM "postComments" WHERE "postID" = $1 AND "userID" = $2 AND "commentID" = $3 RETURNING *',
    [postId, userId, commentID]
  );
  return result.rows[0];
};

const editComment = async (postId, userId, newComment, oldComment,commentID) => {
  try {
    const existingComment = await pool.query(
      'SELECT comment FROM "postComments" WHERE "postID" = $1 AND "userID" = $2 AND "commentID" = $3',
      [postId, userId,commentID]
    );

    if (existingComment.rows.length === 0) {
      throw new Error('Comment not found');
    }

    const currentComment = existingComment.rows[0].comment;
    if (currentComment !== oldComment) {
      throw new Error('Current comment does not match the comment in the database');
    }

    const result = await pool.query(
      'UPDATE "postComments" SET "comment" = $1 WHERE "postID" = $2 AND "userID" = $3 AND "commentID" = $4 RETURNING *',
      [newComment, postId, userId, commentID]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error in editComment:', error.message);
    throw error;
  }
};

//update = editComment DONE ,delete = deleteComment DONE, update + create = liking DONE, read = get all comments DONE , create = create comment DONE

module.exports = {
  getPostsComments,
  likePost,
  commentOnPost,
  deleteComment,
  editComment,
};
