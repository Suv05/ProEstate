import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { FiMapPin, FiPhoneCall, FiShare2, FiCalendar } from "react-icons/fi";
import { FaBath, FaBed, FaCouch, FaParking, FaPaw } from "react-icons/fa";
import ImageCarousel from "../utilities/ImageCarousel";

//utilities
import Spinner from "../utilities/Spinner";
import Broken from "../utilities/Broken";

function Listingitem({}) {
  const { currUser } = useSelector((state) => state.user);
  const { listingId } = useParams();

  // Fetch listings data
  const { data, isLoading, error } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/user/${currUser._id}/proEstate/${listingId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <Broken />;

  const listing = data?.listing;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 hover:underline">
            {listing.title}
          </h1>
          <button className="gradient-button animate-gradient rounded-full p-3 text-white shadow-lg transform hover:scale-105">
            <FiShare2 className="text-lg" />
          </button>
        </div>
        <div className="text-gray-600 flex items-center mb-6">
          <FiMapPin className="mr-2" /> {listing.location}
        </div>

        {/* Image Carousel */}
        <ImageCarousel images={listing.imageUrls} />

        {/* Main Content */}
        <div className="mt-6">
          {/* Description */}
          <p className="text-lg text-gray-700 mb-4">{listing.description}</p>

          {/* Pricing */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 line-through">
              ${listing.regularPrice}
            </span>
            {listing.discountPrice && (
              <span className="text-xl text-red-500">
                ${listing.discountPrice}
              </span>
            )}
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <FaBath className="text-xl text-gray-700" />
              <span>{listing.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBed className="text-xl text-gray-700" />
              <span>{listing.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCouch className="text-xl text-gray-700" />
              <span>{listing.furnished ? "Furnished" : "Not Furnished"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaParking className="text-xl text-gray-700" />
              <span>
                {listing.parking ? "Parking Available" : "No Parking"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPaw className="text-xl text-gray-700" />
              <span>{listing.petsAllowed ? "Pets Allowed" : "No Pets"}</span>
            </div>
          </div>

          {/* Category & Status */}
          <div className="mt-6 flex space-x-4">
            <span className=" capitalize badge-modern bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-3 rounded-full">
              {listing.category}
            </span>
            <span
              className={`badge-modern capitalize ${
                listing.status === "available"
                  ? "bg-gradient-to-r from-green-500 to-teal-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              } text-white py-1 px-3 rounded-full`}
            >
              {listing.status}
            </span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex space-x-4">
          <button className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform">
            <FiPhoneCall className="text-lg" />
            <span>Contact Owner</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-gray-600 flex items-center">
          <FiCalendar className="mr-2" /> Listed on:{" "}
          {new Date(listing.createdAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}

export default Listingitem;
