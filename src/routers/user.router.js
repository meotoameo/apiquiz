import express from "express";
import { authController } from "../controllers/authController.js";
import ExamController from "../controllers/examController.js";

const router = express.Router();
router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.get("/exam", ExamController.getAllExam); // Lấy danh sách câu hỏi
router.get("/searchExam", ExamController.searchExam);
router.get("/exam/:id", ExamController.getExamById);
router.post("/exam/submit", ExamController.submitExam);
export default router;
