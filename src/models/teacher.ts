import mongoose from "mongoose";

// Teacher schema
const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: [true, "Please provide teacher name"],
  },
  subjects: {
    type: String,
    required: [true, "Please provide subjects taught"],
  },
  schoolName: {
    type: String,
    required: [true, "Please provide school name"],
  },
  schoolCode: {
    type: String,
    required: [true, "Please provide school code"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true, // Ensure email is unique
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  profilePic: {
    type: String,
    required: [true, "Please provide profile picture"],
  },
}, { timestamps: true });

// Use the existing model or create a new one
const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;