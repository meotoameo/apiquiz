import express from "express";
import ExamController from "../controllers/examController.js";
import userController from "../controllers/userController.js";
const router = express.Router();

//Exam

router.get("/exam/:id", ExamController.getExamById);
router.post("/exam", ExamController.createExam); // Tạo mới một câu hỏi
router.put("/exam/:id", ExamController.updateExam); // Cập nhật thông tin của một câu hỏi
router.delete("/exam/:id", ExamController.deleteExam); // Xóa một câu hỏi

router.post("/createUser", userController.createUser); // Tạo mới một người dùng
router.get("/getUser", userController.getAllUsers); // Lấy danh sách tất cả người dùng
router.get("/getUser/:id", userController.getUserById); // Lấy thông tin người dùng bằng ID
router.put("/updateUser/:id", userController.updateUserById); // Cập nhật thông tin người dùng bằng ID
router.delete("/deleteUser/:id", userController.deleteUserById); // Xóa người dùng bằng ID
router.get("/user", userController.searchUserByName); 

router.get("/user/:userId/submissions", ExamController.getSubmission);
router.get("/submissions", ExamController.getAllSubmissions);

export default router;
