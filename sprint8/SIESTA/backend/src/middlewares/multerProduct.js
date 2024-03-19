const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../../public/img/products'))
		//C:\Users\quran\OneDrive\Documents\Digital House\SIESTA\grupo_9_siesta\sprint8\SIESTA\backend\public
		//console.log(path.join(__dirname, '../public'))
	},
	filename: (req, file, cb) => {
		cb(null, `IMG-${Math.random()}${path.extname(file.originalname)}`)
	}
});

const upload = multer({ storage: storage, limits: { files: 6 }});

module.exports = upload;