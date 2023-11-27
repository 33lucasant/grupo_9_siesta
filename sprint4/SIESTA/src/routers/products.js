const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.products);
router.get('/product/:id', productsController.detail);
router.get('/cart', productsController.cart);
router.get('/create', productsController.createProduct);
router.post('/create', productsController.addProduct);
router.get('/edit/:productID', productsController.edit);
router.put('/edit', productsController.editProduct);

module.exports = router;