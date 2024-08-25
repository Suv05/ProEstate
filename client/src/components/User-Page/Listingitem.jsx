import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { FiMapPin, FiPhoneCall, FiShare2, FiCalendar } from "react-icons/fi";
import { FaBath, FaBed, FaCouch, FaParking, FaPaw } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";


import ImageCarousel from "../utilities/ImageCarousel";
import ContactOwner from "../utilities/ContactOwner";

//utilities
import Spinner from "../utilities/Spinner";
import Broken from "../utilities/Broken";

function Listingitem({}) {
  const { currUser } = useSelector((state) => state.user);
  const { listingId } = useParams();
  const [showMore, setShowMore] = useState(false);

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
      <div className="max-w-5xl mx-auto p-6 font-sans">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-2 hover:underline text-[#222222]">
            {listing.title}
          </h1>
          <button className="gradient-button animate-gradient rounded-full p-3 text-white shadow-lg transform hover:scale-105">
            <FiShare2 className="text-lg" />
          </button>
        </div>
        <div className="text-theme flex items-center mb-6">
          <FiMapPin className="mr-2" /> {listing.location}
        </div>

        {/* Image Carousel */}
        <div className="rounded-lg overflow-hidden shadow-lg mb-6 pb-3">
          <ImageCarousel images={listing.imageUrls} />
        </div>
        <hr className="mb-6" />
        {/* Main Content */}
        <div className="mt-6">
          <h1 className="text-2xl font-semibold text-[#222222] px-6">
            About this place
          </h1>
          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <p
              className={`text-xl text-[#323232] mb-4 ${
                showMore ? null : "line-clamp-4"
              }`}
            >
              {listing.description}
            </p>
            <button
              className="flex items-center justify-between underline text-lg font-medium text-[#323232] hover:text-[#010101] mb-3"
              onClick={() => setShowMore(!showMore)}
            >
              <span>{showMore ? "Show less" : "Show more"}</span>
              <span className="ml-1">
                <FaAngleRight />
              </span>
            </button>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              {listing.discountPrice && (
                <span className="text-2xl font-extrabold text-primary">
                  ${listing.regularPrice - listing.discountPrice}
                </span>
              )}
              <span className="text-sm text-gray-500 line-through">
                ${listing.regularPrice}
              </span>
              {listing.specialOffer ? (
                <span className="text-lg text-green-600 font-bold animate-pulse">
                  Extra 5% off with special offer
                </span>
              ) : (
                <span className="text-lg text-red-500 font-bold">
                  -
                  {Math.floor(
                    ((listing.regularPrice - listing.discountPrice) /
                      listing.regularPrice) *
                      100
                  )}
                  % Off
                </span>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <FaBath className="text-2xl text-blue-500" />
                <span className="text-lg font-medium text-[#444]">
                  {listing.bathrooms} Bathrooms
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBed className="text-2xl text-blue-500" />
                <span className="text-lg font-medium text-[#444]">
                  {listing.bedrooms} Bedrooms
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCouch className="text-2xl text-blue-500" />
                <span className="text-lg font-medium text-[#444]">
                  {listing.furnished ? "Furnished" : "Not Furnished"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaParking className="text-2xl text-blue-500" />
                <span className="text-lg font-medium text-[#444]">
                  {listing.parking ? "Parking Available" : "No Parking"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPaw className="text-2xl text-blue-500" />
                <span className="text-lg font-medium text-[#444]">
                  {listing.petsAllowed ? "Pets Allowed" : "No Pets"}
                </span>
              </div>
            </div>
          </div>

          {/* Category & Status */}
          <div className="mt-6 flex space-x-4">
            <span className="capitalize bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1 px-4 rounded-full text-sm shadow-lg">
              {listing.category}
            </span>
            <span
              className={`capitalize py-1 px-4 rounded-full text-sm shadow-lg ${
                listing.status === "available"
                  ? "bg-gradient-to-r from-green-500 to-teal-500"
                  : "bg-gradient-to-r from-red-500 to-pink-500"
              } text-white`}
            >
              {listing.status}
            </span>
          </div>
        </div>

        {/* Contact Section */}
        <ContactOwner/>

        {/* Footer Section */}
        <div className="mt-8 text-primary flex items-center">
          <FiCalendar className="mr-2" /> Listed on:{" "}
          {new Date(listing.createdAt).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}

export default Listingitem;
