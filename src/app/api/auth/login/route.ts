import { dbConnect } from "@/lib/dbConnect"; // Ensure this path is correct
import Teacher from "@/models/teacher"; // Ensure this path is correct
import Student from "@/models/student"; // Ensure this path is correct
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Deens_secret_token_key";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check in Teacher model
    let user = await Teacher.findOne({ email });
    if (!user) {
      // If not found, check in Student model
      user = await Student.findOne({ email });
    }

    // If user is still not found, return an error
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "Login successful", user: { role: user.role } },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60, // 1 hour
      path: "/", // Cookie is accessible on the entire site
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return NextResponse.json({ message: "Login successful", token, user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
