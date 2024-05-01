import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
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

export default mongoose.model("user", userSchema);
