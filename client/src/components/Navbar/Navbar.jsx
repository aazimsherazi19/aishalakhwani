import React, { useState, useEffect } from 'react'
import axt from '../../assets/axt.webp'
import { IoMdSearch, IoMdMenu } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode, MdCurrencyExchange } from "react-icons/md";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const darkmodeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

 
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200'>
      {/* Marquee Header */}
      <div className='w-full h-8 bg-white flex justify-center items-center dark:bg-gray-900 dark:text-white duration-200'>
        <marquee>
          <h2 className='text-black font-semibold text-center sm:text-sm text-xs dark:text-white'>
            Empowering Your Journey to Parenthood – Expert Fertility Care, Every Step of the Way!
          </h2>
        </marquee>
      </div>

      {/* Upper Nav (Logo + Buttons) */}
      <div className='bg-primary dark:bg-se transition-colors duration-200 py-2'>
        <div className='flex justify-between h-10 items-center md:px-20 drop-shadow-md'>
          <motion.div className='mx-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <a href="/"><img src={axt} alt="Logo" className='w-32 sm:w-36 hover:scale-105 transition-all' /></a>
          </motion.div>

          <div className='flex justify-between items-center gap-4'>
            <IoMdMenu className='xl:hidden lg:hidden md:hidden text-4xl cursor-pointer' onClick={() => setIsOpen(!isOpen)} />

            <div className='relative hidden sm:block group'>
              <input
                type="text"
                placeholder='search...'
                className='w-[200px] group-hover:w-[250px] transition-all duration-300 border border-grey-300 rounded-full px-3 py-1 dark:bg-gray-700 dark:text-white focus:outline-none'
              />
              <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:text-primary text-gray-500' />
            </div>

      <button 
  onClick={() => navigate('/checkdata')}
  className="bg-gradient-to-r from-ternary to-green-300 dark:from-gray-700 dark:to-gray-600 
             text-white rounded-full px-4 py-1 hover:bg-gray-900 transition-all 
             duration-500 flex items-center gap-3 group overflow-hidden"
>
  <span className="font-bold hidden group-hover:inline-block transition-all duration-500 ease-in-out transform scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100">
    PayNow
  </span>
  <MdCurrencyExchange className="text-xl text-black dark:text-white drop-shadow-sm cursor-pointer animate-bounce-logo transition-all duration-500 ease-in-out" />
</button>

            {darkMode ? (
              <MdOutlineLightMode className='text-2xl cursor-pointer hover:text-white transition-all duration-200 mr-4' onClick={darkmodeToggle} />
            ) : (
              <MdOutlineDarkMode className='text-2xl cursor-pointer hover:text-white transition-all duration-200 mr-4' onClick={darkmodeToggle} />
            )}
          </div>
        </div>
      </div>

      
      <div
        className={`hidden md:flex justify-center items-center animate-fade-in bg-white dark:bg-gray-900 py-2 transition-all duration-300
        ${isSticky ? "fixed top-0 left-0 w-full z-50 shadow-md" : "relative"}`}
      >
        <ul className='hidden md:flex justify-between items-center lg:gap-20 md:gap-12 xl:gap-28 text-gray-900 dark:text-gray-300 text-md px-4 font-semibold'>
          <Link to='/'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>Home</li></Link>
          <Link to='/about'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>About</li></Link>
          <Link to='/consult'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>Consultation form</li></Link>
          <Link to='/blogs'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>Blogs</li></Link>
          <Link to='/contact'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>Contact</li></Link>
          <Link to='/testimonials'><li className='p-4 hover:bg-[#f2d2cf] dark:hover:text-black rounded-md transition-transform'>Testimonials</li></Link>
        </ul>
      </div>

      
      {isSticky && <div className='h-14 md:block hidden'></div>}
    </div>
  );
};

export default Navbar;
