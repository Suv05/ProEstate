import { Link } from "react-router-dom";

function Signbtn({}) {
  return (
    <>
      <div className="flex items-center space-x-4">
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
      </div>
    </>
  );
}

export default Signbtn;
