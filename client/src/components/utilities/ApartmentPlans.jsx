import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

const ApartmentPlans = () => {
  const [activeTab, setActiveTab] = useState("Deluxe Portion");
  const { isDarkMode } = useTheme();

  const tabs = ["The Studio", "Deluxe Portion", "Penthouse", "Double Height"];

  return (
    <div className={`${isDarkMode ? "bg-[#222222]" : "bg-gray-50"} py-8`}>
      <h2
        className={`text-3xl md:text-3xl font-semibold text-center mb-4 ${
          isDarkMode ? "text-white" : "text-[#222222]"
        } `}
      >
        Apartment <span className="text-theme">Plans</span>
      </h2>
      <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm md:text-lg font-medium px-2 md:px-4 py-1 md:py-2 ${
              activeTab === tab
                ? "text-theme border-b-2 border-theme"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center bg-white p-4 md:p-8 rounded-lg shadow-lg">
        {activeTab === "Deluxe Portion" && (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="bg-rose-500 text-white p-4 md:p-6 rounded-l-lg md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 underline">
                Deluxe Portion
              </h3>
              <p className="mb-2 md:mb-4 text-sm md:text-base">
                Boasting chic interiors, three private balconies and a
                remarkable terrace, this deluxe bedroom and en suite will
                epitomize simple luxury. Not only will residents benefit from a
                superb location in the heart of Summerhill, but they will also
                enjoy unrivaled facilities and a 24-hour bespoke concierge.
              </p>
              <ul className="text-sm md:text-base">
                <li>
                  Total Area .................................. 2800 Sq. Ft.
                </li>
                <li>
                  Bedroom .................................... 2800 Sq. Ft.
                </li>
                <li>
                  Bathroom .................................. 2800 Sq. Ft.
                </li>
                <li>Smoking/pets ............................. 2800 Sq. Ft.</li>
                <li>
                  Lounge ...................................... 2800 Sq. Ft.
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <img
                src="https://i.pinimg.com/736x/29/f1/88/29f1889a365668d4a5c65e8752cdc8d5.jpg"
                alt="Floor Plan"
                className="rounded-lg w-full h-auto"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        {activeTab === "The Studio" && (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="bg-rose-500 text-white p-4 md:p-6 rounded-l-lg md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 underline">
                The Studio
              </h3>
              <p className="mb-2 md:mb-4 text-sm md:text-base">
                Boasting chic interiors, three private balconies and a
                remarkable terrace, this deluxe bedroom and en suite will
                epitomize simple luxury. Not only will residents benefit from a
                superb location in the heart of Summerhill, but they will also
                enjoy unrivaled facilities and a 24-hour bespoke concierge.
              </p>
              <ul className="text-sm md:text-base">
                <li>
                  Total Area .................................. 3200 Sq. Ft.
                </li>
                <li>
                  Bedroom .................................... 3200 Sq. Ft.
                </li>
                <li>
                  Bathroom .................................. 3200 Sq. Ft.
                </li>
                <li>Smoking/pets ............................. 3200 Sq. Ft.</li>
                <li>
                  Lounge ...................................... 3200 Sq. Ft.
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <img
                src="https://i.pinimg.com/736x/5e/d0/62/5ed06250b1f5e6bdc17379bb6c90bf7b.jpg"
                alt="Floor Plan"
                className="rounded-lg w-full h-auto"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        {activeTab === "Penthouse" && (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="bg-rose-500 text-white p-4 md:p-6 rounded-l-lg md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 underline">
                Penthouse
              </h3>
              <p className="mb-2 md:mb-4 text-sm md:text-base">
                Boasting chic interiors, three private balconies and a
                remarkable terrace, this deluxe bedroom and en suite will
                epitomize simple luxury. Not only will residents benefit from a
                superb location in the heart of Summerhill, but they will also
                enjoy unrivaled facilities and a 24-hour bespoke concierge.
              </p>
              <ul className="text-sm md:text-base">
                <li>
                  Total Area .................................. 4800 Sq. Ft.
                </li>
                <li>
                  Bedroom .................................... 4800 Sq. Ft.
                </li>
                <li>
                  Bathroom .................................. 4800 Sq. Ft.
                </li>
                <li>Smoking/pets ............................. 4800 Sq. Ft.</li>
                <li>
                  Lounge ......................................4800 Sq. Ft.
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <img
                src="https://cdn.houseplansservices.com/content/qr3jud20us6emqvgeieb06jn2g/w575.jpg?v=9"
                alt="Floor Plan"
                className="rounded-lg w-full h-auto"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        {activeTab === "Double Height" && (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="bg-rose-500 text-white p-4 md:p-6 rounded-l-lg md:w-1/2">
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 underline">
                Double Height
              </h3>
              <p className="mb-2 md:mb-4 text-sm md:text-base">
                Boasting chic interiors, three private balconies and a
                remarkable terrace, this deluxe bedroom and en suite will
                epitomize simple luxury. Not only will residents benefit from a
                superb location in the heart of Summerhill, but they will also
                enjoy unrivaled facilities and a 24-hour bespoke concierge.
              </p>
              <ul className="text-sm md:text-base">
                <li>
                  Total Area .................................. 5600 Sq. Ft.
                </li>
                <li>
                  Bedroom .................................... 5600 Sq. Ft.
                </li>
                <li>
                  Bathroom .................................. 5600 Sq. Ft.
                </li>
                <li>Smoking/pets ............................. 5600 Sq. Ft.</li>
                <li>
                  Lounge ...................................... 5600 Sq. Ft.
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <img
                src="https://i.pinimg.com/736x/d1/15/f9/d115f9e49e7d0d50b9f735af7f1c5ea5.jpg"
                alt="Floor Plan"
                className="rounded-lg w-full h-auto"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentPlans;
