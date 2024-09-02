import mongoose from "mongoose";
const { Schema, model } = mongoose;

const favoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  { timestamps: true }
);

const Favorite = model("Favorite", favoriteSchema);

export default Favorite;
