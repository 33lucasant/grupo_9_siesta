const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProduct');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const path = require('path');

const { body } = require('express-validator');

const validations = [
    body('name')
        .notEmpty().withMessage('Debe completar este campo').bail()
		.isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('price')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isNumeric().withMessage('El precio debe ser un número'),
    body('description')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isLength({min: 20}).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    body('image').custom((value, { req }) => {
        let file = req.files;
		let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
		
		if (file.length != 6) {
            throw new Error('Tienes que subir 6 imagenes');
        } else {
            for (let i = 0; i < file.length; i++) {
                let fileExtension = path.extname(file[i].originalname);
                console.log(fileExtension)
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
        }

        return true;
    }),
    body('color')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isLength({min: 5}).withMessage('El color del producto debe tener al menos 5 caracteres'),
    body('size')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isLength({min: 5}).withMessage('Debe ingresar al menos 4 talles separados por una coma (,)'),
]

router.get('/', productsController.products);

router.get('/men', productsController.menProducts);

router.get('/women', productsController.womenProducts);

router.get('/search', productsController.search);

router.get('/detail/:id', productsController.detail);

router.get('/cart', authMiddleware, productsController.cart);

router.get('/create', authMiddleware, adminMiddleware, productsController.createProduct);
router.post('/', upload.array('image', 6), validations, productsController.addProduct);

router.get('/edit/:id', authMiddleware, adminMiddleware, productsController.edit);
router.put('/:id', upload.array('image', 6), validations, productsController.editProduct);

router.delete('/:id', authMiddleware, adminMiddleware, productsController.delete);

module.exports = router;