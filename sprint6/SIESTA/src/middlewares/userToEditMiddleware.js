function userToEditMiddleware (req, res, next) {

    if (req.session.userLogged.id != req.params.id) {
        res.render('error403')
    }

    next()
}

module.exports = userToEditMiddleware;