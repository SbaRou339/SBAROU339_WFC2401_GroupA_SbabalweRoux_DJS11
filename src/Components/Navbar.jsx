import React from 'react'
import EchoPodLogo from '../assets/Logo'
import SearchBar from '../assets/SearchBar'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 w-full z-[100] absolute">
      <EchoPodLogo />
      <SearchBar />
      <div>
        <button className="text-white pr-4">Login</button>
        <button className="bg-blue-500 px-6 py-2 rounded cursor-pointer text-white">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar