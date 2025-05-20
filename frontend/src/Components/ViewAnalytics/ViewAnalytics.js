import React, { useEffect, useState } from 'react';
import './ViewAnalytics.css';

const ViewAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="view-analytics-container">
      <h2>Exam Analytics</h2>
      {analytics.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Exam Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.studentName}</td>
                <td>{entry.studentRoll}</td>
                <td>{entry.examName}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No analytics found.</p>
      )}
    </div>
  );
};

export default ViewAnalytics;


