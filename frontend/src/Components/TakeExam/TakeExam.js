import React, { useEffect, useState } from 'react';
import './TakeExam.css';

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [student, setStudent] = useState({ name: '', roll: '' });
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/exams/visible');
        const data = await res.json();
        setExams(data);
      } catch (err) {
        alert('Failed to fetch exams');
        console.error(err);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    if (!timeLeft || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSelectExam = (exam) => {
    setSelectedExam(exam);
  };

  const startExam = () => {
    if (!student.name || !student.roll) {
      alert('Please enter your name and roll number');
      return;
    }
    setTimeLeft(parseInt(selectedExam.duration) * 60);
    setExamStarted(true);
    setAnswers({});
    setSubmitted(false);
  };

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    alert('Exam submitted!');

    const payload = {
      examId: selectedExam._id,
      examSubject: selectedExam.subject,
      studentName: student.name,
      studentRoll: student.roll,
      answers
    };

    try {
      await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Failed to save submission:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="take-exam-container">
      <h2>Available Exams</h2>

      {!selectedExam && (
        <div className="exam-list">
          {exams.map((exam) => (
            <div key={exam._id} className="exam-card">
              <h3>{exam.subject}</h3>
              <p>Duration: {exam.duration} mins</p>
              <p>Total Marks: {exam.totalMarks}</p>
              <button onClick={() => handleSelectExam(exam)}>Take Exam</button>
            </div>
          ))}
        </div>
      )}

      {selectedExam && !examStarted && (
        <div className="student-info-form">
          <h3>{selectedExam.subject} - Exam Login</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter your roll number"
            value={student.roll}
            onChange={(e) => setStudent({ ...student, roll: e.target.value })}
          />
          <button onClick={startExam}>Start Exam</button>
        </div>
      )}

      {selectedExam && examStarted && (
        <div className="exam-screen">
          <h3>{selectedExam.subject} - Exam</h3>
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          {selectedExam.questions.map((q, idx) => (
            <div key={idx} className="question-block">
              <p><strong>Q{idx + 1}:</strong> {q.text}</p>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        value={opt}
                        disabled={submitted}
                        checked={answers[idx] === opt}
                        onChange={() => handleOptionChange(idx, opt)}
                      />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {!submitted ? (
            <button className="submit-btn" onClick={handleSubmit}>Submit Exam</button>
          ) : (
            <div className="thank-you">Thank you for submitting!</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TakeExam;

