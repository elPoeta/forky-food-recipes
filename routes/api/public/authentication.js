const express = require('express');
const router = express.Router();
const { googleSiging } = require('../../../controllers/authenticationController');

router.post('/google', googleSiging);

module.exports = router;