import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className=" justify-center ml-6 mr-6 mt-10 mb-10">
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-40% p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

export default SearchBar;
