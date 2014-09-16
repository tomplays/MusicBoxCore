var DAO = require("sequelize/lib/dao"),
    Utils = require("sequelize/lib/utils");

// MAIN document model. Define "root" model of a doc.
// Document uses other models defined by sequelize associations) 
// see ../models.js

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
                type: DataTypes.TEXT,
                validate: {
                },
            },
            clength: {
                type: DataTypes.STRING,
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
            open_edit  :{
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                validate: {
                },
            }
        }
    );
};