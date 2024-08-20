import mongoose from "mongoose";
const { Schema, model } = mongoose;


import User from "./user.model";

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // trims whitespace
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.regularPrice;
        },
        message: "Discount price should be less than the regular price",
      },
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["house", "apartment", "condo", "studio"], // specify allowed values
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: [arrayLimit, "At least one image is required"],
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented", "pending"],
      default: "available",
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

const Listings = model("Listing", listingSchema);
export default Listings;
