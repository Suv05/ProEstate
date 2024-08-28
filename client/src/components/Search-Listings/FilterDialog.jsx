import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterComponent from "./FilterComponent";

const FilterDialog = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleFilterChange = (filters) => {
    onFilterChange(filters);
    closeDialog();
  };

  return (
    <div>
      {/* Filter Button */}
      <button
        onClick={openDialog}
        className="py-2 px-4 bg-transparent text-theme font-semibold rounded-full hover:bg-btn hover:text-white border border-btn hover:transition duration-300 flex items-center"
      >
        <span>
          <FiFilter className="me-1" size={20} />
        </span>{" "}
        Filter
      </button>

      {/* Filter Dialog (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeDialog}
          ></div>

          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 z-10 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <FilterComponent onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDialog;
