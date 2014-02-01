module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Log", {
            text: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			verb: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			subject: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
			author: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
        }
    );
};