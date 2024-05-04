import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const createToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    useremail: user.email,
    // Các thông tin khác của người dùng có thể được thêm vào payload
  };

  // Tạo JWT và ký nó bằng khóa bí mật
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1D" });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export { createToken, verifyToken };
