import React from 'react';
import './TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="teacher-dashboard">
      <header className="navbar">
        <h1>XAMLY | Teacher Dashboard</h1>
        <nav>
          <ul>
            <li onClick={() => navigate('/create-exam')}>Create Exam</li>
            <li onClick={() => navigate('/view-analytics')}>Analytics</li>
          </ul>
        </nav>
      </header>

      <div className="welcome-section">
        <h2>Welcome, Educator!</h2>
        <p>Shape the future by designing meaningful assessments.</p>
      </div>

      <div className="card-container">
        <div className="card" onClick={() => navigate('/create-exam')}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Create Exam" />
          <h3>Create Exam</h3>
          <p>Design and publish exams using a powerful question builder.</p>
        </div>

      

        <div className="card" onClick={() => navigate('/view-analytics')}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828885.png" alt="View Analytics" />
          <h3>View Analytics</h3>
          <p>Track student performance using smart visual dashboards.</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} XAMLY. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeacherDashboard;