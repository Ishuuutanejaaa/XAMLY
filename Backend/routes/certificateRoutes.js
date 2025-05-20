const express = require('express');
const router = express.Router();
const { getCertificate } = require('../controllers/certificateController');

router.post('/', getCertificate);

module.exports = router;
