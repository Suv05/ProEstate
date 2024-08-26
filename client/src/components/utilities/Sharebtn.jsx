import React, { useState } from "react";
import { FiShare2, FiCheck, FiClipboard } from "react-icons/fi";
function Sharebtn({}) {
  const [showCopied, setShowCopied] = useState(false);
  const handleShare = async () => {
    try {
      //Get the current url
      const currentURL = window.location.href;

      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(currentURL);

      // Optional: Provide feedback to the user (e.g., an alert or toast message)
      setShowCopied(true);

      setTimeout(() => {
        setShowCopied(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to copy the url:", err);
    }
  };
  return (
    <>
      <div className="relative">
        <button
          className="gradient-button animate-gradient rounded-full p-3 text-white shadow-lg transform hover:scale-105"
          onClick={handleShare}
        >
          {showCopied ? (
            <FiCheck className="text-lg" />
          ) : (
            <FiShare2 className="text-lg" />
          )}
        </button>

        {/* Toast Message */}
        {showCopied && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full px-3 py-2 md:px-4 md:py-2 flex items-center space-x-2 shadow-lg z-50 animate-slide-in-top">
            <FiClipboard className="text-lg md:text-xl" />
            <span className="text-sm md:text-base">Copied to clipboard!</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Sharebtn;
