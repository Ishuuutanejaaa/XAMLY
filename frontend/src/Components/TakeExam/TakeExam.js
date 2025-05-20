import React, { useEffect, useState } from 'react';
import './TakeExam.css';

const TakeExam = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch visible exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/exams/visible');
        const data = await res.json();
        setExams(data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch exams');
      }
    };
    fetchExams();
  }, []);

  // Timer logic
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
    setTimeLeft(parseInt(exam.duration) * 60); // convert mins to seconds
    setAnswers({});
    setSubmitted(false);
  };

  const handleOptionChange = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert('Exam submitted!');
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
              <button onClick={() => handleSelectExam(exam)}>Start Exam</button>
            </div>
          ))}
        </div>
      )}

      {selectedExam && (
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
