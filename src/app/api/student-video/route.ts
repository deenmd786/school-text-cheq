import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import StudentVideo from "@/models/StudentVideo";

// Connect to MongoDB

interface Filter {
    subject?: string;
    chapter?: string;
    questionNo?: number;
}

/** ===========================
 * POST - Upload Student Video
 * =========================== */
export async function POST(req: NextRequest) {
    await dbConnect();
  try {
    const { studentId, subject, chapter, questionNo, videoUrl } = await req.json();
    console.log("videoUrl", videoUrl);
    

    if ( !subject || !chapter || !questionNo || !videoUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newVideo = await StudentVideo.create({
      studentId,
      subject,
      chapter,
      questionNo,
      videoUrl,
    });

    return NextResponse.json({ message: "Video uploaded successfully", video: newVideo }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        
    }
  }
}

/** ===========================
 * GET - Fetch Videos for Review (Teacher)
 * =========================== */
export async function GET(req: NextRequest) {
    await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");
    const chapter = searchParams.get("chapter");
    const questionNo = searchParams.get("questionNo");

    
    const filter: Filter = {};
    if (subject) filter.subject = subject;
    if (chapter) filter.chapter = chapter;
    if (questionNo) filter.questionNo = Number(questionNo);

    const videos = await StudentVideo.find(filter).populate("studentId", "name", "email");

    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

/** ===========================
 * PATCH - Approve/Reject Video (Teacher)
 * =========================== */
export async function PATCH(req: NextRequest) {
    await dbConnect();
  try {
    const { videoId, teacherId, status } = await req.json();

    if (!videoId || !teacherId || !["Approved", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updatedVideo = await StudentVideo.findByIdAndUpdate(
      videoId,
      { status, teacherId, reviewDate: new Date() },
      { new: true }
    );

    return NextResponse.json({ message: "Video updated successfully", video: updatedVideo }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}
