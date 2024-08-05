import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  console.log(req.body); // Debug: Log the request body

  const { username, email, password } = req.body;

  try {
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user with the hashed password
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    next(error);
  }
};
