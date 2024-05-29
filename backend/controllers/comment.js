const {
  getPostsComments,
  likePost,
  commentOnPost,
  deleteComment,
  editComment,
} = require("../models/comment");

async function getPostsCommentsController(req, res) {
  try {
    const postId = req.params.id;
    const posts = await getPostsComments(postId);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const likePostController = async (req, res) => {
  const { postId, userId, like } = req.body;
  console.log("Request Body:", req.body); 

  try {
    await likePost(postId, userId, like);
    res.json({ message: "Like status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function commentOnPostController(req, res) {
  const { postId, userId, comment } = req.body;
  try {
    await commentOnPost(postId, userId, comment);
    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const deleteCommentController = async (req, res) => {
  const { postId, userId, commentID } = req.body;
  console.log("LOOK RIGHT HERE RIGHT NOW OR REGRET IT AT4AM" + commentID)
  try {
    const deletedComment = await deleteComment(postId, userId, commentID);
    if (deletedComment) {
      res.json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMultipleCommentsController = async (req, res) => {
  const { postId, userId, commentIDs } = req.body;

  try {
    // Use Promise.all to concurrently delete comments
    const deletionResults = await Promise.all(
      commentIDs.map(async (commentID) => {
        try {
          const deletedComment = await deleteComment(postId, userId, commentID);
          return { commentID, success: deletedComment };
        } catch (error) {
          return { commentID, success: false, error: error.message };
        }
      })
    );

    res.json({ message: "Comments deleted successfully", deletionResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCommentController = async (req, res) => {
  const { postId, userId, newComment, oldComment, commentID } = req.body;
  console.log("LOOK RIGHT HERE RIGHT NOW OR U WILL REGRET" + postId,userId,newComment,oldComment,commentID);
  try {
    const updatedComment = await editComment(postId, userId, newComment, oldComment,commentID);
    if (updatedComment) {
      res.json({ message: "Comment updated successfully", updatedComment });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPostsComments: getPostsCommentsController,
  likePost: likePostController,
  commentOnPost: commentOnPostController,
  deleteComment: deleteCommentController,
  editComment: editCommentController,
  deleteMultipleComments: deleteMultipleCommentsController,
};
