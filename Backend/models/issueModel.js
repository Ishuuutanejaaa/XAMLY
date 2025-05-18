// models/issueModel.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNumber: { type: String, required: true },
  examName: { type: String, required: true },
  examDate: { type: Date, required: true },
  issue: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);

