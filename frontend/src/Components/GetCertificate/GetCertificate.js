import React, { useState } from 'react';
import './GetCertificate.css';
import html2canvas from 'html2canvas';

const GetCertificate = () => {
  const [formData, setFormData] = useState({ name: '', roll: '', subject: '' });
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setCertificate(null);

    try {
      const res = await fetch('http://localhost:5000/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.eligible) {
        setCertificate({
          name: data.studentName,
          subject: data.subject
        });
      } else {
        setError('You are not eligible for a certificate.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again.');
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('certificate-box');
    html2canvas(element).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="certificate-container">
      <h2>Get Your Certificate</h2>

      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
      <input name="roll" placeholder="Roll Number" value={formData.roll} onChange={handleChange} />
      <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
      <button onClick={handleSubmit}>Check Certificate</button>

      {certificate && (
        <div id="certificate-box" className="certificate-box">
          <h3>Certificate of Achievement</h3>
          <p>Congratulations {certificate.name},</p>
          <p>You have passed the test in <strong>{certificate.subject}</strong>.</p>
          <button className="download-btn" onClick={handleDownload}>Download Certificate</button>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default GetCertificate;
