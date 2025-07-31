import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
  
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`http://localhost:3000/uploads/${blog.image}`} // Image path assuming it's in uploads folder
        alt={blog.heading}
      />
      <div className="p-6 space-y-4">
        <h3 className="sm:text-2xl text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">{blog.heading}</h3>
        <p className="text-gray-700 text-base">{blog.description}</p>
        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${blog._id}`}
            className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from the API
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/getblog/');
        const data = await response.json();
        setBlogs(data); // Store fetched blogs in the state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs(); // Fetch blogs when component mounts
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-20 relative">
        <h1 className="text-2xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeInUp">Our Blogs</h1>
        <p className="text-lg max-w-3xl mx-auto mb-8 animate__animated animate__fadeInUp">
          Stay updated with the latest insights and articles from our expert team. We bring you fresh content to keep you informed and inspired.
        </p>
      </section>

      <div className='bg-primary w-40 sm:w-56 px-3 mt-8 rounded-r-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-slide-in-right'>
        <h2 className="text-xl sm:text-3xl font-semibold text-white mb-8 ">Latest Blogs</h2>
       </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blogs;
