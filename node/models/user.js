var DAO = require("sequelize/lib/dao"),
	Utils = require("sequelize/lib/utils"),
	bcrypt = require('bcrypt'),
    gravatar = require('gravatar');


module.exports = function(sequelize, DataTypes) {
	return sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			//unique: true,
			validate: {
				is: ["[a-z0-9_]",'i'],
				len: [2, 15],
				notNull: true,
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			//unique: true,
			validate: {
				isEmail: true,
				notNull: true,
				notEmpty: true,
			},
		},
		color: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				len: [6, 256],
				notNull: true,
				notEmpty: true,
			},
		},
	},
	{
		classMethods: {
			auth: function(username, password){
					var eventEmitter = new Utils.CustomEventEmitter(function() {
						require("../models").User.find({ where: { username:username } })
							.success(function(user) {
								if (user && bcrypt.compareSync(password, user.password)) {
									console.log('user 47')
									eventEmitter.emit('success', user);
								} else {
									eventEmitter.emit('error', "Could not authenticate user");
								}
							})
							.error(function(error){
								eventEmitter.emit('error', err);
							});
					});
					return eventEmitter.run();
			}
		},
		instanceMethods: {
			save_raw: DAO.prototype.save,
			save: function(params){
				this.password = bcrypt.hashSync(this.password, 10);
				return this.save_raw(params);
			},
			avatar: function() {
				this.avatar = gravatar.url(this.email);
				return this.save_raw(params);

			}
		}
	});
};