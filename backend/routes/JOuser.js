const express = require("express");

const router = express.Router();

const controller = require("../controllers/JOusers");

router.get("/getJOusers", controller.getAllUsers);
router.get("/JOusers/:email", controller.getUserByEmail);
router.delete("/users/:userId", controller.deleteUserById); // Delete user route
router.post("/register", controller.registerUser);
router.put("/users/:userId", controller.updateUser);
router.post("/login", controller.loginUser);
module.exports = router;
