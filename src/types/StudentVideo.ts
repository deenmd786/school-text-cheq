// types/StudentVideo.ts

export interface StudentVideo {
    _id?: string; // MongoDB ObjectId (optional, if using MongoDB)
    studentId?: string; // ID of the student who uploaded the video
    subject: string; // Subject of the video
    chapter: string; // Chapter related to the video
    questionNo: string; // Question number associated with the video
    videoUrl: string; // URL of the video
    createdAt?: Date; // Date when the video was uploaded (optional)
    updatedAt?: Date; // Date when the video was last updated (optional)
    status?: 'Pending' | 'Approved' | 'Rejected';
}