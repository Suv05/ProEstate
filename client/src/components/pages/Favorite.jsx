import React from "react";

function Favorite() {
  //const favorites = useSelector((state) => state.favorite.favorites);
  const favorites = [
    // Example data; replace with dynamic data from your backend
    {
      id: 1,
      title: "Luxury Villa in Beverly Hills",
      image: "https://via.placeholder.com/300", // Replace with actual image URLs
      location: "Beverly Hills, CA",
      price: "$5,000,000",
    },
    {
      id: 2,
      title: "Modern Apartment in New York",
      image: "https://via.placeholder.com/300",
      location: "New York, NY",
      price: "$3,000,000",
    },
  ];

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center mt-2">
        I ❤️‍🔥 Pro<span className="text-theme underline">Estate</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <img
              src={favorite.image}
              alt={favorite.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{favorite.title}</h2>
              <p className="text-gray-600">{favorite.location}</p>
              <p className="text-primary font-bold">{favorite.price}</p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:from-secondary hover:to-primary focus:outline-none">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
