import jwt from "jsonwebtoken";

const createToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    useremail: user.email,
    // Các thông tin khác của người dùng có thể được thêm vào payload
  };

  // Tạo JWT và ký nó bằng khóa bí mật
  return jwt.sign(payload, "your_secret_key", { expiresIn: "1D" });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "your_secret_key", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export { createToken, verifyToken };
