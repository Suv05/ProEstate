import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="w-full bg-theme text-white py-2 rounded-lg hover:bg-btn focus:outline-none focus:ring-2 focus:ring-btn mt-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            Continue with Google
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signIn" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
