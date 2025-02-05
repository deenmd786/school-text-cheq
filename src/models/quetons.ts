import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema({
  
  class: {
    type: String,
    required: [true, "Please provide class"],
  },
  subject: {
    type: String,
    required: [true, "Please provide subject"],
  },
  chapter: {
    type: String,
    required: [true, "Please provide chapter"],
  },
  questions: {
    type: [String],
    required: [true, "Please provide questions"],
  },
}, { timestamps: true });

const Questions = mongoose.models.Questions || mongoose.model("Questions", questionsSchema);

export default Questions;