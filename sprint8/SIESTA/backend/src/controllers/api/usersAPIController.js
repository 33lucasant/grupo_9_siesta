const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        db.User.findAll({
            attributes: {exclude: ['password']}
        })
        .then(users => {
            let response = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: req.originalUrl
                },
                data: users
            }
            res.json(response);
        })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {
            attributes: {exclude: ['password']}
        })
        .then(user => {
            let response = {
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                data: user
            }
            res.json(response);
        })
    }
}

module.exports = usersAPIController;