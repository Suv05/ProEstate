import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

//firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";

//userSlice methods
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

//utilites
import Err from "../utilities/Err.jsx";
import Spin from "../utilities/Spin.jsx";
import Success from "../utilities/Success.jsx";
import Progress from "../utilities/Progress.jsx";

function Account({}) {
  const { currUser, loading } = useSelector((state) => state.user);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currUser.name,
      email: currUser.email,
    },
  });

  const [avtar, setAvtar] = useState(currUser.avtar);
  const [filePrec, setFilePrec] = useState(0);
  const lastUpdate = useRef(0);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const storage = getStorage(app); // get storage from firebase
      const fileName = new Date().getTime() + file.name; // unique file name
      const storageRef = ref(storage, fileName);

      // Upload the file to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitor the progress of the upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // Throttle the updates to improve UI rendering
          const now = Date.now();
          if (now - lastUpdate.current > 50) {
            // Update every 50ms
            setFilePrec(Math.floor(progress));
            lastUpdate.current = now;
          }
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          // Get the download URL when the upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setAvtar(downloadUrl);
            dispatch(updateSuccess({ ...currUser, avtar: downloadUrl }));
            setFilePrec(0); // Reset progress after complete
          });
        }
      );
    }
  };

  const onSubmit = async (data) => {
    // Handle form submission for updating user data
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/v1/user/${currUser._id}/account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          avtar: currUser.avtar,
        }),
      });

      // Check if the response status is not 2xx
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(updateFailure());
        setErrMsg(errorData.message || "Something went wrong");
        return;
      }

      const result = await res.json();
      setSuccessMsg(result.msg);
      dispatch(updateSuccess(result.updateUser));
    } catch (err) {
      dispatch(updateFailure());
      setErrMsg("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white boxShadow rounded-lg font-sans">
        {successMsg && <Success successMsg={successMsg} />}
        {errMsg && <Err errMsg={errMsg} />}
        {/* <!-- Header --> */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <img
              src={avtar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
            />
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
              </svg>
              <input
                id="avatar"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Hello👋🏻,{currUser.name}
            </h2>
            <p className="text-gray-500">{currUser.userName}</p>
          </div>
        </div>
        {/* Progress Bar */}
        <Progress filePrec={filePrec} />
        {/* <!-- Form --> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* <!-- Name --> */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            {currUser && (
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* <!-- Email --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            {currUser && (
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* <!-- Username (Read-Only) --> */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={currUser.userName}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm sm:text-sm"
            />
          </div>

          {/* <!-- Save Button --> */}
          <div className="pt-5">
            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? <Spin /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Account;
