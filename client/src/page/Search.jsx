import React from 'react';
import SearchComponent from '../components/SearchComponent';

const Search = () => {
  return (
    <>
      <div className="container mt-10 mb-10">
        <div className="flex flex-row justify-between border border-b-slate-700">
          <h3 className="text-2xl font-semibold border border-b-black">
            Search Novel
          </h3>
        </div>

        <SearchComponent />
      </div>
    </>
  );
};

export default Search;
