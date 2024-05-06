import Exam from "../model/exam.js";
import ExamSubmission from "../model/submission.js";
const ExamController = {
  // CREATE
  createExam: async (req, res) => {
    try {
      const { examName, description, time, deadline, questions } = req.body;
  
      // Tạo một đối tượng mới cho bài thi với các thông tin như examName, description, time, deadline
      const newExam = new Exam({ examName, description, time, deadline });
  
      // Nếu có các câu hỏi được gửi kèm theo, thêm chúng vào đối tượng bài thi
      if (questions && questions.length > 0) {
        newExam.questions = questions; // Thêm các câu hỏi vào mảng questions của đối tượng bài thi
      }
  
      // Lưu bài thi mới vào cơ sở dữ liệu
      const savedExam = await newExam.save();
  
      // Trả về kết quả
      res.status(201).json({ message: "create success", exam: savedExam });

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
    const { examName, description, time, deadline, questions } = req.body;

    // Tìm bài thi cần cập nhật trong cơ sở dữ liệu
    const existingExam = await Exam.findById(id);

    if (!existingExam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Cập nhật thông tin bài thi nếu được cung cấp
    if (examName) existingExam.examName = examName;
    if (description) existingExam.description = description;
    if (time) existingExam.time = time;
    if (deadline) existingExam.deadline = deadline;
    if (questions) existingExam.questions = questions;

    // Lưu thông tin bài thi đã cập nhật vào cơ sở dữ liệu
    const updatedExam = await existingExam.save();

    // Trả về kết quả
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
      res.status(204).json({ message: "Exam deleted successfully" });
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
      if (!userId || !examId || !answers) {
        return res.status(400).json({ error: "Missing required fields" });
    }
      // Tính điểm số cho bài thi dựa trên câu trả lời của người dùng
      let correctAnswers = 0;
      for (const answer of answers) {
        const question = await Question.findById(answer.questionId);
        if (question.correctAnswer === answer.selectedOption) {
          correctAnswers++; 
        }
      }
      const totalQuestions = answers.length;
      const score = (correctAnswers / totalQuestions) * 10;
      
      const newExamSubmission  = new ExamSubmission({
        userId,
        examId,
        answers,
        score: parseFloat(score.toFixed(1)),
      });
      console.log(newExamSubmission);
      await newExamSubmission.save();

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
  getSubmission: async (req, res, next) => {
    try {
      const { userId } = req.params;

      // Lấy tất cả các bài nộp của người dùng từ cơ sở dữ liệu
      const submissions = await ExamSubmission.find({ user: userId });

      // Trả về danh sách các bài nộp của người dùng
      res.status(200).json({ submissions });
    } catch (error) {
      console.error("Error fetching user submissions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllSubmissions: async (req, res) => {
    try {
      const submissions = await ExamSubmission.find();
      res.status(200).json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  fillterExam: async(req,res) => {
    try {
      // Lấy trạng thái từ tham số truy vấn (query parameter)
      const { status } = req.query;
  
      // Kiểm tra xem tham số trạng thái có tồn tại không
      if (!status) {
        return res.status(400).json({ error: "Missing status parameter" });
      }
  
      // Kiểm tra xem giá trị của tham số trạng thái có hợp lệ không
      if (status !== "on" && status !== "off") {
        return res.status(400).json({ error: "Invalid status value" });
      }
  
      // Sử dụng phương thức find với điều kiện là status
      const exams = await Exam.find({ status });
  
      res.status(200).json(exams);
    } catch (error) {
      console.error("Error filtering exams by status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  ,
  scoreDistributionExam: async (req, res, next) => {
    try {
      const { examId } = req.params;

      // Lấy danh sách tất cả các bài nộp của sinh viên trong bài thi
      const submissions = await ExamSubmission.find({ exam: examId });

      // Khởi tạo đối tượng để lưu phổ điểm
      const scoreDistribution = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
      };

      // Đếm số lượng sinh viên đạt từng mức điểm
      submissions.forEach((submission) => {
        const score = Math.round(submission.score); // Làm tròn điểm
        if (score >= 1 && score <= 10) {
          scoreDistribution[score.toString()]++;
        }
      });

      // Trả về kết quả phổ điểm
      res.status(200).json({ scoreDistribution });
    } catch (error) {
      console.error("Error calculating score distribution:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default ExamController;
