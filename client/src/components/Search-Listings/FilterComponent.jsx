import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [offer, setOffer] = useState("all");
  const [furnished, setFurnished] = useState("all");
  const [parking, setParking] = useState("all");
  const [priceRange, setPriceRange] = useState([100, 570]);

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange([+e.target.value[0], +e.target.value[1]]);
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory.length ? selectedCategory : "all",
      offer,
      furnished,
      parking,
      priceRange,
    };
    onFilterChange(filters);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg font-sans text-[#222222]">
      {/* Category */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Category</h3>
        <hr className="mb-4"/>
        <div className="flex flex-wrap gap-2">
          {["house", "apartment", "condo", "studio"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Offer */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Offer</h3>
        <hr className="mb-4"/>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="true"
              checked={offer === "true"}
              onChange={(e) => setOffer(e.target.value)}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={offer === "false"}
              onChange={(e) => setOffer(e.target.value)}
              className="mr-2"
            />
            No
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={offer === "all"}
              onChange={(e) => setOffer(e.target.value)}
              className="mr-2"
            />
            All
          </label>
        </div>
      </div>

      {/* Furnished */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Furnished</h3>
        <hr className="mb-4"/>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="true"
              checked={furnished === "true"}
              onChange={(e) => setFurnished(e.target.value)}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={furnished === "false"}
              onChange={(e) => setFurnished(e.target.value)}
              className="mr-2"
            />
            No
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={furnished === "all"}
              onChange={(e) => setFurnished(e.target.value)}
              className="mr-2"
            />
            All
          </label>
        </div>
      </div>

      {/* Parking */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Parking</h3>
        <hr className="mb-4"/>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="true"
              checked={parking === "true"}
              onChange={(e) => setParking(e.target.value)}
              className="mr-2"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={parking === "false"}
              onChange={(e) => setParking(e.target.value)}
              className="mr-2"
            />
            No
          </label>
          <label>
            <input
              type="radio"
              value="all"
              checked={parking === "all"}
              onChange={(e) => setParking(e.target.value)}
              className="mr-2"
            />
            All
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">Price Range</h3>
        <hr className="mb-4"/>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="100"
            max="570"
            //value={priceRange[0]}
            onChange={handlePriceRangeChange}
            className="w-full"
          />
          <span className="text-sm text-gray-700">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
      >
        Show Results
      </button>
    </div>
  );
};

export default FilterComponent;
