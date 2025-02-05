"use client";

import { uploadQuestion } from '@/utils/quetionController';
import React, { useState } from 'react';
import { CiSquareRemove } from 'react-icons/ci';
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const UploadQuestionForm: React.FC = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = {
      class: className,
      subject,
      chapter,
      questions,
    };
  
    try {
      const response = await uploadQuestion(formData);
  
      // Check if the response indicates success
      if ('success' in response && response.success) {
        toast.success("Questions uploaded successfully!");
        // Reset form fields
        setClassName('');
        setSubject('');
        setChapter('');
        setQuestions(['']); // Reset to one empty question
      } else if ('message' in response) {
        // If there's a message, throw an error
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to upload questions"); // Show error toast
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, '']); // Add a new empty question field
  };

  const removeQuestionField = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <form className="bg-[var(--bg)] flex flex-col items-center p-4 min-h-screen" onSubmit={handleSubmit}>
      <div className="text-center mt-4">
        <h1 className="text-[var(--first)] text-3xl font-bold">Upload Questions</h1>
      </div>

      <div className="flex flex-col w-full space-y-3 mt-6">
        <select
          name="class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] "
          required
        >
          <option value="" disabled>Select Class</option>
          <option value="10th">10th</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>

        <input
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Subject Name"
          type="text"
          required
        />
        <input
          name="chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
          placeholder="Chapter Name"
          type="text"
          required
        />

        <label className='text-[var(--first)] font-bold'>Questions:</label>
        {questions.map((question, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="bg-green-100 rounded-full text-center py-2 text-[var(--first)] w-full"
              placeholder={`Question ${index + 1}`}
              required
            />
            <button type="button" onClick={() => removeQuestionField(index)} className="bg-red-500 text-white text-3xl rounded-lg p-1">
            <CiSquareRemove />

            </button>
          </div>
        ))}
        <button type="button" onClick={addQuestionField} className="mt-2 bg-[var(--second)] text-white rounded-full py-2">
          Add Question
        </button>
      </div>

      <button type="submit" className="mt-6 bg-[var(--first)] text-[var(--bg)] w-full py-2 rounded-full">
        Upload Questions
      </button>
      <ToastContainer /> {/* Toast container for notifications */}
    </form>
  );
};

export default UploadQuestionForm;