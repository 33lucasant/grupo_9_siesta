const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/Users');

const usersController = {
    register: (req, res) => {
        res.render('register')
    },

    processRegister: (req, res) => {
		const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('userRegisterForm', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

        return res.redirect('/user/login');
	},
    

    login: (req, res) => {
        res.render('login')
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

		if (userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if (req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2});
				}

				res.redirect('/user/profile')
			}

			return res.render('userLoginForm', {
				errors: {
					password: {
						msg: 'Las credenciales son inválidas'
					}
				}
			})
		}

		return res.render('userLoginForm', {
			errors: {
				email: {
					msg: 'No se encuentra este email en la base de datos'
				}
			}
		})
    },

    profile: (req, res) => {
		return res.render('userProfile', {
			user: req.session.userLogged
		});
	},

    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}    
}

module.exports = usersController;