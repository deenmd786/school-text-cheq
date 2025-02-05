

export interface Student {
    _id: string;
  studentName: string;
  class: string;
  section: string;
  rollNo: string;
  schoolCode: string;
  schoolName: string;
  parentPhoneNo: string;
  email: string;
  password: string; // This should not be exposed in responses
  profilePic: string;
}

export interface Teacher {
    _id: string;
  teacherName: string;
  subjects: string; // Array of subjects
  schoolName: string;
  schoolCode: string;
  email: string;
  password: string; // This should not be exposed in responses
  phone: string;
  profilePic: string;
}
