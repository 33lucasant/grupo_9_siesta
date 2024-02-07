const db = require('../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;

const productsController = {

    products: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['images']
            });

            res.render('products', {products})
        } catch (err) {
            res.render(err)
        }
    },

    search: async (req, res) => {
		const results = await db.Product.findAll({
            where: { name: {[Op.like] : `%${req.query.keywords.toLowerCase()}%`}},
            include: ['images']
        })
		res.render('results', {results});
	},

    detail: async (req, res) => {
        try {

            const product = await db.Product.findByPk(req.params.id, {
                include: ['images']
            });

            const users = await db.User.findAll()

            res.render('productDetail', {product, users})
        } catch (err) {
            res.render(err)
        }
    },

    createProduct: (req, res) => {
        res.render('create');
    },

    addProduct: async (req, res) => {
        try {

            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color
            }

            const productAdded = await db.Product.create(newProduct)

            let productImages = [];
            for (let i = 0; i < 6; i++) {
                
                productImages[i] = req.files[i].filename

                await db.Image.create({
                    image: productImages[i],
                    product_id: productAdded.id
                })
            }

			res.redirect('/products');

		} catch (err) {

			res.send(err)
            
		}
    },
    
    edit: async (req, res) => {
        try {

            const productToEdit = await db.Product.findByPk(req.params.id)
            
            res.render('edit', {productToEdit})  

        } catch (err) {
            res.send(err)
        }
        
    },

    editProduct: async  (req, res) => {
        try {
            
            const productToEdit = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                size: req.body.size,
                color: req.body.color
            };

            await db.Product.update(productToEdit, {
                where: {id: req.params.id}
            });

            res.redirect('/products');

        } catch (err) {
            res.send(err)
        }
    },

    delete: async (req, res) => {
        try {

            await db.Image.destroy({
                where: {product_id: req.params.id},
            });

            await db.Product.destroy({
                where: {id: req.params.id},
            });

            res.redirect('/products');

        } catch (err) {
            res.send(err)
        }
    },

    cart: (req, res) => {
        res.render('cart')
    },

    menProducts: async (req, res) => {
        const productsForMen = await db.Product.findAll({
            where: {category: {[Op.like]: '%Hombre%'}},
            include: ['images']
        });
        res.render('menProducts', {productsForMen});
    },

    womenProducts: async (req, res) => {
        const productsForWomen = await db.Product.findAll({
            where: {category: {[Op.like]: '%Mujer%'}},
            include: ['images']
        });
        res.render('womenProducts', {productsForWomen});
    }
}

module.exports = productsController;