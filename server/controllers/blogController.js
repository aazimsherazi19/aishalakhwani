const Blog = require('../models/blogModel');
const path = require('path');
const fs = require('fs');
// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { heading, description, content } = req.body;
    let image = null;
    let video = null;

    // Check if files are uploaded
    if (req.files) {
      if (req.files['image']) {
        image = req.files['image'][0].filename; // Storing the filename
      }
      if (req.files['video']) {
        video = req.files['video'][0].filename; // Storing the filename
      }
    }

    // Create a new blog object
    const newBlog = new Blog({
      heading,
      description,
      content,
      image,
      video
    });

    // Save the new blog to the database
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};
exports.getOneBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog); // Return the single blog
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the blog', error });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { heading, description, content } = req.body;

  // Check if files are uploaded
  let image = req.files && req.files['image'] ? req.files['image'][0].filename : null;
  let video = req.files && req.files['video'] ? req.files['video'][0].filename : null;

  try {
    // Find and update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { heading, description, content, image, video },
      { new: true } // Return the updated blog object
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
};


// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete the associated image and video from the filesystem (if they exist)
    if (deletedBlog.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', deletedBlog.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Error deleting image:', err);
      });
    }

    if (deletedBlog.video) {
      const videoPath = path.join(__dirname, '..', 'uploads', deletedBlog.video);
      fs.unlink(videoPath, (err) => {
        if (err) console.error('Error deleting video:', err);
      });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
