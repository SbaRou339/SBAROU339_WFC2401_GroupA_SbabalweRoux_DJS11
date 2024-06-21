import React, { useState, useEffect, useRef } from 'react';

const HomeButtons = ({ onSort, onGenre }) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSortDropdownOpen(false);
      setIsGenreDropdownOpen(false); // Close genre dropdown when clicking outside
    }
  };

  const handleSort = (criteria) => {
    onSort(criteria);
    setIsSortDropdownOpen(false);
  };

  const handleGenre = (genre) => {
    onGenre(genre);
    setIsGenreDropdownOpen(false);
  };

  useEffect(() => {
    if (isSortDropdownOpen || isGenreDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSortDropdownOpen, isGenreDropdownOpen]);

  return (
    <div className='flex items-center p-4 w-full z-[100]'>
      <div className='relative' ref={dropdownRef}>
        <button
          className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={toggleGenreDropdown}
        >
          Genre
        </button>
        {isGenreDropdownOpen && (
          <div className='absolute mt-2 w-48 bg-white rounded shadow-md z-[200]'>
            <ul className='text-black'>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Personal Growth')}
              >
                Personal Growth
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Investigative Journalism')}
              >
                Investigative Journalism
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('History')}
              >
                History
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Comedy')}
              >
                Comedy
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Entertainment')}
              >
                Entertainment
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Business')}
              >
                Business
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Fiction')}
              >
                Fiction
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('News')}
              >
                News
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleGenre('Kids and Family')}
              >
                Kids and Family
              </li>
              {/* Add more genre options as needed */}
            </ul>
          </div>
        )}
      </div>
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
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSort('A-Z')}
              >
                A-Z
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSort('Z-A')}
              >
                Z-A
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSort('Date (New-Old)')}
              >
                Date (New-Old)
              </li>
              <li
                className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSort('Date (Old-New)')}
              >
                Date (Old-New)
              </li>
              {/* Add more sorting options as needed */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeButtons;
