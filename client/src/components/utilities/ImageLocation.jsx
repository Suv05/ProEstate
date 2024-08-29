import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiMapPin } from 'react-icons/fi'; // Import location icon

const ImageLocation = ({ images, locations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Images */}
      <div className="relative overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-80 object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
        />

        {/* Location Label */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white py-1 px-3 rounded-lg flex items-center space-x-2">
          <FiMapPin className="w-5 h-5 text-btn" />
          <span className="text-sm font-semibold">
            {locations[currentIndex]}
          </span>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Thumbnails */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
              currentIndex === index
                ? 'border-2 border-blue-500'
                : 'opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageLocation;
