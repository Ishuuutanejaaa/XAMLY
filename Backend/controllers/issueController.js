// controllers/issueController.js
const Issue = require('../models/issueModel');

const reportIssue = async (req, res) => {
  try {
    const newIssue = await Issue.create(req.body);
    res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
  } catch (err) {
    res.status(500).json({ message: 'Failed to report issue', error: err.message });
  }
};

module.exports = { reportIssue };

