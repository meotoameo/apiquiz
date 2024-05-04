import User from "../model/user.js";
import { createToken } from "../utils/jwt.js";

export const authController = {
  registerUser: async (req, res) => {
    try {
      // Extract username, email, password, and passwordConfirm from request body
      const { username, email, password, passwordConfirm } = req.body;

      if (!username || !email || !password || !passwordConfirm) {
        return res.status(400).json({
          success: false,
          message:
            "Username, email, password, and password confirmation are required.",
        });
      }

      // Check if password matches passwordConfirm
      if (password !== passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: "Password and password confirmation do not match.",
        });
      }

      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists." });
      }

      // Create a new user instance
      const newUser = new User({ username, email, password });

      // Save the new user to the database
      await newUser.save();

      // Return success response
      res
        .status(200)
        .json({ success: true, message: "Registration successful!" });
    } catch (error) {
      // Handle errors
      console.error("Error registering user:", error);
      res
        .status(502)
        .json({ success: false, message: "Internal server error." });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const getuser = await user.findOne({ username });
      if (!getuser || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required.",
        });
      }

      const token = createToken(user);

      res.status(200).json({ success: true, token });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //   logout: (req, res) => {
  //     req.session.destroy((err) => {
  //       if (err) {
  //         console.error("Error logging out:", err);
  //         return res.status(500).send("Internal Server Error");
  //       }
  //       res.redirect("/login"); // Chuyển hướng người dùng về trang đăng nhập hoặc trang chính
  //     });
  //   },
  // searchUserByName: async (req, res) => {
  //   const { username } = req.params;
  //   const user = await userService.findUserByUsername(username);

  //   if (user) {
  //     return res.status(200).json({
  //       msg: "Username already exists",
  //       isExist: true,
  //     });
  //   }

  //   return res.status(200).json({
  //     msg: "Username available",
  //     isExist: false,
  //   });
  // },
};
