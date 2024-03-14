const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainController');

router.get('/', mainControllers.home);
router.get('/admin', mainControllers.admin);

module.exports = router;