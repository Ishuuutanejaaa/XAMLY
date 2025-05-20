const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  examSubject: String,
  studentName: String,
  studentRoll: String,
  answers: Object,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
