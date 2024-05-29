/* eslint-disable consistent-return */
// TODO: Zeyi controller
// TODO: Zeyi controller

const Post = require("../models/post");

const getAllUsers = async (req, res) => {
  try {
    const users = await Post.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllInfo = async (req, res) => {
  try {
    const users = await Post.getAllInfo();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePosts = async (req, res) => {
  try {
    const postID = req.params.id;
    const { caption, image } = req.body;
    const posts = await Post.updatePosts(postID, caption, image);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const insertPostsWithImage = async (req, res) => {
  try {
    const { userID, caption } = req.body;
    let imageData;

    if (req.file) {
      // For binary data
      imageData = req.file.buffer; // This is the binary data of the uploaded file

      // For Base64
      // imageData = req.file.buffer.toString('base64'); // Convert the file buffer to a Base64 string
    }

    // Process and store the image data along with other post data in the database
    const newPost = await Post.insertPostNew(userID, caption, imageData); // Adjust your model function accordingly
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Failed to create post with image:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};
const getAllNewPosts = async (req, res) => {
  try {
    const newPosts = await Post.getAllNewPosts(); // Assuming you have a function to retrieve new posts

    // Convert image Buffer to base64 data URL for each post
    // eslint-disable-next-line consistent-return, array-callback-return
    const postsWithImages = newPosts.map((post) => {
      if (post.imageData) {
        const imageData = Buffer.from(post.imageData).toString("base64");
        const imageMimeType = "image/jpeg"; // Replace with the actual image MIME type
        const dataURL = `data:${imageMimeType};base64,${imageData}`;
        return { ...post, imageUrl: dataURL };
      }
    });

    res.status(200).json(postsWithImages);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const insertPost = async (req, res) => {
  try {
    const { userID, caption, image } = req.body;
    const newPost = await Post.insertPost(userID, caption, image);
    res.status(201).json(newPost); // 201 Created status for successful creation
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post" });
  }
};
const deletePostsByID = async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await Post.deletePostsByID(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getPostByID = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.getPostByID(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getAllInfo,
  getAllUsers,
  getAllPosts,
  deletePostsByID,
  getPostByID,
  insertPost,
  insertPostsWithImage,
  getAllNewPosts,
  updatePosts,
};
