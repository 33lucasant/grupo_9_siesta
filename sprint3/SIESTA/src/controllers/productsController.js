const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: (req, res) => {
        res.render('products')
    },
    detail: (req, res) => {
        const productID = req.params.id;
		const productDetail = products.find(product => product.id == productID);
		res.render('productDetail', {productDetail})
    },
    create: (req, res) => {
        res.render('create')
    },
    edit: (req, res) => {
        res.render('edit')
    },
    cart: (req, res) => {
        res.render('cart')
    }
}

module.exports = productsController;