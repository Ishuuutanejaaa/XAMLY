const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Create exam
router.post('/create', examController.createExam);

// Get all exams for teacher
router.get('/teacher', examController.getAllExamsForTeacher);

// Update exam
router.put('/update/:id', examController.updateExam);

// Toggle visibility
router.put('/toggle-visibility/:id', examController.toggleVisibility);

module.exports = router;
