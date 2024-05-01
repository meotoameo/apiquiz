import express from "express";
import ExamController from "../controllers/user/examController.js";
const router = express.Router();

// Định nghĩa các endpoint API cho trang Home
// router.post("/exam", ExamController.createExam); // Tạo mới một câu hỏi
// router.put("/exam/:id", ExamController.updateExam); // Cập nhật thông tin của một câu hỏi
// router.delete("/exam/:id", ExamController.deleteExam); // Xóa một câu hỏi
export default router;
