const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.products);
router.get('/product/:id', productsController.detail);
router.get('/cart', productsController.cart);
router.get('/create', productsController.create);
router.get('/edit', productsController.edit);

module.exports = router;