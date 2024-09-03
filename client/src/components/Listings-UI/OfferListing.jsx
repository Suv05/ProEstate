import { useTheme } from "../utilities/ThemeProvider.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Spinner from "../utilities/Spinner.jsx";
import Broken from "../utilities/Broken.jsx";

import {
  FaCar,
  FaBed,
  FaBath,
  FaChevronCircleRight,
  FaChevronCircleLeft,
  FaHeart,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

function OfferListing({}) {
  const queryClient = useQueryClient();
  const { isDarkMode } = useTheme();
  //pagination state
  const [currIndex, setCurrIndex] = useState(0);
  const itemsPerPage = 4;

  // Animation state
  const [animationClass, setAnimationClass] = useState("");

  // Initialize state with the value from local storage, or an empty object if not found
  const [favoritesMap, setFavoritesMap] = useState(() => {
    const savedFavorites = localStorage.getItem("favoritesMap");
    return savedFavorites ? JSON.parse(savedFavorites) : {};
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["offerListings"],
    queryFn: async () => {
      const response = await fetch("/api/v1/listings/offer?offer=true");
      return response.json();
    },
  });

  //mutation for adding and removing favorites listing
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (listingId) => {
      const isFavorited = favoritesMap[listingId];
      const method = isFavorited ? "DELETE" : "POST";
      const response = await fetch("/api/v1/favorite/favitems", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isFavorited ? "remove" : "add"} favorite`);
      }
    },
    onSuccess: (data, listingId) => {
      queryClient.invalidateQueries(["newListings"]);
      // Update the favorite status for this particular listing
      updateFavoritesMap(listingId);
    },
  });

  const offerListings = data?.listings;

  // Update state and local storage when favoritesMap changes
  const updateFavoritesMap = (listingId) => {
    setFavoritesMap((prevMap) => {
      const updatedMap = {
        ...prevMap,
        [listingId]: !prevMap[listingId],
      };
      // Store the updated map in local storage
      localStorage.setItem("favoritesMap", JSON.stringify(updatedMap));
      return updatedMap;
    });
  };

  //Navigate to prev page
  const handlePrev = () => {
    // Trigger fade-out animation
    setAnimationClass("fade-out-left");

    // Delay the update of the index to match the duration of the fade-out animation
    setTimeout(() => {
      setCurrIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
      setAnimationClass("fade-in-right");
    }, 500); // The delay matches the animation duration
  };

  //Navigate to next page
  const handleNext = () => {
    // Trigger fade-out animation
    setAnimationClass("fade-out-left");

    // Delay the update of the index to match the duration of the fade-out animation
    setTimeout(() => {
      setCurrIndex((prevIndex) =>
        Math.min(prevIndex + itemsPerPage, offerListings.length - itemsPerPage)
      );
      setAnimationClass("fade-in-right");
    }, 500); // The delay matches the animation duration
  };

  if (isLoading) return <Spinner />;
  if (error) return <Broken />;
  return (
    <>
      {/* offer section  */}
      <div className={`${isDarkMode ? "bg-slate-600" : "bg-white"} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className={`text-3xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Saved more 💰 On <span className="text-theme">Special Offer</span>
          </h1>
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currIndex === 0}
              className="text-3xl disabled:text-blue-300 text-blue-600"
            >
              <FaChevronCircleLeft />
            </button>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${animationClass}`}
              onAnimationEnd={() => setAnimationClass("")} // Reset the animation class after animation ends
            >
              {offerListings
                .slice(currIndex, currIndex + itemsPerPage)
                .map((listing) => (
                  <Link to={`/listings/${listing._id}`} key={listing._id}>
                    <div
                      className={`${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                      } rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl`}
                    >
                      <img
                        src={listing.imageUrls[0]} // Display the first image
                        alt={listing.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />

                      {/* Heart Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigating to the listing detail page when clicking the heart icon
                          toggleFavoriteMutation.mutate(listing._id);
                        }}
                        className={`absolute top-2 right-2 text-2xl ${
                          favoritesMap[listing._id]
                            ? "text-red-500"
                            : "text-gray-300"
                        } hover:text-red-500 transition duration-300`}
                      >
                        <FaHeart />
                      </button>

                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <h2
                            className={`text-lg font-bold ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {listing.title}
                          </h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {listing.location}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-blue-600 font-bold text-lg">
                            ${listing.regularPrice - listing.discountPrice}
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
                            isDarkMode ? "text-white" : "text-gray-600"
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

            <button
              onClick={handleNext}
              disabled={currIndex + itemsPerPage >= offerListings.length}
              className="text-3xl text-blue-600 disabled:text-blue-300"
            >
              <FaChevronCircleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfferListing;
