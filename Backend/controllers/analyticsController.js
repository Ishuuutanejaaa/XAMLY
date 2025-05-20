const Submission = require('../models/Submission');
const Exam = require('../models/Exam');

exports.getAllAnalytics = async (req, res) => {
  try {
    const submissions = await Submission.find();

    const analytics = await Promise.all(submissions.map(async (sub) => {
      const exam = await Exam.findById(sub.examId);
      if (!exam || !exam.questions) return null;

      let correctCount = 0;
      const totalQuestions = exam.questions.length;

      for (let i = 0; i < totalQuestions; i++) {
        const studentAnswer = sub.answers.get(String(i));
        const correctAnswer = exam.questions[i].correctAnswer;
        if (studentAnswer && studentAnswer === correctAnswer) {
          correctCount++;
        }
      }

      const score = Math.round((correctCount / totalQuestions) * exam.totalMarks);

      return {
        studentName: sub.studentName,
        studentRoll: sub.studentRoll,
        examName: exam.subject,
        score
      };
    }));

    res.status(200).json(analytics.filter(Boolean));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
