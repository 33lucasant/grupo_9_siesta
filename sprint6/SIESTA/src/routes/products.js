const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProduct');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', productsController.products);

router.get('/men', productsController.menProducts);

router.get('/women', productsController.womenProducts);

router.get('/search', productsController.search);

router.get('/detail/:id', productsController.detail);

router.get('/cart', authMiddleware, productsController.cart);

router.get('/create', authMiddleware, adminMiddleware, productsController.createProduct);
router.post('/', upload.array('images', 6), productsController.addProduct);

router.get('/edit/:id', authMiddleware, adminMiddleware, productsController.edit);
router.put('/:id', upload.array('images', 6), productsController.editProduct);

router.delete('/:id', authMiddleware, adminMiddleware, productsController.delete);

module.exports = router;