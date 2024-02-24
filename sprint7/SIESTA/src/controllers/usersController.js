const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require("sequelize");
const sequelize = db.sequelize;

const usersController = {
    register: (req, res) => {
        res.render('register')
    },

    processRegister: async (req, res) => {
		const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

		try {
			const userInDB = await db.User.findOne({
				where: {email: req.body.email}
			})
	
			if (userInDB) {
				return res.render('register', {
					errors: {
						email: {
							msg: 'Este email ya está registrado'
						}
					},
					oldData: req.body
				});
			}
	
			await db.User.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password, 10),
				avatar: req.file.filename,
				role_id: 2
			})
	
			return res.redirect('/user/login');
		} catch (err) {
			return res.send(err)
		}
		
	},
    

    login: (req, res) => {
        res.render('login')
    },

    loginProcess: async (req, res) => {
		try {
			let userToLogin = await db.User.findOne({
				where: {email: req.body.email}
			})
	
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
	
				return res.render('login', {
					errors: {
						password: {
							msg: 'Las credenciales son inválidas'
						}
					}
				})

			}
	
			return res.render('login', {
				errors: {
					email: {
						msg: 'No se encuentra este email en la base de datos'
					}
				}
			})
		} catch (err) {
			return res.send(err)
		}
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
	},

	list: async (req, res) => {
		try {
			const users = await db.User.findAll({
				include: ['roles']
			});

			res.render('users', {users})
		} catch (err) {
			return res.send(err)
		}
	},

	edit: (req, res) => {
		db.User.findByPk(req.params.id)
		.then(user => {
			res.render('editUser', {user})
		})
	},

	update: async (req, res) => {
		try {
			if (!req.file) {

				const userToEdit = await db.User.findByPk(req.params.id);

				const userEdited = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					avatar: userToEdit.avatar
				}

				await db.User.update(userEdited, {
					where: {id: req.params.id}
				})

			} else {

				const userEdited = {
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					avatar: req.file.filename
				}

				await db.User.update(userEdited, {
					where: {id: req.params.id}
				})
			}
			
			res.redirect('/user/profile');
		} catch (error) {
			console.log(error)
		}
	},

	editRole: (req, res) => {
		db.User.findByPk(req.params.id)
		.then(user => {
			res.render('edit-role', {user})
		})
	},

	updateRole: async (req, res) => {
		try {
			
			const userRoleEdited = {
				role_id: req.body.role_id
			}

			db.User.update(userRoleEdited, {
				where: {id: req.params.id}
			})

			res.redirect('/user/list');
		} catch (error) {
			console.log(error)
		}
	},

	delete: async (req, res) => {
        try {

            await db.User.destroy({
                where: {id: req.params.id},
            });

            res.redirect('/user/list');

        } catch (err) {
            res.send(err)
        }
    },
	
}

module.exports = usersController;