const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/women', productsAPIController.womenProduct);
router.get('/men', productsAPIController.menProduct);
router.get('/categories', productsAPIController.category);
router.get('/lastProduct', productsAPIController.lastProduct);
router.get('/images', productsAPIController.imagesList);
router.get('/list', productsAPIController.list);
router.get('/', productsAPIController.search);
router.get('/:id', productsAPIController.detail);


module.exports = router;