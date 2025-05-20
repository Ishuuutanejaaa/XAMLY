const Submission = require('../models/Submission');

exports.submitExam = async (req, res) => {
  try {
    const { examId, examSubject, studentName, studentRoll, answers } = req.body;

    const submission = new Submission({
      examId,
      examSubject,
      studentName,
      studentRoll,
      answers
    });

    await submission.save();
    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save submission' });
  }
};
