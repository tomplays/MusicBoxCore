var DAO = require("sequelize/lib/dao"),
    Utils = require("sequelize/lib/utils");


module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Idoc", {
			title: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            slug: {
                type: DataTypes.STRING,
                validate: {
                },
            },
			kind: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			content: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            richmode: {
                type: DataTypes.BOOLEAN,
                 defaultValue: true,
                validate: {
                },
            },
			external: {
                type: DataTypes.BOOLEAN,
                validate: {
                },
            },
			section: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			order: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            renderas: {
                type: DataTypes.STRING,
                validate: {
                },
            },
			status: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            ishome: {
                type: DataTypes.BOOLEAN,
                validate: {
                },
            },
            staticload: {
                type: DataTypes.BOOLEAN ,
                validate: {
                },
            },
            rev: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                },
            },
            real_published: {
                type: DataTypes.TEXT,
                defaultValue: '2013-12-11T14:30:46.395Z',
                validate: {
                },
            },
            secret: {
                type: DataTypes.TEXT,
                defaultValue: 'defautsecret',
                validate: {
                },
            },
        }
    );
};