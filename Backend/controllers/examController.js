const Exam = require('../models/Exam');

// Create exam
exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all exams (teacher view)
exports.getAllExamsForTeacher = async (req, res) => {
  try {
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exams.' });
  }
};

// Update exam
exports.updateExam = async (req, res) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExam) return res.status(404).json({ message: 'Exam not found' });
    res.json(updatedExam);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update exam.' });
  }
};

// Toggle visibility
exports.toggleVisibility = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    exam.visibleToStudents = !exam.visibleToStudents;
    await exam.save();

    res.json({ message: 'Visibility toggled', visibleToStudents: exam.visibleToStudents });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling visibility.' });
  }
};

// Get visible exams (for students)
exports.getVisibleExams = async (req, res) => {
  try {
    const visibleExams = await Exam.find({ visibleToStudents: true });
    res.json(visibleExams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch visible exams.' });
  }
};

