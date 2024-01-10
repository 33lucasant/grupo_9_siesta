const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multerAvatar');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const { body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validations = [
    body('firstName').notEmpty().withMessage('Debe completar este campo'),
    body('lastName').notEmpty().withMessage('Debe completar este campo'),
    body('email')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isEmail().withMessage('Debe ingresar un correo válido'),
    body('password').notEmpty().withMessage('Debe completar este campo'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
    })
]

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), validations, usersController.processRegister);
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/profile/', authMiddleware, usersController.profile);
router.get('/logout/', usersController.logout);

module.exports = router;