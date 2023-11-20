const productController = {
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    cart: (req, res) => {
        res.render('cart')
    }
}

module.exports = productController;