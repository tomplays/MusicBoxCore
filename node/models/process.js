module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Process", {
            text: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            status: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            order: {
                type: DataTypes.STRING,
                validate: {
                },
            },
        }
    );
};