import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaRedditAlien,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">
              Pro<span className="text-theme underline">Estate</span>
            </h2>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect property.
            </p>
            <p className="text-gray-400 mt-2">
              © 2024 ProEstate, Inc. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to={`/`} className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
            <div className="flex space-x-4 mb-6">
              <Link
                to="https://x.com"
                className="text-gray-400 hover:text-white"
              >
                <FaXTwitter className="w-6 h-6" size={20} />
              </Link>

              <Link
                to="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF className="w-6 h-6" size={20} />
              </Link>

              <Link
                to="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="w-6 h-6" size={20} />
              </Link>

              <Link
                to="https://reddit.com"
                className="text-gray-400 hover:text-white"
              >
                <FaRedditAlien className="w-6 h-6" size={20} />
              </Link>
            </div>{" "}
            <h2 className="text-xl font-bold mb-4">Newsletter</h2>
            <form className="flex">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-l-md bg-gray-700 text-white focus:outline-none"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-sec"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
