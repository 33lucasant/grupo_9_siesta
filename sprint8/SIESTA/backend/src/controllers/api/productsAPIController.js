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
                    total: products.length,
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
		db.Product.findAll({
            where: { name: {[Op.like] : `%${req.query.keywords.toLowerCase()}%`}}
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
}

module.exports = productsAPIController;