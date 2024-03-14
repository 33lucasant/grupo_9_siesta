const mainControllers = {
    home: (req, res) => {
        res.render('home')
    },
    admin: (req, res) => {
        res.render('admin')
    }
}

module.exports = mainControllers;