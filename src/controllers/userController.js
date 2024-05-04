import User from "../model/user";

const userController = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Update user by ID
  updateUserById: async (userId, updatedUserData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedUserData,
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  // Delete user by ID
  deleteUserById: async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  },
};

export default userController;
