function adminMiddleware (req, res, next) {
   
    if (req.session.userLogged.role_id !== 1) {
        //return res.status(403).json({ message: "Acceso denegado. Usuario no tiene privilegios de administrador." });
        res.render('error403')
    }

    next()
}

module.exports = adminMiddleware;