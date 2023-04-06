import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
