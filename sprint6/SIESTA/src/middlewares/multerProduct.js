const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/public/img/products')
	},
	filename: (req, file, cb) => {
		cb(null, `IMG-${Date.now()}${path.extname(file.originalname)}`)
	}
});

const upload = multer({storage});

module.exports = upload;