import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md font-sans">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={`/`}>
          <div className="text-2xl font-bold text-gray-800">
            Pro<span className="text-theme hover:underline">Estate</span>
          </div>
        </NavLink>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg mx-4">
          <form action="">
            <input
              type="text"
              className=" w-full md:w-full xs:w-28 sm:w-60 lg:w-full xl:w-full 2xl:w-full  border rounded-md py-2 px-4 pl-10 bg-gray-100 focus:outline-none focus:border-blue-500"
              placeholder="Search properties..."
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg
                className="w-5 h-5 text-btn"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a7 7 0 111.414-1.415l4.387 4.386a1 1 0 11-1.414 1.414l-4.387-4.386zM14 7a5 5 0 11-10 0 5 5 0 0110 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </form>
        </div>

        {/* Sign Up and Login buttons */}
        <div className="flex items-center space-x-4">
          <button className="border-1 border-btn text-btn hover:bg-btn hover:text-white px-4 py-2 rounded-md active:scale-75 hover:scale-105">
            Login
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sec active:scale-75 hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
