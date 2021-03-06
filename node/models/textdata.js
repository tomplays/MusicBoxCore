/*
textdatas are text fragments, sections of text, meta informations, comments... attached to a start-end sequence (of letters)
"music box" fragments
*/

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Textdata", {
            type: {
                type: DataTypes.TEXT,
                validate: {},
                defaultValue: 'none',
            },
            subtype: {
                type: DataTypes.TEXT,
                validate: {},
                 defaultValue: 'none',
            },
            start: {
                type: DataTypes.INTEGER,
                validate: {
                },
                 defaultValue: 0,
            },
            end: {
                type: DataTypes.INTEGER,
                validate: {
                },
            },
            css: {
                type: DataTypes.TEXT,
                validate: {},
                 defaultValue: 'none',
            },
            metadata: {
                type: DataTypes.TEXT,
                validate: {},
            },
            depth: {
                type: DataTypes.INTEGER,
                validate: {},
                defaultValue: 0,
            },
            version: {
                type: DataTypes.INTEGER,
                validate: {},
            },
            status: {
                type: DataTypes.TEXT,
                validate: {},
            },
            position: {
                type: DataTypes.TEXT,
                validate: {},
                defaultValue: 'left',
            }
        }
    );
};