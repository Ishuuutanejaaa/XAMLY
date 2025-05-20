const express = require('express');
const router = express.Router();
const { getAllAnalytics } = require('../controllers/analyticsController');

router.get('/', getAllAnalytics);

module.exports = router;
