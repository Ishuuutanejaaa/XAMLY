const Submission = require('../models/Submission');
const Exam = require('../models/Exam');

exports.submitExam = async (req, res) => {
  try {
    const { examId, studentName, studentRoll, answers } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const totalQuestions = exam.questions.length;
    let correctCount = 0;

    // Safe check on both questions and answers
    for (let i = 0; i < totalQuestions; i++) {
      const submitted = answers[i];
      const correct = exam.questions[i]?.correctAnswer;

      if (submitted !== undefined && correct !== undefined && submitted === correct) {
        correctCount++;
      }
    }

    const score = Math.round((correctCount / totalQuestions) * exam.totalMarks);

    const newSubmission = new Submission({
      examId,
      examSubject: exam.subject,
      studentName,
      studentRoll,
      answers,
      score
    });

    await newSubmission.save();

    res.status(201).json({ message: 'Exam submitted successfully', score });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
