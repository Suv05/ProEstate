import OfferListing from "./OfferListing.jsx";
import NewListing from "./newListing.jsx";
import TrendingListing from "./TrendingListing.jsx";

import ImageCarousel from "../utilities/ImageCarousel.jsx";

function Listings({}) {
  const images = [
    "https://media.istockphoto.com/id/1156127062/photo/modern-living-dining-room-and-kitchen-with-garden-view-3d-render.jpg?s=612x612&w=0&k=20&c=gE81cTFKhKMKenO_aiEldk-Gio59cxdiGtkAQ7xu_C0=",
    "https://media.istockphoto.com/id/109350275/photo/modern-living-room-and-patio-next-to-swimming-pool.jpg?s=612x612&w=0&k=20&c=-86Gi6YiQUyk2npZFZPjg5BFk-JCQWoKP3IPNDZqSCI=",
    "https://media.istockphoto.com/id/1194836012/photo/beautiful-young-woman-in-a-chic-pink-bathrobe-spends-time-alone-in-an-expensive-hotel-in-the.jpg?s=612x612&w=0&k=20&c=UzrV6G7s3RK9jNqHRTOlFmmEPUymkBI6oJU4Z-3J9kc=",
    "https://media.istockphoto.com/id/589448610/photo/couple-using-a-digital-tablet.jpg?s=612x612&w=0&k=20&c=3RdR92XLtd9N4HPsEhtB7IGOnk0UiuRNF53utIFWniw=",
    "https://media.istockphoto.com/id/485536628/photo/beautiful-living-room-detail-with-sunrise-view.jpg?s=612x612&w=0&k=20&c=oaBgxEqfJjxUBE11_bIMYG7qvN_55t3pj6yi-E77SOU=",
  ];

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

        {/* offer listings */}
        <OfferListing />
        {/* New listing section  */}
        <NewListing />
        {/* trending listing section  */}
        <TrendingListing />
      </div>
    </>
  );
}

export default Listings;
