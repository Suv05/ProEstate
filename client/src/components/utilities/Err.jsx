import React from "react";

function Err({errMsg}) {
  return (
    <div className="mt-2 p-4 rounded-lg border border-red-500 bg-red-50 text-red-700 flex items-start mb-2">
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
          d="M12 8v4m0 4h.01M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z"
        ></path>
      </svg>
      <span className="text-sm">{errMsg}</span>
    </div>
  );
}

export default Err;
