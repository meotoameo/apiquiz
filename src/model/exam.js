import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    // Nhúng schema của câu hỏi vào trong schema của bài thi
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // Thay 'Question' bằng tên model câu hỏi của bạn
      },
    ],
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
