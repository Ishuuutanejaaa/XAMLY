const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  examSubject: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentRoll: {
    type: String,
    required: true
  },
  answers: {
  type: Map, // Accepts an object like { "0": "B", "1": "D" }
  of: String,
  required: true
},
  score: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
