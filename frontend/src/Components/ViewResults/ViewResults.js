import React, { useState } from 'react';
import './ViewResults.css';

const ViewResults = () => {
  const [roll, setRoll] = useState('');
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/results/${roll}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Failed to fetch results:', err);
    }
  };

  return (
    <div className="view-results-container">
      <h2>View Your Results</h2>
      <input
        type="text"
        placeholder="Enter your roll number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />
      <button onClick={fetchResults}>Fetch Results</button>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Total Marks</th>
              <th>Your Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, idx) => (
              <tr key={idx}>
                <td>{res.examName}</td>
                <td>{res.totalMarks}</td>
                <td>{res.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewResults;
