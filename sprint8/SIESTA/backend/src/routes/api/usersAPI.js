const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

router.get('/lastUser', usersAPIController.lastUser);
router.get('/', usersAPIController.list);
router.get('/:id', usersAPIController.detail);

module.exports = router;