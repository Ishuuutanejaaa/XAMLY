import React, { useState, useEffect } from 'react';
import './CreateExam.css';

const CreateExamPage = () => {
  const [examDetails, setExamDetails] = useState({
    subject: '',
    duration: '',
    totalMarks: '',
    questions: []
  });

  const [question, setQuestion] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const [exams, setExams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);
  const [previewExam, setPreviewExam] = useState(null);

  const handleQuestionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion({ ...question, options: updatedOptions });
  };

  const addQuestion = () => {
    if (!question.text || question.options.some(opt => !opt) || !question.correctAnswer) {
      alert('Please complete the question and all options.');
      return;
    }
    setExamDetails({
      ...examDetails,
      questions: [...examDetails.questions, { ...question }]
    });
    setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' });
  };

  const createOrUpdateExam = async () => {
    const endpoint = isEditing
      ? `http://localhost:5000/api/exams/update/${editingExamId}`
      : 'http://localhost:5000/api/exams/create';

    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(examDetails)
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Exam ${isEditing ? 'updated' : 'created'} successfully`);
      fetchExams();
      setExamDetails({ subject: '', duration: '', totalMarks: '', questions: [] });
      setIsEditing(false);
      setEditingExamId(null);
    } else {
      alert(data.message || 'Error occurred');
    }
  };

  const toggleVisibility = async (id) => {
    await fetch(`http://localhost:5000/api/exams/toggle-visibility/${id}`, { method: 'PUT' });
    fetchExams();
  };

  const fetchExams = async () => {
    const res = await fetch('http://localhost:5000/api/exams/teacher');
    const data = await res.json();
    setExams(data);
  };

  const handleEdit = (exam) => {
    setExamDetails({
      subject: exam.subject,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      questions: exam.questions
    });
    setEditingExamId(exam._id);
    setIsEditing(true);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="create-exam-page">
      <h2>{isEditing ? 'Edit Exam' : 'Create Exam'}</h2>

      <input
        placeholder="Subject"
        value={examDetails.subject}
        onChange={(e) => setExamDetails({ ...examDetails, subject: e.target.value })}
      />
      <input
        placeholder="Duration (mins)"
        value={examDetails.duration}
        onChange={(e) => setExamDetails({ ...examDetails, duration: e.target.value })}
      />
      <input
        placeholder="Total Marks"
        value={examDetails.totalMarks}
        onChange={(e) => setExamDetails({ ...examDetails, totalMarks: e.target.value })}
      />

      <div className="question-form">
        <h4>Add Question</h4>
        <input
          placeholder="Question"
          value={question.text}
          onChange={(e) => setQuestion({ ...question, text: e.target.value })}
        />
        {question.options.map((opt, i) => (
          <input
            key={`opt-${i}`}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleQuestionChange(i, e.target.value)}
          />
        ))}
        <input
          placeholder="Correct Answer"
          value={question.correctAnswer}
          onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
        />
        <button onClick={addQuestion}>Add Question</button>
      </div>

      <div className="question-preview">
        <h4>Preview Questions</h4>
        {examDetails.questions.map((q, idx) => (
          <div key={`question-${idx}`}>
            <strong>{q.text}</strong>
            <ul>
              {q.options.map((opt, i) => <li key={`opt-${idx}-${i}`}>{opt}</li>)}
            </ul>
            <small>Correct: {q.correctAnswer}</small>
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={createOrUpdateExam}>
        {isEditing ? 'Update Exam' : 'Create Exam'}
      </button>

      <h3>Exams Created</h3>
      <div className="exam-list">
        {exams.map((exam) => (
          <div key={exam._id} className="exam-card">
            <h4>{exam.subject}</h4>
            <p>Duration: {exam.duration} mins</p>
            <p>Total Marks: {exam.totalMarks}</p>
            <button onClick={() => toggleVisibility(exam._id)}>
              {exam.visibleToStudents ? 'Hide from Students' : 'Make Visible to Students'}
            </button>
            <button onClick={() => handleEdit(exam)}>Edit</button>
            <button onClick={() => setPreviewExam(exam)}>Preview</button>
          </div>
        ))}
      </div>

      {previewExam && (
        <div className="preview-modal">
          <div className="modal-content">
            <h3>Preview: {previewExam.subject}</h3>
            {previewExam.questions.map((q, i) => (
              <div key={`prev-${i}`}>
                <strong>{q.text}</strong>
                <ul>
                  {q.options.map((opt, j) => <li key={`prev-opt-${i}-${j}`}>{opt}</li>)}
                </ul>
                <small>Correct: {q.correctAnswer}</small>
              </div>
            ))}
            <button onClick={() => setPreviewExam(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExamPage;
