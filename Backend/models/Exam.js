const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  duration: { type: String, required: true },
  totalMarks: { type: String, required: true },
  questions: [questionSchema],
  visibleToStudents: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
