const productController = {
    productDetail: (req, res) => {
        res.render('productDetail')
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

module.exports = productController;