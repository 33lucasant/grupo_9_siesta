const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');

router.get('/', mainControllers.home);
router.get('/register', mainControllers.register);
router.get('/login', mainControllers.login);

module.exports = router;