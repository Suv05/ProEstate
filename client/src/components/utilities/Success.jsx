import React from "react";

function Success({ successMsg }) {
  return (
    <>
      <div className="success-message mt-2 p-4 rounded-lg border border-green-500 bg-green-50 text-green-700 flex items-start mb-2">
        <svg
          className="w-5 h-5 mr-2 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span className="text-sm">{successMsg}</span>
      </div>
    </>
  );
}

export default Success;
