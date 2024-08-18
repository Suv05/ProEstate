import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

//utilities
import Spin from "../utilities/Spin.jsx";
import Err from "../utilities/Err.jsx";
import OAuth from "../utilities/OAuth.jsx";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    dispatch(signInStart());
    try {
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response status is not 2xx
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signInFailure());
        setErrMsg(errorData.message || "Something went wrong");
        return;
      }

      const data = await res.json();
      dispatch(signInSuccess(data.validUser));
      //console.log(data);

      navigate("/");
    } catch (error) {
      dispatch(signInFailure());
      setErrMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {errMsg && <Err errMsg={errMsg} />}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Email"
            />
            {errors.email && (
              <span className="text-xs text-theme">This field is required</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-1 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#5F0F40]"
              placeholder="Your Password"
            />
            {errors.password && (
              <span className="text-xs text-theme">This field is required</span>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-sec focus:outline-none focus:ring-2 focus:ring-sec transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex justify-center items-center"
          >
            {loading ? <Spin /> : "Sign In"}
          </button>
          <OAuth />
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-2">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
