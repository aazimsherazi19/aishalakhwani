const mongoose = require('mongoose');

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
   content: {
    type: String,
    required: true
  },
  image: {
    type: String,  // You can store the image URL or the path of the image
    required: false
  },
  video: {
    type: String,  // You can store the video URL if provided
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
