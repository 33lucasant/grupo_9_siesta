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
                    name: 'Total de usuarios',
                    total: users.length,
                    icon: 'fa-users',
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
    },
    lastUser: (req, res) => {
        db.User.findAll({
            attributes: {exclude: ['password']}
        })
        .then(users => {
            let mayorId = 0
            let user = [];
            users.forEach(element => {
                if (element.id == 1) {
                    mayorId = element.id
                    user = element
                } else {
                    if (element.id > mayorId) {
                        mayorId = element.id
                        user = element
                    }
                }
            });
            res.json(user)
        })
    }
}

module.exports = usersAPIController;