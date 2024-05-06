import mongoose from "mongoose";

const { Schema } = mongoose;

const examSubmissionSchema = new Schema({
  examId: {
    type: Schema.Types.ObjectId,
    ref: "Exam", 
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  answers: [
    {
      question: {
        type: Schema.Types.ObjectId,
        ref: "Question", 
      },
      selectedOption: String, 
    },
  ],
  score: {
    type: Number,
    default: 0, 
  },
  submittedAt: {
    type: Date,
    default: Date.now, 
  },
});

const ExamSubmission = mongoose.model("ExamSubmission", examSubmissionSchema);

export default ExamSubmission;
