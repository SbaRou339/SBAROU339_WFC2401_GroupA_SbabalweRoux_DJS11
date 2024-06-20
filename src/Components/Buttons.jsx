import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButtons = () => {
  const navigate = useNavigate();
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSortDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isSortDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSortDropdownOpen]);

  return (
    <div className='flex items-center p-4 w-full z-[100]'>
      <button
        className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
        onClick={() => navigate('/genre')}
      >
        Genre
      </button>
      <div className='relative' ref={dropdownRef}>
        <button
          className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={toggleSortDropdown}
        >
          Sort
        </button>
        {isSortDropdownOpen && (
          <div className='absolute mt-2 w-48 bg-white rounded shadow-md z-[200]'>
            <ul className='text-black'>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>A-Z</li>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Z-A</li>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Date (New-Old)</li>
              <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>Date (Old-New)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeButtons;
