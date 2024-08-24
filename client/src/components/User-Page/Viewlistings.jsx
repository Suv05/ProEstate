import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { FaRegEdit, FaTrashAlt, FaBed, FaBath, FaCar } from "react-icons/fa";

//utilities
import Spinner from "../utilities/Spinner";
import Broken from "../utilities/Broken";

function Viewlistings({}) {
  const { currUser } = useSelector((state) => state.user);

  const fetchListings = async () => {
    const response = await fetch(`/api/v1/user/${currUser._id}/proEstate`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", currUser._id],
    queryFn: fetchListings,
  });

  if (isLoading) return <Spinner />;
  if (error) return <Broken />;

  const listings = data?.listings; // Extract the listings array from the data object

  if (!Array.isArray(listings)) {
    return <Broken />; // Handle the case where listings is not an array
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-sans">
      {listings.map((listing) => (
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
                  <FaCar />
                  <span>{listing.parking ? "Parking" : "No Parking"}</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Viewlistings;
