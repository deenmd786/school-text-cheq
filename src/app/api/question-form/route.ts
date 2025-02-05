import { dbConnect } from "@/lib/dbConnect";
import Questions from "@/models/quetons";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { class: className, subject, chapter, questions } = await req.json(); // Renamed 'class' to 'className' to avoid conflict

    // Validate required fields
    if (!className || !subject || !chapter || !questions) {
      return NextResponse.json({ error: "All fields are required" , success: false }, { status: 400 }); // Fixed missing comma
    }

    // Create a new question document
    const newQuestion = await Questions.create({
      class: className,
      subject,
      chapter,
      questions, // Assuming questions is an array of strings
    });

    return NextResponse.json({ message: "Questions uploaded successfully", question: newQuestion, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error uploading questions:", error); // Log the error for debugging
    return NextResponse.json({ error: "Something went wrong", success: false  }, { status: 500 });
  }
}