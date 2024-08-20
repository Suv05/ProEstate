import { FiX } from "react-icons/fi";
import { useRef, useEffect } from "react";
import { persistor } from "../redux/store.js";
import { useNavigate } from "react-router-dom";

function Modal({ onClose, isOpen }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.classList.add("animate-fadeIn");
        modalRef.current.classList.remove("animate-fadeOut");
      } else {
        modalRef.current.classList.add("animate-fadeOut");
        const timeout = setTimeout(() => {
          if (modalRef.current) {
            modalRef.current.classList.remove("animate-fadeOut");
          }
        }, 300); // Match the duration of the fadeOut animation
        return () => clearTimeout(timeout);
      }
    }
  }, [isOpen]);

  const handelOnYes = () => {
    persistor.purge().then(() => {
      // After purging, you can perform any other actions needed, like redirecting the user or clearing user state
      console.log("Persisted state has been purged.");
      onClose(); // Close the modal after purging
      navigate("/signin");
    });
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div
            ref={modalRef}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm mx-4 md:mx-0 transition-transform transform scale-100 md:scale-95"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>
            <div className="p-8 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                  onClick={handelOnYes}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
