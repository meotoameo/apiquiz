import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullname: {
    type: String,
    },
    username: {
      type: String,
      required: [true, "Please tell us your username!"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      validate: [
        validator.isStrongPassword,
        "minLength: 8, maxLength: 16,minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1!",
      ],
    },
    // Gender: {
    //   type: String,
    //   enum: ["0,1"], // 0 là nam, 1 là nữ
    // },
    passwordConfirm: {
      type: String,
      minlength: 8,
      maxlength: 16,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not same!",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
