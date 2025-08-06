import React from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PkgCard = ({ pkg }) => {
  return (
  
    <div className=" bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition duration-300 ease-in-out ">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`${import.meta.env.VITE_BACKEND_API}uploads/${pkg.image}`} // Image path assuming it's in uploads folder
        alt={pkg.name}
      />
      <div className="p-6 space-y-4">
        <h3 className="sm:text-2xl text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition duration-300">{pkg.name}</h3>
        <p className="text-gray-700 text-base">Desc: {pkg.description}</p>
        <p className="text-gray-700 text-base">Price: {pkg.price}</p>
        <div className="flex items-center justify-between">
          <Link
            to={`/packageshow/${pkg._id}`}
            className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            See Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

const Packagepage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Fetch package data from the API
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getpackages`);
        const data = await response.json();
        setPackages(data); // Store fetched packages in the state
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages(); // Fetch packages when component mounts
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className='bg-primary dark:bg-gray-700 dark:text-white duration-200'>
      <section className=" text-white text-center py-20 relative  ">
        <h1 className="text-2xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeInUp">Our Packages</h1>
        <p className="text-lg max-w-3xl mx-auto mb-8 animate__animated animate__fadeInUp">
          Stay updated with the latest insights and articles from our expert team. We bring you fresh content to keep you informed and inspired.
        </p>
      </section>
      </div>
<div className='dark:bg-gray-700 dark:text-white duration-200'>
      <div className='bg-primary w-40 sm:w-56 px-3 mt-8 rounded-r-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out animate-slide-in-right'>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-8 ">Latest Packages</h2>
       </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 "> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PkgCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default Packagepage;
