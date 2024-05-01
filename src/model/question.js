import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  options: {
    optionA: { type: String, default: "" },
    optionB: { type: String, default: "" },
    optionC: { type: String, default: "" },
    optionD: { type: String, default: "" },
  },
  correctAnswer: {
    type: String,
    enum: ["optionA", "optionB", "optionC", "optionD", ""], // Thêm chuỗi rỗng vào enum để cho phép trường correctAnswer có thể là rỗng
    required: true,
    default: "", // Đặt giá trị mặc định cho trường correctAnswer là rỗng
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
