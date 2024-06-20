import React, { useState, useEffect, useRef } from 'react';

const HomeButtons = () => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const genreDropdownRef = useRef(null);

  const genres = [
    { id: 1, title: 'Personal Growth' },
    { id: 2, title: 'Investigative Journalism' },
    { id: 3, title: 'History' },
    { id: 4, title: 'Comedy' },
    { id: 5, title: 'Entertainment' },
    { id: 6, title: 'Business' },
    { id: 7, title: 'Fiction' },
    { id: 8, title: 'News' },
    { id: 9, title: 'Kids and Family' },
  ];

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
    setIsGenreDropdownOpen(false); // Close genre dropdown if it's open
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
    setIsSortDropdownOpen(false); // Close sort dropdown if it's open
  };

  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortDropdownOpen(false);
    }
    if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
      setIsGenreDropdownOpen(false);
    }
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
      <div className='relative' ref={genreDropdownRef}>
        <button
          className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={toggleGenreDropdown}
        >
          Genre
        </button>
        {isGenreDropdownOpen && (
          <div className='absolute mt-2 w-48 bg-blue-500 rounded shadow-md z-[200]'>
            <ul className='text-black'>
              {genres.map((genre) => (
                <li key={genre.id} className='px-4 py-2 hover:bg-gray-200 cursor-pointer'>
                  {genre.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='relative' ref={sortDropdownRef}>
        <button
          className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={toggleSortDropdown}
        >
          Sort
        </button>
        {isSortDropdownOpen && (
          <div className='absolute mt-2 w-48 bg-blue-500 rounded shadow-md z-[200] '>
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
