import React, { useState } from "react";
import PriceRange from "./PriceRange";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [offer, setOffer] = useState("all");
  const [furnished, setFurnished] = useState("all");
  const [parking, setParking] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory.length ? selectedCategory : "all",
      offer,
      furnished,
      parking,
    };
    onFilterChange(filters);
  };

  return (
    <div className="relative w-full max-w-md md:max-w-lg mx-4 md:mx-0 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Close Button */}
      {/* <button
        onClick={() => onFilterChange(null)} // Handle close logic by passing null or any value to close the dialog
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl md:text-3xl"
      >
        &times;
      </button> */}

      {/* Dialog Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Category */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Category</h3>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-wrap gap-2">
            {["House", "Apartment", "Condo", "Studio"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory.includes(category.toLowerCase())
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Offer */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Offer</h3>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-wrap gap-2">
            {["true", "false", "all"].map((value) => (
              <label
                key={value}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                  offer === value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  checked={offer === value}
                  onChange={(e) => setOffer(e.target.value)}
                  className="hidden"
                />
                <span className="text-sm font-medium">
                  {value === "true" ? "Yes" : value === "false" ? "No" : "All"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Furnished */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Furnished</h3>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-wrap gap-2">
            {["true", "false", "all"].map((value) => (
              <label
                key={value}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                  furnished === value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  checked={furnished === value}
                  onChange={(e) => setFurnished(e.target.value)}
                  className="hidden"
                />
                <span className="text-sm font-medium">
                  {value === "true" ? "Yes" : value === "false" ? "No" : "All"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Parking</h3>
          <hr className="mb-4 border-gray-300" />
          <div className="flex flex-wrap gap-2">
            {["true", "false", "all"].map((value) => (
              <label
                key={value}
                className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
                  parking === value
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <input
                  type="radio"
                  value={value}
                  checked={parking === value}
                  onChange={(e) => setParking(e.target.value)}
                  className="hidden"
                />
                <span className="text-sm font-medium">
                  {value === "true" ? "Yes" : value === "false" ? "No" : "All"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <PriceRange />

        {/* Apply Filters Button */}
        <button
          onClick={handleApplyFilters}
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Show Results
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
