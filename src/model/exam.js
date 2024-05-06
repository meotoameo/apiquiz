import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

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
    status: {
      type: String,
      enum: ["off", "on"],
      default:"on"
    },
    timestart: {
      type: Date,
    },
    questions: [questionSchema], // Sử dụng schema của câu hỏi trong mảng
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
