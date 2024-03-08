const db = require('../../database/models');

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
                    url: 'api/products'
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
                    url: 'api/products/:id'
                },
                data: product
            }
            res.json(response);
        })
    }
}

module.exports = productsAPIController;