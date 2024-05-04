import User from "../model/user";

const checkAdmin = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Kiểm tra xem người dùng có tồn tại trong decodedToken không
    if (!decodedToken.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Lấy thông tin người dùng từ decodedToken
    const { user } = decodedToken;

    // Tìm người dùng trong database bằng ID
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Kiểm tra vai trò của người dùng
    if (foundUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: admin role is not allowed" });
    }

    // Gắn thông tin người dùng vào req để sử dụng trong các xử lý tiếp theo
    req.user = foundUser;

    // Tiếp tục xử lý yêu cầu
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const checkUser = (req, res, next) => {};

export { checkUser, checkAdmin };
