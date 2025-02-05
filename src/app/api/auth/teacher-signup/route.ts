import { dbConnect } from "@/lib/dbConnect"; // Ensure this path is correct
import Teacher from "@/models/teacher"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { teacherName, subjects, schoolName, schoolCode, email, password, phone, profilePic } = await req.json();

    // Validate input
    if (!teacherName || !subjects || !schoolName || !schoolCode || !email || !password || !phone || !profilePic) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser  = await Teacher.findOne({ email });
    if (existingUser ) {
      return NextResponse.json({ message: "User  already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    // Create new teacher
    const newTeacher = new Teacher({
      teacherName,
      subjects,
      schoolName,
      schoolCode,
      email,
      phone,
      password: hashedPassword,
      profilePic,
    });

    await newTeacher.save();

    // Exclude password from the response
    const userWithoutPassword = newTeacher.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({ message: "Signup successful", user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Error during signup:", error); // Log the error for debugging
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}