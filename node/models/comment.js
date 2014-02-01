module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Comment", {
            text: {
                type: DataTypes.TEXT,
                validate: {
                },
            },
 			status: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            
        }
    );
};