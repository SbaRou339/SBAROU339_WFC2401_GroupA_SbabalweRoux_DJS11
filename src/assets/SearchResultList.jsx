import React from 'react';

const SearchResultList = ({ results }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg max-h-60 overflow-y-auto z-50 mt-2 rounded-lg">
      { (results.map((result) => (
          <button key={result.id} className="w-full p-4 border-b border-gray-200 flex items-center hover:bg-gray-100 focus:outline-none">
            <img src={result.image} alt={result.title} className="w-12 h-12 rounded-lg mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
              <p className="text-gray-600">{result.description}</p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default SearchResultList;
