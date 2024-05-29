// See https://expressjs.com/en/guide/routing.html for routing

const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controllers/posts");

// router.get("/postComments/:id", controller.getPostsComments);
// router.post("/like", controller.likePost);
// router.post("/comment", controller.commentOnPost);
// router.delete("/comments", controller.deleteComment);
// router.put("/comments/edit", controller.editComment);
router.post(
  "/insertPosts",
  upload.single("image"),
  controller.insertPostsWithImage
);
router.get("/getAllInfo", controller.getAllInfo);
router.get("/getAllNewPosts", controller.getAllNewPosts);
// Get all posts
router.get("/getAllUsers", controller.getAllUsers);
router.get("/", controller.getAllPosts);
router.get("/getPost/:id", controller.getPostByID);
router.delete("/deletePost/:id", controller.deletePostsByID);
router.post("/insertPost", controller.insertPost);
router.put("/updatePost/:id", controller.updatePosts);

module.exports = router;
