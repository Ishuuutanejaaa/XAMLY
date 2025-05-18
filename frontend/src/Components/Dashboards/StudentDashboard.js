import React, { useState } from 'react';
import './StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNumber: '',
    examName: '',
    examDate: '',
    issue: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/issues/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Issue reported successfully!');
      setForm({ name: '', email: '', rollNumber: '', examName: '', examDate: '', issue: '' });
    } else {
      alert(data.message || 'Something went wrong!');
    }
  };

  return (
    <div className="student-dashboard">
      <nav className="navbar">
        <h1>Xamly - Student Dashboard</h1>
        <div>
          <button onClick={() => navigate('/take-exam')}>Take Exam</button>
          <button onClick={() => navigate('/results')}>View Results</button>
          <button onClick={() => navigate('/certificate')}>Download Certificate</button>
          <button onClick={() => navigate('/past-exams')}>Past Exams</button>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-text">
          <h2>Welcome to Your Learning Journey</h2>
          <p className="fade-in">Exams help you evaluate your knowledge, improve retention, and prepare for real-life challenges.</p>
        </div>
      </section>

      <section className="contact-section">
        <h3>Report an Issue</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="text" placeholder="Roll Number" required value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
          <input type="text" placeholder="Exam Name" required value={form.examName} onChange={(e) => setForm({ ...form, examName: e.target.value })} />
          <input type="date" placeholder="Exam Date" required value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} />
          <textarea placeholder="Describe the issue" required value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })}></textarea>
          <button type="submit">Submit Issue</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Xamly. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
