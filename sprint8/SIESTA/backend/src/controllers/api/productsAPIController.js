const db = require('../../database/models');
const { Op } = require("sequelize");

const productsAPIController = {
    list: (req, res) => {
        db.Product.findAll({
            include: ['images']
        })
        .then(products => {
            let response = {
                meta: {
                    status: 200,
                    name: 'Total de productos',
                    total: products.length,
                    icon: 'fa-socks',
                    url: req.originalUrl
                },
                data: products
            }
            res.json(response);
        })
    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {include: ['images']})
        .then(product => {
            let response = {
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                data: product
            }
            res.json(response);
        })
    },
    search: (req, res) => {
        let kw = req.query.keywords || '';

		db.Product.findAll({
            where: {name: {[Op.like] : `%${kw.toLowerCase()}%`}},
            include: ['images']
        })
        .then(products => {
            let response = {
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                data: products
            }
            res.json(response);
        })
	},
    imagesList: (req, res) => {
        db.Image.findAll()
        .then(images => {
            let response = {
                meta: {
                    status: 200,
                    name: 'Total de imagenes',
                    total: images.length,
                    icon: 'fa-images',
                    url: req.originalUrl
                },
                data: images
            }
            res.json(response);
        })
    },
    lastProduct: (req, res) => {
        db.Product.findAll({
            include: ['images']
        })
        .then(products => {
            let mayorId = 0
            let product = [];
            products.forEach(element => {
                if (element.id == 1) {
                    mayorId = element.id
                    product = element
                } else {
                    if (element.id > mayorId) {
                        mayor = element.id
                        product = element
                    }
                }
            });
            res.json(product)
        })
    },
    category: (req, res) => {
        db.Product.findAll()
        .then(products => {
            categories = []
            for (let i = 0; i < products.length; i++) {
                categories[i] = products[i].category
            }
            console.log(categories)
            const uniqueCategories = new Set(categories);
            console.log(uniqueCategories)
            const result = [...uniqueCategories]
            res.json(result)
        })
    },
    womenProduct: (req, res) => {
        db.Product.findAll({
            where: {category: {[Op.like]: '%Mujer%'}},
            include: ['images']
        })
        .then(products => {
            let response = {
                meta: {
                    status: 200,
                    name: 'Total de productos de mujer',
                    total: products.length,
                    icon: 'fa-female',
                    url: req.originalUrl
                },
                data: products
            }
            res.json(response);
        })
    },
    menProduct: (req, res) => {
        db.Product.findAll({
            where: {category: {[Op.like]: '%Hombre%'}},
            include: ['images']
        })
        .then(products => {
            let response = {
                meta: {
                    status: 200,
                    name: 'Total de productos de hombre',
                    total: products.length,
                    icon: 'fa-male',
                    url: req.originalUrl
                },
                data: products
            }
            res.json(response);
        })
    }
}

module.exports = productsAPIController;