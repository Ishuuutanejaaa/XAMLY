const Submission = require('../models/Submission');
const Exam = require('../models/Exam');

exports.getCertificate = async (req, res) => {
  try {
    const { name, roll, subject } = req.body;

    const submission = await Submission.findOne({
      studentName: name,
      studentRoll: roll,
      examSubject: subject
    }).lean();

    if (!submission) {
      return res.status(404).json({ message: 'No record found for the given details.' });
    }

    const exam = await Exam.findById(submission.examId).lean();
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found.' });
    }

    const totalMarks = Number(exam.totalMarks);
    const answers = submission.answers || {};

    let correctCount = 0;
    exam.questions.forEach((question, index) => {
      const correct = question.correctAnswer;
      const studentAnswer = answers[index.toString()];
      if (studentAnswer === correct) {
        correctCount++;
      }
    });

    const totalQuestions = exam.questions.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * totalMarks);
    const percentage = (calculatedScore / totalMarks) * 100;

    console.log(`Student: ${name}, Score: ${calculatedScore}, Total: ${totalMarks}, %: ${percentage}`);

    if (percentage >= 70) {
      return res.status(200).json({
        eligible: true,
        subject: exam.subject,
        studentName: submission.studentName
      });
    } else {
      return res.status(200).json({
        eligible: false,
        percentage,
        score: calculatedScore
      });
    }
  } catch (error) {
    console.error('Certificate error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
