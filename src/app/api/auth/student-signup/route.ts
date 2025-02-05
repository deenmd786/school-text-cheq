import { dbConnect } from "@/lib/dbConnect"; // Ensure this path is correct
import Student from "@/models/student"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Destructure the request body
    const { 
      studentName, 
      class: studentClass, 
      section, 
      rollNo, 
      schoolCode, 
      schoolName, 
      parentPhoneNo, 
      email, 
      password,
      profilePic 
    } = await req.json();

    // Validate input
    if (!studentName || !studentClass || !section || !rollNo || !schoolCode || !schoolName || !parentPhoneNo || !email || !password || !profilePic) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser   = await Student.findOne({ email });
    if (existingUser  ) {
      return NextResponse.json({ message: "User  already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      studentName,
      class: studentClass,
      section,
      rollNo,
      schoolCode,
      schoolName,
      parentPhoneNo,
      email,
      password: hashedPassword,
      profilePic,
    });

    // Save the new student to the database
    await newStudent.save();

    // Exclude password from the response
    const userWithoutPassword = newStudent.toObject();
    delete userWithoutPassword.password;
    return NextResponse.json({ message: "Signup successful", user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}