const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const blogController = require('../controllers/blogController');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to avoid file name conflicts
  }
});

const upload = multer({ storage: storage });

// Define the route for creating a new blog with file uploads
router.post('/addblog', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), blogController.createBlog);


// Route for getting all blogs
router.get('/getblog', blogController.getAllBlogs);
router.get('/getblog/:id', blogController.getOneBlog);  // New route for fetching a single blog
// Route for updating a blog by ID
router.put('/updateblog/:id', upload.fields([{ name: 'image' }, { name: 'video' }]), blogController.updateBlog);


// Route for deleting a blog by ID
router.delete('/deleteblog/:id', blogController.deleteBlog);

module.exports = router;
