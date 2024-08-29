import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

function Accordian() {
  const data = [
    {
      title: "What is the first step of dream house buying process?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore neque error quidem! Consectetur perferendis eum exercitationem quaerat recusandae unde? Accusantium omnis unde soluta reprehenderit eum",
    },
    {
      title: "How long does it take to buy a house?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore neque error quidem! Consectetur perferendis eum exercitationem quaerat recusandae unde? Accusantium omnis unde soluta reprehenderit eum",
    },
    {
      title: "How much do I need for a down payment?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore neque error quidem! Consectetur perferendis eum exercitationem quaerat recusandae unde? Accusantium omnis unde soluta reprehenderit eum",
    },
    {
      title: "What is a buyer's market?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore neque error quidem! Consectetur perferendis eum exercitationem quaerat recusandae unde? Accusantium omnis unde soluta reprehenderit eum",
    },
    {
      title: "What type of house is popular among the people?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore neque error quidem! Consectetur perferendis eum exercitationem quaerat recusandae unde? Accusantium omnis unde soluta reprehenderit eum",
    },
  ];

  // Track open state for each accordion item
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordian = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if the same item is clicked
    } else {
      setOpenIndex(index); // Open the clicked item
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-[#222222] text-center px-4 py-2 mt-3 ">
        Frequently <span className="text-theme">Asked Questions</span>
      </h1>
      <div className="flex flex-col px-5 mt-3 mb-6">
        {data.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between py-4 shadow-lg items-center px-2 border border-t-gray-200 rounded-lg"
            >
              <h1 className="text-lg text-[#222222] font-semibold">
                {item.title}
              </h1>
              <span
                className="cursor-pointer"
                onClick={() => toggleAccordian(index)}
              >
                {openIndex === index ? (
                  <FiMinus size={25} className="text-blue-500" />
                ) : (
                  <FiPlus size={25} className="text-blue-500" />
                )}
              </span>
            </div>
            <div
              className={`px-2 py-2 shadow-lg rounded-xl border border-t-gray-100 mt-1 text-[#363636] ${
                openIndex === index ? "" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Accordian;
