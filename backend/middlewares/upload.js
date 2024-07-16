const multer = require("multer");

// Configure multer storage and file filtering
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/"); // Destination directory for uploaded files
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Generate unique filename
  },
});

// File filter function to accept only JPEG and PNG images
const fileFilter = function (req, file, cb) {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/bmp"];

  // Check if the uploaded file's MIME type is in the allowed list
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only JPEG, PNG, GIF, and BMP images are allowed"), false); // Reject non-image files
  }
};
// Multer configuration
const upload = multer({
  storage, // Use the configured storage
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter, // Apply file filter function
});

module.exports = upload;
