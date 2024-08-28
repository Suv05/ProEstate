import { useState } from "react";

function PriceRange() {
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(570);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Price Range</h3>
      <hr className="mb-4 border-gray-300" />
      <div className="relative h-2 rounded-full bg-gray-300">
        <input
          type="range"
          min="100"
          max="570"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none range-thumb"
          style={{ zIndex: minPrice === maxPrice ? 2 : 1 }} // Prevents overlap of thumbs
        />
        <input
          type="range"
          min="100"
          max="570"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none range-thumb"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute top-0 h-2 bg-indigo-500 rounded-full"
          style={{
            left: `${((minPrice - 100) / (570 - 100)) * 100}%`,
            right: `${100 - ((maxPrice - 100) / (570 - 100)) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-600 mt-2">
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
    </div>
  );
}

export default PriceRange;
