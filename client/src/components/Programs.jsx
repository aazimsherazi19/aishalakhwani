import React, { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const ProgramCard = ({ program }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition duration-300 ease-in-out flex flex-col h-full">
      <img
        className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"
        src={`${import.meta.env.VITE_BACKEND_API}uploads/${program.image}`}
        alt={program.heading}
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{program.heading}</h3>
        <p className="text-gray-600 text-sm flex-1">{program.description}</p>
        <div className="mt-4">
          <Link to={`/program/${program._id}`} className="inline-block bg-primary px-4 py-2 rounded-md text-black text-sm font-semibold hover:bg-ternary transition duration-300 ease-in-out">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}api/getprograms`);
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Our Programs</h1>

          {loading ? (
            <div className="text-center">Loading programs...</div>
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <motion.div key={p._id} whileHover={{ scale: 1.02 }}>
                  <ProgramCard program={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Programs;
