import mongoose from "mongoose";

const { Schema } = mongoose;

const examSubmissionSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam", // Thay 'Exam' bằng tên model của bài thi
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Thay 'User' bằng tên model của người dùng
    required: true,
  },
  answers: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: "Question", // Thay 'Question' bằng tên model của câu hỏi
      },
      selectedOption: String, // Lựa chọn của người dùng cho câu hỏi
    },
  ],
  score: {
    type: Number,
    default: 0, // Điểm số mặc định là 0
  },
  submittedAt: {
    type: Date,
    default: Date.now, // Thời điểm nộp bài mặc định là thời điểm hiện tại
  },
});

const ExamSubmission = mongoose.model("ExamSubmission", examSubmissionSchema);

export default ExamSubmission;
