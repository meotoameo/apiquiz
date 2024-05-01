import UserAnswer from "../../model/submission.js";
import Exam from "../../model/exam.js";
import Question from "../../model/question.js";
const ExamController = {
  // CREATE
  createExam: async (req, res) => {
    try {
      const { examName, description, time, deadline, questions } = req.body;

      // Tạo một đối tượng mới cho bài thi với các thông tin như examName, description, time, deadline
      const newExam = new Exam({ examName, description, time, deadline });

      // Nếu có các câu hỏi được gửi kèm theo, tạo các đối tượng câu hỏi từ dữ liệu và thêm chúng vào đối tượng bài thi
      if (questions && questions.length > 0) {
        const questionObjects = await Promise.all(
          questions.map(async (questionData) => {
            // Tạo một đối tượng mới cho câu hỏi từ dữ liệu được gửi
            const question = new Question(questionData);
            // Lưu câu hỏi mới vào cơ sở dữ liệu và trả về đối tượng câu hỏi đã lưu
            return await question.save();
          })
        );
        // Thêm các đối tượng câu hỏi vào mảng questions của đối tượng bài thi
        newExam.questions = questionObjects;
      }

      // Lưu bài thi mới vào cơ sở dữ liệu
      const savedExam = await newExam.save();

      // Trả về kết quả
      res.status(201).json(savedExam);
    } catch (error) {
      console.error("Error creating exam:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // READ
  getAllExam: async (req, res) => {
    try {
      const exams = await Exam.find();
      res.json(exams);
    } catch (error) {
      console.error("Error fetching exams:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // UPDATE
  updateExam: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedExam = await Exam.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedExam);
    } catch (error) {
      console.error("Error updating exam:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // DELETE
  deleteExam: async (req, res) => {
    const { id } = req.params;
    try {
      await Exam.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting exam:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // SEARCH
  searchExam: async (req, res) => {
    try {
      const { keyword } = req.query;

      // Sử dụng biểu thức chính quy để tìm kiếm bài thi có tên hoặc mô tả chứa từ khoá
      const exams = await Exam.find({
        $or: [
          { examName: { $regex: keyword, $options: "i" } }, // Tìm kiếm tên bài thi không phân biệt chữ hoa chữ thường
          { description: { $regex: keyword, $options: "i" } }, // Tìm kiếm mô tả bài thi không phân biệt chữ hoa chữ thường
        ],
      });

      res.json({ exams });
    } catch (error) {
      console.error("Error searching exams:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  getExamById: async (req, res) => {
    try {
      const { id } = req.params;
      const exam = await Exam.findById(id).populate("questions");
      if (!exam) {
        return res
          .status(404)
          .json({ success: false, message: "Exam not found." });
      }
      res.status(200).json({ success: true, exam });
    } catch (error) {
      console.error("Error fetching exam:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  submitExam: async (req, res) => {
    try {
      const { userId, examId, answers } = req.body;

      // Tính điểm số cho bài thi dựa trên câu trả lời của người dùng
      let score = 0;
      for (const answer of answers) {
        const question = await Question.findById(answer.questionId);
        if (question.correctAnswer === answer.selectedOption) {
          score++; // Tăng điểm nếu câu trả lời đúng
        }
      }

      // Lưu thông tin câu trả lời của người dùng và điểm số vào cơ sở dữ liệu
      const userAnswer = new UserAnswer({
        userId,
        examId,
        answers,
        score,
      });
      await userAnswer.save();

      // Trả về phản hồi kèm theo thông tin điểm số
      res.status(200).json({
        success: true,
        message: "Exam submitted successfully.",
        score,
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
};

export default ExamController;
