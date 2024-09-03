import { useTheme } from "../utilities/ThemeProvider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaRegEdit, FaTrashAlt, FaBed, FaBath, FaCar } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

//utilities
import Spinner from "../utilities/Spinner";
import Broken from "../utilities/Broken";

function Viewlistings({}) {
  const { isDarkMode } = useTheme();
  const { currUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Fetch listings data
  const { data, isLoading, error } = useQuery({
    queryKey: ["listings", currUser._id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/user/${currUser._id}/proEstate`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Mutation to delete a listing
  const deleteMutation = useMutation({
    mutationFn: async (listingId) => {
      const response = await fetch(
        `/api/v1/user/${currUser._id}/proEstate/${listingId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the listing");
      }
    },
    onSuccess: () => {
      // Invalidate the listings query to refetch the updated data
      queryClient.invalidateQueries(["listings", currUser._id]);
    },
  });

  const onDelete = (listingId) => {
    deleteMutation.mutate(listingId);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Broken />;

  const listings = data?.listings;

  if (!Array.isArray(listings)) {
    return <Broken />;
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-sans ${
        isDarkMode ? "bg-[#18171b]" : "bg-blue-50"
      }`}
    >
      {/* when there is no listings to show */}
      {listings.length === 0 && (
        <div className="text-center mt-5">
          <h1
            className={`text-3xl ${
              isDarkMode ? "text-white" : "text-[#323232]"
            } font-bold`}
          >
            No Listings to so for now 😔
          </h1>
          <Link to="/new">
            <button className="text-xl border border-theme rounded-lg mt-3 hover:bg-theme hover:text-white hover:rounded-b-sm">
              Create One
            </button>
          </Link>
        </div>
      )}

      {listings.map((listing) => (
        <Link to={`/yourestate/${listing._id}`} key={listing._id}>
          <div
            className={`rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ${
              isDarkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <img
              src={listing.imageUrls[0]} // Display the first image
              alt={listing.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-[#323232]"
                  }`}
                >
                  {listing.title}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit(listing._id);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110"
                    title="Edit"
                    disabled={true}
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
              <p
                className={`text-sm ${
                  isDarkMode ? "text-white" : "text-[#323232]"
                } mb-4`}
              >
                {listing.location}
              </p>
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
              <div
                className={`flex justify-between text-sm ${
                  isDarkMode ? "text-white" : "text-[#323232]"
                }`}
              >
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
  );
}

export default Viewlistings;
