import React, { ChangeEvent } from 'react';

interface SearchProps {
  getSearched: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ getSearched }) => {


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    getSearched(e.target.value);
  };

    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 rounded-lg bg-purple-200 border border-purple-500 focus:outline-none"
          onChange={handleChange}
        />
      </div>
    );
  };
  
  export default Search;
  