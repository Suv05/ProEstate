import React, { useState } from "react";
import { FiPhoneCall, FiSend, FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";

const ContactOwner = ({ subject, email }) => {
  const { register, handleSubmit } = useForm();
  const [msg, setMsg] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const onSubmit = (data) => {
    setMsg(data);
  };
  console.log(msg);

  return (
    <div className="mt-8 flex justify-center">
      <button
        className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
        onClick={openDialog}
      >
        <FiPhoneCall className="text-lg" />
        <span>Contact Owner</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg mx-4 sm:mx-auto rounded-lg shadow-lg p-6 relative transform transition-all duration-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeDialog}
            >
              <FiX size={20} />
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message..."
                {...register("message")}
              ></textarea>

              <a
                href={`mailto:${email}?subject=Regarding%20${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(msg.message)}`}
              >
                <button
                  type="submit"
                  className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <FiSend className="mr-2" />
                  <span>Send</span>
                </button>
              </a>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactOwner;
