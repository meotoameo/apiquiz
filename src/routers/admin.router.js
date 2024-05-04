import express from "express";
import ExamController from "../controllers/examController.js";
import userController from "../controllers/userController.js";
const router = express.Router();

//Exam
router.post("/exam", ExamController.createExam); // Tạo mới một câu hỏi
router.put("/exam/:id", ExamController.updateExam); // Cập nhật thông tin của một câu hỏi
router.delete("/exam/:id", ExamController.deleteExam); // Xóa một câu hỏi

router.post("/user", userController.createUser); // Tạo mới một người dùng
router.get("/user", userController.getAllUsers); // Lấy danh sách tất cả người dùng
router.get("/user/:id", userController.getUserById); // Lấy thông tin người dùng bằng ID
router.put("/user/:id", userController.updateUserById); // Cập nhật thông tin người dùng bằng ID
router.delete("/user/:id", userController.deleteUserById); // Xóa người dùng bằng ID

router.get("/user/:id/submissions", ExamController.getAllSubmission);
export default router;
