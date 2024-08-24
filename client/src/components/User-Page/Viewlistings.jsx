import { useSelector } from "react-redux";
import { useState,useEffect } from "react";

//utilities
import { fetchApi } from "../functions/fetchApi";
import Spinner from "../utilities/Spinner";

function Viewlistings({}) {
  const { currUser } = useSelector((state) => state.user);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("render count:");
  

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (currUser && currUser._id) {
          const data = await fetchApi(`/api/v1/user/${currUser._id}/proEstate`);
          setListings(data.listings);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [currUser]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-sans">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={listing.imageUrls[0]} // Display the first image
            alt={listing.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">{listing.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{listing.location}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-bold text-lg">
                ${listing.regularPrice}
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
              <span>{listing.bedrooms} Beds</span>
              <span>{listing.bathrooms} Baths</span>
              <span>{listing.parking ? "Parking" : "No Parking"}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Viewlistings;
