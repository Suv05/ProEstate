import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

//utiliteis
import Signbtn from "../utilities/Signbtn";
import Userprofile from "../utilities/Userprofile";

function Header() {
  const { currUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
              className="w-full border rounded-md py-2 px-4 pl-10 bg-gray-100 focus:outline-none focus:border-blue-500"
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

        {/* Profile/Buttons */}
        <div className="relative">
          {currUser ? (
            <div className="relative">
              <div
                className="cursor-pointer flex items-center space-x-2 bg-gray-100 rounded-xl py-2 px-3 hover:shadow-md"
                onClick={toggleDropdown}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                  <img
                    src={currUser.avtar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <svg
                    className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
                      dropdownOpen ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && <Userprofile />}
            </div>
          ) : (
            <Signbtn />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
