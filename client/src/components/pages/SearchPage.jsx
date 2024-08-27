import React from "react";
import SearchBar from "../Search-Listings/SearchBar.jsx";

const SearchPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Search Bar at the top */}
      <div className="w-full lg:w-5/6 mx-auto mb-4 sticky top-0 z-10 bg-white shadow-md p-4 mt-4 flex">
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;
