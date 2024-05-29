const express = require("express");

const router = express.Router();

const controller = require("../controllers/users");

// router.get('/all',controller.getAllUsersController);
router.post('/register', controller.registerUser); // Registering a new user is typically a POST request
router.post('/login', controller.loginUser); // Logging in is often done with a POST request
router.put('/update-profile', controller.updateProfile); // Updating user profile information can use PUT
// router.post('/forgot-password', controller.forgotPassword);
// router.post('/reset-password', controller.resetPassword);
// router.post('/logout', controller.logoutUser); // Logging out can be done with POST, as it involves destroying a session
router.delete('/deleteAcc', controller.deleteAccount); // Deleting an account aligns better with DELETE

module.exports = router;



