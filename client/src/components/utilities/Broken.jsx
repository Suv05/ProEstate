import { useRouteError } from "react-router-dom";

function Broken() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full">
        <div className="flex flex-col items-center">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 11-12.728 0M12 8v4m0 4h.01"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Something went wrong!
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            {error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Broken;
