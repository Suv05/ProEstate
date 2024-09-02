import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

import Spinner from "../utilities/Spinner";
import Broken from "../utilities/Broken";

function Favorite() {
  const navigate = useNavigate();
  const { currUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Fetch favorite list
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites", currUser._id],
    queryFn: async () => {
      const response = await fetch(`/api/v1/favorite/favitems`);
      return response.json();
    },
  });

  // Mutation for deleting a favorite
  const deleteFavoriteMutation = useMutation({
    mutationFn: async (listingId) => {
      await fetch(`/api/v1/favorite/favitems`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listingId }),
      });
    },
    onMutate: async (listingId) => {
      // Optimistic update
      await queryClient.cancelQueries(["favorites", currUser._id]);
      const previousFavorites = queryClient.getQueryData([
        "favorites",
        currUser._id,
      ]);

      queryClient.setQueryData(["favorites", currUser._id], (old) => ({
        ...old,
        listings: old.listings.filter((favorite) => favorite._id !== listingId),
      }));

      return { previousFavorites };
    },
    onError: (err, listingId, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ["favorites", currUser._id],
        context.previousFavorites
      );
      alert("Failed to remove favorite. Please try again.");
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["favorites", currUser._id]);
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <Broken />;

  const favorites = data?.listings;

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center mt-2">
        I ❤️‍🔥 Pro<span className="text-theme underline">Estate</span>
      </h1>
      {favorites.length === 0 && (
        <div className="text-center mt-8 text-xl font-semibold">
          <p>No Favorites Listing found 😔</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
            onClick={() => navigate("/listings")}
          >
            Browse Listings
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite._id}
            className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <img
              src={favorite.imageUrls[0]}
              alt={favorite.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{favorite.title}</h2>
              <p className="text-gray-600">{favorite.location}</p>
              <p className="text-primary font-bold">
                ${favorite.regularPrice - favorite.discountPrice}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-secondary hover:to-primary focus:outline-none"
                onClick={() => navigate(`/listings/${favorite._id}`)}
              >
                View Details
              </button>
            </div>
            {/* Delete Button */}
            <button
              className="absolute top-2 right-2 text-red-600 bg-white rounded-full p-2 hover:bg-red-600 hover:text-white transition-colors duration-300 focus:outline-none"
              onClick={() => deleteFavoriteMutation.mutate(favorite._id)}
            >
              <FaRegTrashCan />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
