import { User } from "../models/userModel.js";

// Create User API
export const userCreate = async (req, res) => {
  try {
    const { fullname, username, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    // Create and save the user
    const user = new User({ fullname, username, email });
    const savedUser = await user.save();
    res.status(200).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Single User Details API
export const singleUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User API
export const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { fullname, username } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.username = username || user.username;
    user.fullname = fullname || user.fullname;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
