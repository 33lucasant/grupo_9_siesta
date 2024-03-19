const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../../public/img/avatars'))
	},
	filename: (req, file, cb) => {
		cb(null, `IMG-${Math.random()}${path.extname(file.originalname)}`)
	}
});

const upload = multer({storage});

module.exports = upload;