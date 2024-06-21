import React, { useState } from 'react'
import EchoPodLogo from '../assets/Logo'
import SearchBar from '../assets/SearchBar'
import SearchResultList from '../assets/SearchResultList';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  return (
    <div  className="flex items-center justify-between p-4 w-full z-[100] absolute">
      <div onClick={() => navigate('/')}>
        <EchoPodLogo />
      </div>
      <div>
        <SearchBar setResults={setResults} />
        <SearchResultList results={results}/>
      </div>
      <div>
        <button className="text-white pr-4" onClick={() => navigate('/login')}>Login</button>
        <button className="bg-blue-500 px-6 py-2 rounded cursor-pointer text-white" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar