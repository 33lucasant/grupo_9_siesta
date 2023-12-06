const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const productsController = require('../controllers/productsController');

router.get('/', productsController.products);

router.get('/detail/:id', productsController.detail);

router.get('/cart', productsController.cart);

router.get('/create', productsController.createProduct);
router.post('/', upload.array('images', 6), productsController.addProduct);

router.get('/edit/:id', productsController.edit);
router.put('/:id', upload.array('images', 6), productsController.editProduct);

router.delete('/:id', productsController.delete); 

module.exports = router;