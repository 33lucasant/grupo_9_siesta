const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerProduct');
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const path = require('path');
const fs = require('fs');

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
        const files = req.files;

        // En caso de no subir ninguna imagen, el producto queda con las imagenes anteriores y no se produce ningun error.
        if (files.length == 0) {
            return true
        }

        // Verificar si se subieron 6 imágenes
        if (files.length !== 6) {
            for (let i = 0; i < files.length; i++) {
                fs.unlinkSync(path.join(__dirname, `../../public/img/products/${files[i].filename}`));
            }
            throw new Error('Debes subir exactamente 6 imágenes.');
        }

        // Array de extensiones de archivo permitidas
        const acceptedExtensions = ['.jpg', '.png', '.jpeg'];

        // Verificar cada archivo
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExtension = path.extname(file.originalname); // Obtener extensión del archivo en minúsculas

            // Verificar si la extensión es válida
            if (!acceptedExtensions.includes(fileExtension)) {
                // Elimina todos los archivos cuando uno no es válido
                for (i = 0; i < files.length; i++) {
                    fs.unlinkSync(path.join(__dirname, `../../public/img/products/${files[i].filename}`));
                }
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}.`);

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