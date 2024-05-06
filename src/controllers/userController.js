import User from "../model/user.js";

const userController = {
  // Create a new user
  createUser: async (req,res,next) => {
    try {
      const { fullname, username, email,role, password } = req.body;
      const newUser = new User({ fullname,username, email,role , password });
      const savedUser = await newUser.save();
      res.status(201).json({message:"sucess"});
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get all users
  getAllUsers: async (req,res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },

  searchUserByName: async (req, res) => {
    try {
      const { username } = req.query;
      const filteredUsers = await User.find({ username: { $regex: new RegExp(username, "i") } });
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error filtering users by name:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update user by ID
  updateUserById: async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json({message:"sucess"});
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Delete user by ID
  deleteUserById: async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(204).json({message:"sucess"});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
