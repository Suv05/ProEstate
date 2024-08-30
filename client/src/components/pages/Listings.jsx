import { useState, useEffect } from "react";
import Spinner from "../utilities/Spinner.jsx";
import Broken from "../utilities/Broken.jsx";

import ImageCarousel from "../utilities/ImageCarousel.jsx";
import { Link } from "react-router-dom";

import { FaCar, FaBed, FaBath } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

function Listings({}) {
  const images = [
    "https://media.istockphoto.com/id/1156127062/photo/modern-living-dining-room-and-kitchen-with-garden-view-3d-render.jpg?s=612x612&w=0&k=20&c=gE81cTFKhKMKenO_aiEldk-Gio59cxdiGtkAQ7xu_C0=",
    "https://media.istockphoto.com/id/109350275/photo/modern-living-room-and-patio-next-to-swimming-pool.jpg?s=612x612&w=0&k=20&c=-86Gi6YiQUyk2npZFZPjg5BFk-JCQWoKP3IPNDZqSCI=",
    "https://media.istockphoto.com/id/1194836012/photo/beautiful-young-woman-in-a-chic-pink-bathrobe-spends-time-alone-in-an-expensive-hotel-in-the.jpg?s=612x612&w=0&k=20&c=UzrV6G7s3RK9jNqHRTOlFmmEPUymkBI6oJU4Z-3J9kc=",
    "https://media.istockphoto.com/id/589448610/photo/couple-using-a-digital-tablet.jpg?s=612x612&w=0&k=20&c=3RdR92XLtd9N4HPsEhtB7IGOnk0UiuRNF53utIFWniw=",
    "https://media.istockphoto.com/id/485536628/photo/beautiful-living-room-detail-with-sunrise-view.jpg?s=612x612&w=0&k=20&c=oaBgxEqfJjxUBE11_bIMYG7qvN_55t3pj6yi-E77SOU=",
  ];
  const [offerListings, setOfferListings] = useState([]);
  const [newListings, setNewListings] = useState([]);
  const [trendingListings, setTrendingListings] = useState([]);

  //err and loading state handeling
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/v1/listings/offer?offer=true&limit=4"
        );
        console.log("Offer Listings Response:", response); // Debug response
        if (!response.ok) {
          throw new Error("Failed to fetch offer listings");
        }
        const data = await response.json();
        console.log("Offer Listings Data:", data); // Debug data
        setOfferListings(data.listings || []);
        fetchNewListings();
      } catch (error) {
        console.error("Error fetching offer listings:", error);
      }
    };

    const fetchNewListings = async () => {
      try {
        const response = await fetch(
          "/api/v1/listings/new?sort=newCreated&limit=4"
        );
        console.log("New Listings Response:", response); // Debug response
        if (!response.ok) {
          throw new Error("Failed to fetch new listings");
        }
        const data = await response.json();
        console.log("New Listings Data:", data); // Debug data
        setNewListings(data.listings || []);
        fetchTrendingListings();
      } catch (error) {
        console.error("Error fetching new listings:", error);
      }
    };

    const fetchTrendingListings = async () => {
      try {
        const response = await fetch(
          "api/v1/listings/price?sort=price&limit=4&sortOrder=asc"
        );
        console.log("Trending Listings Response:", response); // Debug response
        if (!response.ok) {
          throw new Error("Failed to fetch trending listings");
        }
        const data = await response.json();
        console.log("Trending Listings Data:", data); // Debug data
        setTrendingListings(data.listings || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending listings:", error);
        setErr(error.message);
      }
    };

    fetchOfferListings();
  }, []);

  if (loading) return <Spinner />;
  if (err) return <Broken />;

  console.log("Offer Listings:", offerListings);
  console.log("New Listings:", newListings);
  console.log("Trending Listings:", trendingListings);

  return (
    <>
      <div className="font-sans antialiased text-gray-900">
        {/* Banner section */}
        <div className="relative bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
              {/* Left Text Section */}
              <div className="flex flex-col justify-center">
                <h1 className="text-3xl font-semibold text-gray-800">Find</h1>
                <h2 className="text-4xl font-bold text-gray-800">
                  Your Dream Apartment
                </h2>
                <p className="text-3xl font-semibold text-sec">
                  In <span className="text-sec">On ProEstate</span>
                </p>
                <button
                  disabled
                  className="px-6 py-3 mt-4 text-white bg-sec rounded-lg shadow hover:bg-primary"
                >
                  Get Started
                </button>
              </div>

              {/* Right Image Section */}
              <ImageCarousel images={images} />
            </div>
          </div>
        </div>
        {/* offer section  */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              Saved more 💰 On <span className="text-theme">Special Offer</span>
            </h1>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Property cards */}
              {offerListings.map((listing) => (
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
          </div>
        </div>
        {/* New listing section  */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              New in 🏚️<span className="text-theme">Our family</span>
            </h1>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Property cards */}
              {newListings.map((listing) => (
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
          </div>
        </div>
        {/* trending listing section  */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              Trending 💥 in <span className="text-theme">Our ProEsate</span>
            </h1>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Property cards */}
              {trendingListings.map((listing) => (
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Listings;
