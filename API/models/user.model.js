import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "This feild can't be empty"],
      trim: true,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    email: {
      type: String,
      minLength: 10,
      required: [true, "Please provide your email"],
      lowercase: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid email addrese",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true,
    },
  },
  { timestamps: true }
);

//hashed password before saving it to the databased
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model("User", userSchema);
export default User;
