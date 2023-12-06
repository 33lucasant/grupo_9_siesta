const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsController = {
    products: (req, res) => {
        res.render('products', {products})
    },

    detail: (req, res) => {
        const productID = req.params.id;
		const productDetail = products.find(product => product.id == productID);
		res.render('productDetail', {productDetail});
    },

    createProduct: (req, res) => {
        res.render('create');
    },

    addProduct: (req, res) => {
        try {
            let productImages = [];
            for (let i = 0; i < 6; i++) {
                productImages[i] = req.files[i].filename
            }

			const newProduct = {id: products.length + 1, ...req.body, images: productImages}
			products.push(newProduct);

			res.redirect('/products');

            fs.writeFileSync(productsFilePath, JSON.stringify(products));
		} catch (error) {
			console.log('error:', error);
		}
    },
    
    edit: (req, res) => {
        const productID = req.params.id;
		const productToEdit = products.find(product => product.id == productID);
        res.render('edit', {productToEdit});
    },

    editProduct: (req, res) => {
        const productID = req.params.id;

        let productImages = [];
        for (let i = 0; i < 6; i++) {
            productImages[i] = req.files[i].filename
        }

        const {name, price, description, colors, size1, size2, size3, size4} = req.body;

        const indexProd = products.findIndex(product => product.id == productID);

        if (indexProd != -1) {
            products[indexProd].name = name;
			products[indexProd].price = price;
			products[indexProd].description = description;
			products[indexProd].colors = colors;
			products[indexProd].size1 = size1;
            products[indexProd].size2 = size2;
            products[indexProd].size3 = size3;
            products[indexProd].size4 = size4;
            products[indexProd].images = productImages;

            fs.writeFileSync(productsFilePath, JSON.stringify(products));

            res.redirect('/products');
        } else {
            res.send('PRODUCTO NO ENCONTRADO');
        }
    },

    delete: (req, res) => {
        const productID = req.params.id;
		products = products.filter(product => product.id != productID);

		res.redirect('/products');
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
    },

    cart: (req, res) => {
        res.render('cart')
    }
}

module.exports = productsController;