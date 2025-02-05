export interface Question {
    id?: string; // Optional for existing questions
    class: string;
    subject: string;
    chapter: string;
    questions: string[]; // Array of questions
    // Add any other fields you need
  }