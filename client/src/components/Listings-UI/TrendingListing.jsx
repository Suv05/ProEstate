import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../utilities/Spinner.jsx";
import Broken from "../utilities/Broken.jsx";

import {
  FaCar,
  FaBed,
  FaBath,
  FaChevronCircleRight,
  FaChevronCircleLeft,
} from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

function TrendingListing({}) {
  const [trendingListings, setTrendingListings] = useState([]);

  //err and loading state handeling
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  //pagination state
  const [currIndex, setCurrIndex] = useState(0);
  const itemsPerPage = 4;

  // Animation state
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const fetchTrendingListings = async () => {
      try {
        const response = await fetch("api/v1/listings/price?sort=price");
        if (!response.ok) {
          throw new Error("Failed to fetch trending listings");
        }
        const data = await response.json();
        setTrendingListings(data.listings || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending listings:", error);
        setErr(error.message);
        setLoading(false);
      }
    };
    fetchTrendingListings();
  }, []);

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
        Math.min(
          prevIndex + itemsPerPage,
          trendingListings.length - itemsPerPage
        )
      );
      setAnimationClass("fade-in-right");
    }, 500); // The delay matches the animation duration
  };

  if (loading) return <Spinner />;
  if (err) return <Broken />;
  return (
    <>
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Trending 💥 in <span className="text-theme">Our ProEsate</span>
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
              onAnimationEnd={() => setAnimationClass("")}
            >
              {trendingListings
                .slice(currIndex, currIndex + itemsPerPage)
                .map((listing) => (
                  <Link to={`/listings/${listing._id}`} key={listing._id}>
                    <div className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                      <img
                        src={listing.imageUrls[0]} // Display the first image
                        alt={listing.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-bold">{listing.title}</h2>
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

            <button
              onClick={handleNext}
              disabled={currIndex + itemsPerPage >= trendingListings.length}
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

export default TrendingListing;
