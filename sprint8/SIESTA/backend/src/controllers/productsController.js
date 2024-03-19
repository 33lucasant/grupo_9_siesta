const db = require('../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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

        console.log(req.query);
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
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('create', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

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
                
                //productImages[i] = req.files[i].filename
                productImages.push(req.files[i].filename);

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

            const productToEdit = await db.Product.findByPk(req.params.id);

            const productToEditImages = await db.Image.findAll({where: {product_id: req.params.id}});

            res.render('edit', {productToEdit, productToEditImages})  

        } catch (err) {
            res.send(err)
        }
        
    },

    editProduct: async (req, res) => {

        const productToEdit = await db.Product.findByPk(req.params.id);

        const productToEditImages = await db.Image.findAll({where: {product_id: req.params.id}});

        const resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            return res.render('edit', {
                productToEdit,
                productToEditImages,
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

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

            if (req.files.length == 6) {
                const images = await db.Image.findAll({
                    where: {product_id: req.params.id},
                });
    
                for (i = 0; i < images.length; i++) {
                    fs.unlinkSync(path.join(__dirname, `../../public/img/products/${images[i].image}`))
                }
    
                let firstID = images[0].id;
    
                let productImages = [];
                for (let i = 0; i < 6; i++) {
    
                    productImages.push(req.files[i].filename);
    
                    if (i == 0) {
                        await db.Image.update({
                            image: productImages[i]
                        }, {where: {product_id: req.params.id} && {id: firstID}})
                    } else {
                        firstID += 1;
                        await db.Image.update({
                            image: productImages[i]
                        }, {where: {product_id: req.params.id} && {id: firstID}})
                    }
                }
            }

            res.redirect('/products');

        } catch (err) {
            res.send(err)
        }
    },

    delete: async (req, res) => {
        try {

            const imagesToDelete = await db.Image.findAll({
                where: {product_id: req.params.id},
            });

            for (i = 0; i < imagesToDelete.length; i++) {
                fs.unlinkSync(path.join(__dirname, `../../public/img/products/${imagesToDelete[i].image}`))
            }

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