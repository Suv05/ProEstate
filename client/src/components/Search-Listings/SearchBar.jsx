import React from "react";
import { useForm } from "react-hook-form";
import FilterDialog from "./FilterDialog";

const SearchBar = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="relative w-full me-3 flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex items-center flex-grow"
        >
          <input
            type="text"
            {...register("searchTerm")}
            className="w-full border rounded-md py-3 px-4 pl-10 bg-gray-100 focus:outline-none focus:border-blue-500 ml-4"
            placeholder="Search properties..."
          />
          <button
            type="submit"
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 rounded-full p-1.5 bg-btn active:scale-75 hover:scale-105 hover:text-white"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a7 7 0 111.414-1.415l4.387 4.386a1 1 0 11-1.414 1.414l-4.387-4.386zM14 7a5 5 0 11-10 0 5 5 0 0110 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>
      <div>
        <FilterDialog />
      </div>
    </>
  );
};

export default SearchBar;
