module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Objectmeta", {
            meta_key: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
            meta_value: {
                type: DataTypes.TEXT,
                validate: {
                },
            }
        }
    );
};