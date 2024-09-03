import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../utilities/ThemeProvider.jsx";

import {
  FaCar,
  FaSwimmingPool,
  FaShieldAlt,
  FaHospital,
  FaBook,
  FaBed,
  FaHome,
  FaChild,
  FaBath,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";

import Spinner from "../utilities/Spinner.jsx";
import Broken from "../utilities/Broken.jsx";
import ImageLocation from "../utilities/ImageLocation.jsx";
import Accordian from "../utilities/Accordian.jsx";
import ApartmentPlans from "../utilities/ApartmentPlans.jsx";

function Home({}) {
  const images = [
    "https://media.istockphoto.com/id/185275043/photo/old-stone-house.jpg?s=612x612&w=0&k=20&c=DOPIBIPoF4wPwImDeQrc6paRqribK2NjxLyCxMrnrWA=",
    "https://media.istockphoto.com/id/1223059837/photo/cityscape-of-a-modern-residential-area-with-apartment-buildings-new-green-urban-landscape-in.jpg?s=612x612&w=0&k=20&c=UWmzWnHmiLmBF32B6KaNl9acntTWGFrZgjidWat8UXo=",
    "https://media.istockphoto.com/id/185321544/photo/beautiful-house-in-florida.jpg?s=612x612&w=0&k=20&c=EsyEfWm4BUoCpEwpWXvFgGtn33l2zrvyoSW1jP--HL8=",
    "https://c4.wallpaperflare.com/wallpaper/971/1012/9/architecture-house-modern-wallpaper-preview.jpg",
  ];

  const locations = ["London", "Mumbai", "Johannesburg", "NewYork"];

  const features = [
    { icon: <FaCar size={24} />, title: "Parking Space" },
    { icon: <FaSwimmingPool size={24} />, title: "Swimming Pool" },
    { icon: <FaShieldAlt size={24} />, title: "Private Security" },
    { icon: <FaHospital size={24} />, title: "Medical Center" },
    { icon: <FaBook size={24} />, title: "Library Area" },
    { icon: <FaBed size={24} />, title: "King Size Beds" },
    { icon: <FaHome size={24} />, title: "Smart Home" },
    { icon: <FaChild size={24} />, title: "Kids Playland" },
  ];

  const { isDarkMode } = useTheme();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/v1/listings?limit=4");
        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await res.json();
        setListings(data.listings);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Broken />;

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Hero Section */}
      <div
        className={isDarkMode ? `relative bg-[#222222]` : `relative bg-blue-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {/* Conditional background for mobile */}
            <div className="md:hidden myImg h-64 rounded-lg shadow-md"></div>

            <div className="flex flex-col justify-center">
              <h1
                className={
                  isDarkMode
                    ? `text-4xl font-bold text-white`
                    : `text-4xl font-bold text-[#222222]`
                }
              >
                Let's find your <span className="text-theme">Dream...</span>
              </h1>
              <p className="mt-4 text-lg text-sec">
                Find the best property to fit your needs.
              </p>
              <div className="mt-8 flex flex-col md:flex-row items-center">
                <div className="relative w-full md:w-auto">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="p-3 pl-10 w-full md:w-auto rounded-md shadow-sm border border-gray-300 focus:ring-0 focus:ring-sec"
                  />
                </div>
                <Link to="/listings">
                  <button className="mt-3 md:mt-0 md:ml-4 p-3 px-8 bg-theme text-white font-semibold rounded-md shadow-md hover:bg-btn transition duration-300 transform hover:scale-105">
                    Search
                  </button>
                </Link>
              </div>
            </div>

            {/* Image visible on larger screens */}
            <div className="hidden md:block">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg"
                alt="Apartment"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className={isDarkMode ? `bg-gray-800 py-16` : `bg-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800 "
            } text-center`}
          >
            Hi, What do you want in your{" "}
            <p className="text-theme">Dream Apartment?</p>
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Property cards */}
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <img
                src="https://media.istockphoto.com/id/453944565/photo/home-exterior.webp?b=1&s=612x612&w=0&k=20&c=m6-12Bad8kaPBmifq55lcXbgwsjoV5IxhLl0VQBvKkM="
                alt="Property"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Deluxe <span className="text-theme">Portion</span>
                </h3>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/1011/101/300/apartment-condo-design-home-wallpaper-preview.jpg"
                alt="Property"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Double <span className="text-theme">Height</span>
                </h3>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <img
                src="https://media.istockphoto.com/id/1269776313/photo/suburban-house.webp?b=1&s=612x612&w=0&k=20&c=yD8zpGK_XcbsbNxzhClu6Z45LrLVxzLGg9E4pxL5ra0="
                alt="Property"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Pent<span className="text-theme">house</span>
                </h3>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <img
                src="https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.webp?b=1&s=612x612&w=0&k=20&c=Z6-70cTQBqMGZ-FA9GVd2XGxaMD59EYqXaixVY53_cw="
                alt="Property"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-2 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  The <span className="text-theme">Studio</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Apartment */}
      <div className={isDarkMode ? `bg-[#222222] py-16` : `bg-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-semibold ${
              isDarkMode ? "text-white" : "text-gray-800"
            }  text-center`}
          >
            Featured <span className="text-theme">Apartment</span>
          </h2>
          <p className="text-center text-sm text-gray-400">
            The most frequently searched and most popular apratment will be in
            this list
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Property cards */}
            {listings.map((listing) => (
              <div
                key={listing.title}
                className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              >
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
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/listings">
            <button className="px-4 py-3 bg-btn text-white hover:bg-transparent hover:text-theme hover:border hover:border-theme">
              Explore Something New
            </button>
          </Link>
        </div>
      </div>

      {/* Location Section */}
      <div className={`relative ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
            {/* Left Text Section */}
            <div className="flex flex-col justify-center">
              <h1
                className={`text-3xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Buy
              </h1>
              <h2
                className={`text-4xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } `}
              >
                Dream Apartment
              </h2>
              <p className="text-3xl font-semibold text-sec">
                In <span className="text-sec">Prime location</span>
              </p>
              <Link to="/listings">
                <button className="px-6 py-3 mt-4 text-white bg-sec rounded-lg shadow hover:bg-primary">
                  See All Apartment
                </button>
              </Link>
            </div>

            {/* Right Image Section */}
            <ImageLocation images={images} locations={locations} />
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <ApartmentPlans />

      {/* features section */}
      <div className={`relative ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl font-semibold text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Featured <span className="text-theme">Listings</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 ${
                  selected === index ? "bg-primary text-white" : "bg-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                <div className="text-3xl mb-4 rounded-full px-2 py-2 bg-gray-200 text-sec">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Accorodian section */}
      <Accordian />
    </div>
  );
}

export default Home;
