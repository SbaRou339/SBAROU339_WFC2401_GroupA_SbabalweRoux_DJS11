import React, { useState, useEffect, useRef } from 'react';

const HomeButtons = ({ onSort, onGenre }) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  const genreDropdownRef = useRef(null);

  const genres = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
    { id: 9, name: 'Kids and Family' },
  ];

  const toggleSortDropdown = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
      setIsSortDropdownOpen(false);
    }
    if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
      setIsGenreDropdownOpen(false);
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
      <div className='relative' ref={genreDropdownRef}>
        <button
          className="text-white px-6 py-2 rounded from-gray-200 to-transparent cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={toggleGenreDropdown}
        >
          Genre
        </button>
        {isGenreDropdownOpen && (
          <div className='absolute mt-2 w-48 bg-white rounded shadow-md z-[200]'>
            <ul className='text-black'>
              {genres.map(genre => (
                <li
                  key={genre.id}
                  className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                  onClick={() => handleGenre(genre.name)}
                >
                  {genre.name}
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
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeButtons;
