import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spin from "../utilities/Spin";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "error") {
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/signIn");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 1,
                maxLength: 30,
              })}
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs text-theme">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-theme">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Password"
              {...register("password", { required: true, minLength: 6 })}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-theme">
              This field is required with minimum length 6
            </span>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex justify-center items-center"
          >
            {loading ? <Spin /> : "Sign Up"}
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
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
