const express = require("express");

const router = express.Router();

const controller = require("../controllers/JOusers");

router.get("/getJOusers", controller.getAllUsers);
router.get("/JOusers/:email", controller.getUserByEmail);
router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
module.exports = router;
