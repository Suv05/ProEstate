import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Progress from "../utilities/Progress.jsx";
import Success from "../utilities/Success.jsx";
import Err from "../utilities/Err.jsx";
import Spin from "../utilities/Spin.jsx";
import { classNames } from "../functions/classNames.js";

//icons
import { GiBathtub } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FiType, FiAlignLeft, FiMapPin, FiHome } from "react-icons/fi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";

function CreateListings() {
  const { currUser } = useSelector((state) => state.user);
  const lastUpdate = useRef(0);
  const navigate = useNavigate();
  const [filePrec, setFilePrec] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //handel the image upload logic
  const handleFileUpload = async (event) => {
    setImgLoading(true);
    const files = event.target.files;
    if (files.length > 6) {
      alert("you can only upload maximum of six images");
      return;
    }

    const uploadPromises = [];
    for (const file of files) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      //upload to firebase
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadPromises.push(
        new Promise((resolve, reject) => {
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
              reject(error); // Handle upload errors
              setImgLoading(false);
            },
            async () => {
              try {
                const downloadUrl = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                resolve(downloadUrl); // Resolve with download URL
              } catch (err) {
                reject(err);
                setImgLoading(false);
              }
            }
          );
        })
      );
    }

    try {
      const imgUrls = await Promise.all(uploadPromises); // Get all download URLs
      setSelectedImages(imgUrls); // Update selectedImages with the URLs

      // Update imageUrls in React Hook Form with the new URLs directly
      setValue("imageUrls", imgUrls, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setImgLoading(false);
      setShowSuccess(true);

      // Automatically hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Upload error:", error);
      setImgLoading(false);
    }
  };

  //handel remove image from preview
  const handleRemoveImage = (getindex) => {
    const updatedImg = selectedImages.filter((_, index) => index !== getindex);

    // Update the state
    setSelectedImages(updatedImg);
    setValue("imageUrls", updatedImg, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      if (!formData.imageUrls.length) {
        setErrMsg("At least one image required");
        return;
      }
      const res = await fetch(`/api/v1/user/${currUser._id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currUser._id }),
      });

      // Check if the response status is not 2xx
      if (!res.ok) {
        const errorData = await res.json();
        setErrMsg(errorData.message || "Something went wrong");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setLoading(false);
      navigate(`/yourestate`);
    } catch (err) {
      setErrMsg("An error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg my-6 font-sans">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Create Prop<span className="text-theme">erty Listing</span>
      </h2>
      {errMsg && <Err errMsg={errMsg} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Title
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FiType />
            </span>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.title ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter the catchy title for your property"
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Description
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">
              <FiAlignLeft />
            </span>
            <textarea
              id="description"
              rows="5"
              {...register("description", {
                required: "Description is required",
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 pt-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200 resize-none",
                errors.description ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Describe your property in detail"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* Location */}
        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Location
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FiMapPin />
            </span>
            <input
              id="location"
              type="text"
              {...register("location", { required: "Location is required" })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.location ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Where is your property located?"
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
        {/* Regular Price */}
        <div className="flex flex-col">
          <label
            htmlFor="regularPrice"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Regular Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              id="regularPrice"
              type="number"
              {...register("regularPrice", {
                required: "Regular price is required",
                min: { value: 0, message: "Price must be positive" },
                valueAsNumber: true,
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.regularPrice ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter the regular price of the property"
            />
          </div>
          {errors.regularPrice && (
            <p className="text-red-500 text-xs mt-1">
              {errors.regularPrice.message}
            </p>
          )}
        </div>
        {/* Discount Price */}
        <div className="flex flex-col">
          <label
            htmlFor="discountPrice"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Discount Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              id="discountPrice"
              type="number"
              {...register("discountPrice", {
                validate: (value) => {
                  const regularPrice = parseFloat(getValues("regularPrice"));
                  const discountPrice = parseFloat(value);
                  if (discountPrice < 0) {
                    return "Discount price cannot be negative";
                  }
                  if (discountPrice >= regularPrice) {
                    return "Discount price should be less than the regular price";
                  }
                  return true;
                },
                valueAsNumber: true,
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.discountPrice ? "border-red-500" : "border-gray-300"
              )}
              placeholder="Enter the discounted price, if any"
            />
          </div>
          {errors.discountPrice && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discountPrice.message}
            </p>
          )}
        </div>
        {/* Bathrooms */}
        <div className="flex flex-col">
          <label
            htmlFor="bathrooms"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Bathrooms
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <GiBathtub />
            </span>
            <input
              id="bathrooms"
              type="number"
              {...register("bathrooms", {
                required: "Number of bathrooms is required",
                min: { value: 0, message: "Number must be positive" },
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.bathrooms ? "border-red-500" : "border-gray-300"
              )}
              placeholder="How many bathrooms are there?"
            />
          </div>
          {errors.bathrooms && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bathrooms.message}
            </p>
          )}
        </div>
        {/* Bedrooms */}
        <div className="flex flex-col">
          <label
            htmlFor="bedrooms"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Bedrooms
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaBed />
            </span>
            <input
              id="bedrooms"
              type="number"
              {...register("bedrooms", {
                required: "Number of bedrooms is required",
                min: { value: 0, message: "Number must be positive" },
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.bathrooms ? "border-red-500" : "border-gray-300"
              )}
              placeholder="How many bedrooms does it have?"
            />
          </div>
          {errors.bedrooms && (
            <p className="text-red-500 text-xs mt-1">
              {errors.bedrooms.message}
            </p>
          )}
        </div>
        {/* Category */}
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="text-base font-semibold text-gray-600 mb-1"
          >
            Property Category
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FiHome />
            </span>
            <select
              id="category"
              {...register("category", {
                required: "Category is required",
              })}
              className={classNames(
                "w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F0F40] transition-all duration-200",
                errors.category ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="studio">Studio</option>
            </select>
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="flex items-center col-span-1 md:col-span-2 relative space-x-4">
          <input
            id="imageUrls"
            type="file"
            {...register("imageUrls")}
            className="hidden" // Hide default input
            multiple
            accept="image/*" // Accept only image files
            onChange={handleFileUpload}
          />
          <label
            htmlFor="imageUrls"
            className="text-lg font-semibold text-gray-800"
          >
            Property Images{" "}
            <span className="text-sm text-gray-500">
              (Max 6 images allowed)
            </span>
          </label>
          <button
            type="button"
            className="py-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => document.getElementById("imageUrls").click()}
          >
            {imgLoading ? <Spin /> : "Upload"}
          </button>
        </div>

        {/* Progress bar */}
        <Progress filePrec={filePrec} className="mt-4" />

        {/* Messages and Image Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Success Message */}
          {showSuccess && (
            <div className="col-span-1 md:col-span-2">
              <Success successMsg={"Image uploaded successfully"} />
            </div>
          )}

          {/* Image Preview */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {selectedImages?.length > 0 &&
              selectedImages.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={imgUrl}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <button
                      className="text-white bg-red-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transform transition-transform hover:scale-105"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Feature Checkbox */}
        <div className="grid grid-cols-2 gap-4">
          {/* Parking */}
          <div className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <input
              id="parking"
              type="checkbox"
              {...register("parking")}
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="parking"
              className="text-base font-semibold text-gray-800"
            >
              Parking
            </label>
          </div>

          {/* Furnished */}
          <div className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <input
              id="furnished"
              type="checkbox"
              {...register("furnished")}
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="furnished"
              className="text-base font-semibold text-gray-800"
            >
              Furnished
            </label>
          </div>

          {/* Special Offer */}
          <div className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <input
              id="offer"
              type="checkbox"
              {...register("offer")}
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="offer"
              className="text-base font-semibold text-gray-800"
            >
              Special Offer
            </label>
          </div>

          {/* Pets Allowed */}
          <div className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <input
              id="petsAllowed"
              type="checkbox"
              {...register("petsAllowed")}
              className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
            />
            <label
              htmlFor="petsAllowed"
              className="text-base font-semibold text-gray-800"
            >
              Pets Allowed
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
          >
            {loading ? <Spin /> : "Submit Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateListings;
