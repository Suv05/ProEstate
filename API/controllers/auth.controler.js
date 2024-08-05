import User from "../models/user.model.js";

export const signup = async (req, res) => {
  console.log(req.body); // Debug: Log the request body

  
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
