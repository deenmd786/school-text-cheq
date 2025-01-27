import mongoose from "mongoose";

const StudentVideoSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      // required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
      required: true,
    },
    questionNo: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const StudentVideo = mongoose.models.StudentVideo || mongoose.model("StudentVideo", StudentVideoSchema);
export default StudentVideo;
