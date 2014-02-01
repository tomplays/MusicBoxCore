/* should be deleted and use objectmetas.... */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Nodemeta", {
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