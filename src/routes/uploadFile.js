const express = require("express");
const router = express.Router();

// Import the uploadFileController
const {uploadFileController} = require("../controllers/uploadFile");
const {viewUploadedFile} = require("../controllers/uploadFile");

const { checkAuthuser } = require('../controllers/checkAuthuser');


// Middleware to check user role
const checkUserRole = (req, res, next) => {
  // Assuming you have a way to determine the user role (e.g., from JWT token or session)
  const userRole = req.user.role; // Assuming role is stored in req.user.role
  if (userRole === "admin") {
    // If user is an admin, pass the request to the controller as is
    return next();
  } else {
    // If user is not an admin, set the userId in req.body to the logged-in user's ID
    req.body.userId = req.user.id; // Assuming userId is stored in req.user.id
    return next();
  }
};
// Define a route to handle file uploads

router.post("/uploadFile", checkAuthuser,uploadFileController);
router.get("/viewUploadedFile/:userId",checkAuthuser, viewUploadedFile);

module.exports = router;
