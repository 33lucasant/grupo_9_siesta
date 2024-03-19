const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/multerAvatar');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const userToEditMiddleware = require('../middlewares/userToEditMiddleware');

const { body } = require('express-validator');

const usersController = require('../controllers/usersController');

const validations = [
    body('first_name')
		.notEmpty().withMessage('Debe completar este campo').bail()
		.isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('last_name')
		.notEmpty().withMessage('Debe completar este campo').bail()
		.isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debe completar este campo').bail()
        .isEmail().withMessage('Debe ingresar un correo válido'),
    body('password')
		.notEmpty().withMessage('Debe completar este campo').bail()
		.isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				fs.unlinkSync(path.join(__dirname, `../../public/img/avatars/${file.filename}`));
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
router.get('/list', authMiddleware, adminMiddleware, usersController.list);
router.get('/edit/:id', authMiddleware, userToEditMiddleware, usersController.edit);
router.put('/:id', upload.single('avatar'), validations, usersController.update);
router.get('/edit-role/:id', authMiddleware, adminMiddleware, usersController.editRole);
router.put('/edit-role/:id', usersController.updateRole);
router.delete('/:id', adminMiddleware, usersController.delete); 

module.exports = router;