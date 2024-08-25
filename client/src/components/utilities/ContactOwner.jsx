import React, { useState } from "react";
import { FiPhoneCall, FiSend, FiX } from "react-icons/fi";

const ContactOwner = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="mt-8 flex space-x-4">
      <button
        className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
        onClick={openDialog}
      >
        <FiPhoneCall className="text-lg" />
        <span>Contact Owner</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeDialog}
            >
              <FiX size={20} />
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Send a Message
            </h2>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Type your message..."
            ></textarea>
            <button className="mt-4 w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 transition">
              <FiSend className="mr-2" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactOwner;
