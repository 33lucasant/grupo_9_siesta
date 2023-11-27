const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: (req, res) => {
        res.render('products', {products})
    },

    detail: (req, res) => {
        const productID = req.params.id;
		const productDetail = products.find(product => product.id == productID);
		res.render('productDetail', {productDetail})
    },

    createProduct: (req, res) => {
        res.render('create')
    },

    addProduct: (req, res) => {
        products.push({
            id: products.length + 1,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            colors: req.body.colors,
            size1: req.body.size1,
            size2: req.body.size2,
            size3: req.body.size3,
            size4: req.body.size4
        });
        res.redirect('/products');
    },
    
    edit: (req, res) => {
        res.render('edit')
    },

    editProduct: (req, res) => {
        let productToEdit = products.find(product => product.id == req.params.id);
        productToEdit = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            colors: req.body.colors,
            size1: req.body.size1,
            size2: req.body.size2,
            size3: req.body.size3,
            size4: req.body.size4
        };
        res.render(res.redirect("/products"), {productToEdit});
    },

    cart: (req, res) => {
        res.render('cart')
    }
}

module.exports = productsController;