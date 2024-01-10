const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainController');

router.get('/', mainControllers.home);

module.exports = router;