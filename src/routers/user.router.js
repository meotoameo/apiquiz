import express from "express";
import { userController } from "../controllers/user/userController.js";
import ExamController from "../controllers/user/examController.js";

const router = express.Router();
router.post("/login", userController.login);
router.post("/register", userController.registerUser);
router.get("/exam", ExamController.getAllExam); // Lấy danh sách câu hỏi
router.get("/searchExam", ExamController.searchExam);
router.get("/exam/:id", ExamController.getExamById);
router.post("/exam/submit", ExamController.submitExam);
export default router;
