import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currUser } = useSelector((state) => state.user);
  console.log("current user: ", currUser);


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

        {/* Sign Up and Login buttons */}
        <div className="flex items-center space-x-4">
          {currUser ? (
            <Link to="account">
              <div className="relative w-11 h-11">
                <img
                  src={currUser.avtar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-primary hover:border-sec"
                />
              </div>
            </Link>
          ) : (
            <>
              <Link to="signin">
                <button className="border-1 border-btn text-btn hover:bg-btn hover:text-white px-4 py-2 rounded-md active:scale-75 hover:scale-105">
                  Login
                </button>
              </Link>
              <Link to="signup">
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-sec active:scale-75 hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
