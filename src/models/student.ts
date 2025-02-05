import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, "Please provide student name"],
  },
  class: {
    type: String,
    required: [true, "Please provide class"],
  },
  section: {
    type: String,
    required: [true, "Please provide section"],
  },
  rollNo: {
    type: String,
    required: [true, "Please provide roll number"],
  },
  schoolCode: {
    type: String,
    required: [true, "Please provide school code"],
  },
  schoolName: {
    type: String,
    required: [true, "Please provide school name"],
  },
  parentPhoneNo: {
    type: String,
    required: [true, "Please provide parent phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true, // Ensure email is unique
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
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;