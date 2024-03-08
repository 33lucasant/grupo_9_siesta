const db = require('../../database/models');

const usersAPIController = {
    list: (req, res) => {
        db.User.findAll({
            include: ['roles']
        })
        .then(users => {
            let response = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: 'api/users'
                },
                data: users
            }
            res.json(response);
        })
    },
    detail: (req, res) => {
        db.User.findByPk(req.params.id, {include: ['roles']})
        .then(user => {
            let response = {
                meta: {
                    status: 200,
                    url: 'api/user/:id'
                },
                data: user
            }
            res.json(response);
        })
    }
}

module.exports = usersAPIController;