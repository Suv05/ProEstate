import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

//utiliteis
import Signbtn from "../utilities/Signbtn";
import Userprofile from "../utilities/Userprofile";

function Header() {
  const { currUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Close the dropdown on route change
    setDropdownOpen(false);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  return (
    <header className="bg-white shadow-md font-sans">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={`/`}>
          <div className="text-2xl font-bold text-gray-800">
            Pro<span className="text-theme hover:underline">Estate</span>
          </div>
        </NavLink>

        

        {/* Profile/Buttons */}
        <div className="relative" ref={dropDownRef}>
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
