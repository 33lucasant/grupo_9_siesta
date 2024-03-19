const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', mainControllers.home);
router.get('/admin', authMiddleware, adminMiddleware, mainControllers.admin);

module.exports = router;