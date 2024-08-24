import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiUser,
  FiList,
  FiPlusCircle,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";

import Rightarrow from "../utilities/Rightarrow";
import Modal from "./Modal";

function Userprofile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
        {/* Account */}
        <Link
          to={`/account`}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-2 transition-all duration-300 ease-in-out flex items-center justify-between"
        >
          <div className="flex items-center">
            <FiUser className="mr-3 text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out" />
            Account
          </div>
          <Rightarrow />
        </Link>

        {/* View All Listings */}
        <Link
          to={`/yourestate`}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-2 transition-all duration-300 ease-in-out flex items-center justify-between"
        >
          <div className="flex items-center">
            <FiList className="mr-3 text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out" />
            Your ProEstate
          </div>
          <Rightarrow />
        </Link>

        {/* Create Listings */}
        <Link
          to={`/new`}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-2 transition-all duration-300 ease-in-out flex items-center justify-between"
        >
          <div className="flex items-center">
            <FiPlusCircle className="mr-3 text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out" />
            Create Listings
          </div>
          <Rightarrow />
        </Link>

        <hr className="my-2 border-gray-300 dark:border-gray-600" />

        {/* Theme Toggle */}
        <div
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-2 transition-all duration-300 ease-in-out flex items-center justify-between cursor-pointer"
          onClick={toggleTheme}
        >
          <div className="flex items-center">
            {isDarkMode ? (
              <FiSun className="mr-3 text-yellow-500 transition-colors duration-300 ease-in-out" />
            ) : (
              <FiMoon className="mr-3 text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </div>

        {/* Logout */}
        <div
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-2 transition-all duration-300 ease-in-out flex items-center justify-between cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="flex items-center">
            <FiLogOut className="mr-3 text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out" />
            Logout
          </p>
          <Rightarrow />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}

export default Userprofile;
