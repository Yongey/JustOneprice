// See https://expressjs.com/en/guide/routing.html for routing

const express = require("express");

const router = express.Router();

const controller = require("../controllers/comment");
router.get("/", (req, res) => {
  res.send("Welcome to the better Instagram!");
});

router.get("/postComments/:id", controller.getPostsComments);
router.post("/like", controller.likePost);
router.post("/comment", controller.commentOnPost);
router.delete("/comments", controller.deleteComment);
router.put("/comments/edit", controller.editComment);
router.delete("/comments/multiple", controller.deleteMultipleComments);

module.exports = router;
