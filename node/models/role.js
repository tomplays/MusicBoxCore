

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Role", {
            text: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
 			role: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
 			status: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
        }
    );
};