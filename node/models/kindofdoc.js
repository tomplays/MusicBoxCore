module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Kindofdoc", {
            name: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            slug: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
        }
    );
};