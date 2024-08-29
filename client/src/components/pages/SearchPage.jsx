import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { FaRegEdit, FaTrashAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

//components
import FilterDialog from "../Search-Listings/FilterDialog.jsx";

//utilities
import Spinner from "../utilities/Spinner.jsx";
import Broken from "../utilities/Broken.jsx";

const SearchPage = () => {
  const { register, handleSubmit } = useForm();
  const { filters } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const location = useLocation(); // To capture the URL and search query

  const [fetchListing, setFetchListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async (queryString) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/listings/search?${queryString}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("Fetched Listings:", data);
      setFetchListing(data.listing);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(filters);
    const searchParams = new URLSearchParams({
      offer: filters.offer,
      furnished: filters.furnished,
      parking: filters.parking,
    });

    // Only add category if it's not empty
    if (filters.category.length > 0) {
      filters.category.forEach((category) => {
        searchParams.append("category", category);
      });
    }

    if (data.searchTerm) {
      searchParams.append("searchTerm", data.searchTerm);
    }

    const queryString = searchParams.toString();
    navigate(`/explore?${queryString}`);
  };

  useEffect(() => {
    const queryString = new URLSearchParams(location.search).toString();
    if (queryString) {
      fetchListings(queryString);
    }
  }, [location.search, fetchListings]);

  if (loading) return <Spinner />;
  if (error) return <Broken />;
  return (
    <div className="flex flex-col w-full">
      {/* Search Bar at the top */}
      <div className="w-full lg:w-5/6 mx-auto mb-4 sticky top-0 z-10 bg-white shadow-md p-4 mt-4 flex">
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
      </div>
      <p className="text-sm text-theme px-5 mb-3 font-semibold flex items-center justify-center">
        Note: After applying filters click on the 🔍 button to see the results
      </p>
      {/* Render fetched listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-sans">
        {fetchListing.map((listing) => (
          <Link to={`/yourestate/${listing._id}`} key={listing._id}>
            <div className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img
                src={listing.imageUrls[0]} // Display the first image
                alt={listing.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{listing.title}</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit(listing._id);
                      }}
                      className="p-2 text-blue-600 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
                      title="Edit"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(listing._id);
                      }}
                      className="p-2 text-red-600 hover:text-red-400 transition duration-300 ease-in-out transform hover:scale-110"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{listing.location}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">
                    ${listing.discountPrice || listing.regularPrice}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      listing.offer
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {listing.offer ? "Special Offer" : "Regular"}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center space-x-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                    <FaBed />
                    <span>{listing.bedrooms} Beds</span>
                  </span>
                  <span className="flex items-center space-x-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                    <FaBath />
                    <span>{listing.bathrooms} Baths</span>
                  </span>
                  <span className="flex items-center space-x-2 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                    {listing.parking ? (
                      <FaCar />
                    ) : listing.petsAllowed ? (
                      <MdOutlinePets />
                    ) : (
                      <FaCar />
                    )}
                    <span>
                      {listing.parking
                        ? "Parking"
                        : listing.petsAllowed
                        ? "Pets Allowed"
                        : "No Parking"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
